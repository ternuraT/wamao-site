<template>
  <div
    class="relative w-full aspect-[3/4] max-w-[500px] mx-auto rounded-xl overflow-hidden border border-wamao-brown/10 shadow-inner"
    :class="isPainting ? 'cursor-crosshair' : 'cursor-default'"
    :style="{ backgroundColor: store.colors.base }"
  >
    <canvas
      ref="canvasRef"
      class="w-full h-full"
      @mousedown="onPointerDown"
      @mousemove="onPointerMove"
      @mouseup="onPointerUp"
      @mouseleave="onPointerUp"
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onPointerUp"
    />
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/60 pointer-events-none">
      <div class="text-wamao-brown font-display text-xl">加载中...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCatConfigStore } from '@/stores/catConfig'

const store = useCatConfigStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(false)
const isPainting = ref(false)
let currentStroke: [number, number][] = []

const boneImages: Record<string, string> = {
  bone1: '/images/wamao-yuanshi.png',
  bone2: '/images/wamao-yuanshi2.png',
  bone3: '/images/wamao-yuanshi3.png',
  bone4: '/images/wamao-yuanshi4.png'
}

const decoImages: Record<string, string> = {
  bagua: '/images/baguatu.png',
  yun1: '/images/wamao-xianyunwen1.png',
  yun2: '/images/wamao-xianyunwen2.png'
}

const preloadCache = new Map<string, HTMLImageElement>()

async function preloadImage(src: string): Promise<HTMLImageElement> {
  if (preloadCache.has(src)) return preloadCache.get(src)!
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => { preloadCache.set(src, img); resolve(img) }
    img.onerror = reject
    img.src = src
  })
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function parseOverlay(overlay: string) {
  const match = overlay.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return { r: 139, g: 69, b: 19, a: 0.3 }
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: match[4] ? parseFloat(match[4]) : 1 }
}

// Offscreen canvas for colored cat image
let coloredCatCanvas: HTMLCanvasElement | null = null

async function renderColoredCat(img: HTMLImageElement, displayW: number, displayH: number) {
  if (!coloredCatCanvas) coloredCatCanvas = document.createElement('canvas')
  const c = coloredCatCanvas
  const scale = Math.min(displayW / img.width, displayH / img.height) * 0.9
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!

  ctx.clearRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h)

  const overlay = parseOverlay(store.colors.overlay)
  if (overlay.a > 0.01) {
    ctx.globalCompositeOperation = 'source-atop'
    ctx.fillStyle = `rgba(${overlay.r},${overlay.g},${overlay.b},${overlay.a})`
    ctx.fillRect(0, 0, w, h)
  }

  ctx.globalCompositeOperation = 'screen'
  ctx.fillStyle = hexToRgba(store.colors.accent, 0.3)
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'source-over'
  return { canvas: c, w, h }
}

async function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  loading.value = true
  try {
    const boneSrc = boneImages[store.boneId] || boneImages.bone1
    const img = await preloadImage(boneSrc)

    const dpr = window.devicePixelRatio || 1
    const displayWidth = canvas.clientWidth || 500
    const displayHeight = canvas.clientHeight || 667
    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // 1. Base background
    ctx.fillStyle = store.colors.base
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    // 2. Colored cat
    const { canvas: catCanvas, w, h } = await renderColoredCat(img, displayWidth, displayHeight)
    const catX = (displayWidth - w) / 2
    const catY = (displayHeight - h) / 2
    ctx.drawImage(catCanvas, catX, catY)

    // 3. Decorations
    ctx.globalCompositeOperation = 'source-over'
    for (const decoId of store.decorations) {
      const state = store.decorationStates[decoId]
      await drawDecoration(ctx, decoId, displayWidth, displayHeight, state)
    }

    // 4. Brush strokes
    for (const stroke of store.brushStrokes) {
      drawStroke(ctx, stroke, displayWidth, displayHeight)
    }

    // 5. Current painting stroke
    if (currentStroke.length > 1) {
      drawRawStroke(ctx, currentStroke, store.brushColor, store.brushSize, displayWidth, displayHeight)
    }
  } catch (e) {
    console.error('Render error:', e)
  } finally {
    loading.value = false
  }
}

async function drawDecoration(
  ctx: CanvasRenderingContext2D,
  deco: string,
  cw: number,
  ch: number,
  state?: { x: number; y: number; scale: number }
) {
  const s = state || { x: 0.5, y: 0.5, scale: 1 }
  const x = s.x * cw
  const y = s.y * ch
  const sc = s.scale

  ctx.save()
  ctx.translate(x, y)

  // Image-based decorations
  if (deco === 'bagua' || deco === 'yun1' || deco === 'yun2') {
    const src = decoImages[deco]
    if (!src) { ctx.restore(); return }
    const img = await preloadImage(src)
    // Fit decoration to ~25% of canvas width by default, then apply user scale
    const baseSize = cw * 0.25
    const aspect = img.height / img.width
    const dw = baseSize * sc
    const dh = dw * aspect
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
    ctx.restore()
    return
  }

  // Text-based decorations
  ctx.scale(sc, sc)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  switch (deco) {
    case 'fu': {
      ctx.font = `bold ${cw * 0.07}px "Ma Shan Zheng", cursive`
      ctx.fillStyle = 'rgba(201,162,39,0.85)'
      ctx.rotate(-0.2)
      ctx.fillText('福', 0, 0)
      break
    }
    case 'shou': {
      ctx.font = `bold ${cw * 0.07}px "Ma Shan Zheng", cursive`
      ctx.fillStyle = 'rgba(184,58,43,0.8)'
      ctx.rotate(0.2)
      ctx.fillText('寿', 0, 0)
      break
    }
    case 'frame': {
      const fw = cw * 0.9 / sc
      const fh = ch * 0.9 / sc
      ctx.strokeStyle = 'rgba(184,58,43,0.5)'
      ctx.lineWidth = 3 / sc
      ctx.strokeRect(-fw / 2, -fh / 2, fw, fh)
      ctx.fillStyle = 'rgba(184,58,43,0.6)'
      ctx.font = `${cw * 0.04 / sc}px serif`
      ctx.fillText('◆', -fw / 2 + cw * 0.02 / sc, -fh / 2 + cw * 0.03 / sc)
      ctx.fillText('◆', fw / 2 - cw * 0.02 / sc, -fh / 2 + cw * 0.03 / sc)
      ctx.fillText('◆', -fw / 2 + cw * 0.02 / sc, fh / 2 - cw * 0.02 / sc)
      ctx.fillText('◆', fw / 2 - cw * 0.02 / sc, fh / 2 - cw * 0.02 / sc)
      break
    }
  }
  ctx.restore()
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: { points: [number, number][]; color: string; width: number }, cw: number, ch: number) {
  drawRawStroke(ctx, stroke.points, stroke.color, stroke.width, cw, ch)
}

function drawRawStroke(ctx: CanvasRenderingContext2D, points: [number, number][], color: string, width: number, cw: number, ch: number) {
  if (points.length < 2) return
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.globalCompositeOperation = 'source-over'
  ctx.beginPath()
  ctx.moveTo(points[0][0] * cw, points[0][1] * ch)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0] * cw, points[i][1] * ch)
  }
  ctx.stroke()
  ctx.restore()
}

// --- Brush painting events ---
function getRelativePos(e: MouseEvent | Touch, el: HTMLElement): [number, number] {
  const rect = el.getBoundingClientRect()
  return [
    (e.clientX - rect.left) / rect.width,
    (e.clientY - rect.top) / rect.height
  ]
}

function onPointerDown(e: MouseEvent) {
  isPainting.value = true
  const canvas = canvasRef.value!
  currentStroke = [getRelativePos(e, canvas)]
}

function onPointerMove(e: MouseEvent) {
  if (!isPainting.value) return
  const canvas = canvasRef.value!
  currentStroke.push(getRelativePos(e, canvas))
  requestAnimationFrame(render)
}

function onPointerUp() {
  if (!isPainting.value) return
  isPainting.value = false
  if (currentStroke.length > 1) {
    store.addBrushStroke({
      points: [...currentStroke],
      color: store.brushColor,
      width: store.brushSize
    })
  }
  currentStroke = []
  render()
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length !== 1) return
  isPainting.value = true
  const canvas = canvasRef.value!
  currentStroke = [getRelativePos(e.touches[0], canvas)]
}

function onTouchMove(e: TouchEvent) {
  if (!isPainting.value || e.touches.length !== 1) return
  const canvas = canvasRef.value!
  currentStroke.push(getRelativePos(e.touches[0], canvas))
  requestAnimationFrame(render)
}

// Expose
function getDataUrl(): string | null {
  return canvasRef.value?.toDataURL('image/png') || null
}

defineExpose({ render, getCanvas: () => canvasRef.value, getDataUrl })

watch(() => store.currentConfig, render, { deep: true })
onMounted(render)
</script>
