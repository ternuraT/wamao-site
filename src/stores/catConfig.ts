import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface DecorationState {
  x: number
  y: number
  scale: number
}

export interface BrushStroke {
  points: [number, number][]
  color: string
  width: number
}

export interface CatConfig {
  boneId: string
  styleId: string | null
  features: { eyes: string; nose: string; mouth: string }
  colors: { base: string; accent: string; overlay: string }
  decorations: string[]
  decorationStates: Record<string, DecorationState>
  brushStrokes: BrushStroke[]
  brushColor: string
  brushSize: number
}

const defaultDecoState = (): DecorationState => ({ x: 0.5, y: 0.5, scale: 1 })

function parseOverlayRgba(overlay: string) {
  const match = overlay.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return { r: 139, g: 69, b: 19, a: 0.3 }
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: match[4] ? parseFloat(match[4]) : 1 }
}

const defaultConfig: CatConfig = {
  boneId: 'bone1',
  styleId: null,
  features: { eyes: 'default', nose: 'default', mouth: 'default' },
  colors: { base: '#F5E6C8', accent: '#FFD700', overlay: 'rgba(139,69,19,0.3)' },
  decorations: [],
  decorationStates: {},
  brushStrokes: [],
  brushColor: '#B83A2B',
  brushSize: 4
}

export const useCatConfigStore = defineStore('catConfig', () => {
  const boneId = ref(defaultConfig.boneId)
  const styleId = ref<string | null>(defaultConfig.styleId)
  const features = ref({ ...defaultConfig.features })
  const colors = ref({ ...defaultConfig.colors })
  const decorations = ref<string[]>([...defaultConfig.decorations])
  const decorationStates = ref<Record<string, DecorationState>>({ ...defaultConfig.decorationStates })
  const brushStrokes = ref<BrushStroke[]>([...defaultConfig.brushStrokes])
  const brushColor = ref(defaultConfig.brushColor)
  const brushSize = ref(defaultConfig.brushSize)
  const history = ref<CatConfig[]>([])

  const currentConfig = computed<CatConfig>(() => ({
    boneId: boneId.value,
    styleId: styleId.value,
    features: { ...features.value },
    colors: { ...colors.value },
    decorations: [...decorations.value],
    decorationStates: { ...decorationStates.value },
    brushStrokes: brushStrokes.value.map(s => ({ ...s, points: [...s.points] })),
    brushColor: brushColor.value,
    brushSize: brushSize.value
  }))

  function pushHistory() {
    history.value.push(currentConfig.value)
    if (history.value.length > 20) history.value.shift()
  }

  function setBone(id: string) {
    pushHistory()
    boneId.value = id
    // 风格素材与胎骨一一对应，换胎骨时清除已选风格
    styleId.value = null
  }

  function setStyle(id: string | null) {
    pushHistory()
    styleId.value = id
    if (id) {
      // 风格图本身已是成品彩绘，默认去掉釉色叠加以免遮盖风格；用户仍可自行加回
      const overlay = parseOverlayRgba(colors.value.overlay)
      if (overlay.a > 0.01) {
        colors.value.overlay = `rgba(${overlay.r},${overlay.g},${overlay.b},0)`
      }
    }
  }

  function updateFeature(part: keyof CatConfig['features'], style: string) {
    pushHistory()
    features.value[part] = style
  }

  function applyColor(key: keyof CatConfig['colors'], value: string) {
    pushHistory()
    colors.value[key] = value
  }

  function toggleDecoration(deco: string) {
    pushHistory()
    const idx = decorations.value.indexOf(deco)
    if (idx >= 0) {
      decorations.value.splice(idx, 1)
    } else {
      decorations.value.push(deco)
      if (!decorationStates.value[deco]) {
        const defaults: Record<string, DecorationState> = {
          bagua: { x: 0.5, y: 0.72, scale: 1 },
          yun1: { x: 0.5, y: 0.82, scale: 1 },
          yun2: { x: 0.5, y: 0.82, scale: 1 },
          fu: { x: 0.15, y: 0.15, scale: 1 },
          shou: { x: 0.85, y: 0.15, scale: 1 },
          frame: { x: 0.5, y: 0.5, scale: 1 }
        }
        decorationStates.value[deco] = { ...defaultDecoState(), ...defaults[deco] }
      }
    }
  }

  function setDecorationState(deco: string, state: Partial<DecorationState>) {
    pushHistory()
    if (!decorationStates.value[deco]) decorationStates.value[deco] = defaultDecoState()
    decorationStates.value[deco] = { ...decorationStates.value[deco], ...state }
  }

  function addBrushStroke(stroke: BrushStroke) {
    brushStrokes.value.push(stroke)
  }

  function setBrushColor(color: string) {
    brushColor.value = color
  }

  function setBrushSize(size: number) {
    brushSize.value = size
  }

  function clearBrushStrokes() {
    pushHistory()
    brushStrokes.value = []
  }

  function undo() {
    const prev = history.value.pop()
    if (prev) {
      boneId.value = prev.boneId
      styleId.value = prev.styleId
      features.value = { ...prev.features }
      colors.value = { ...prev.colors }
      decorations.value = [...prev.decorations]
      decorationStates.value = { ...prev.decorationStates }
      brushStrokes.value = prev.brushStrokes.map(s => ({ ...s, points: [...s.points] }))
      brushColor.value = prev.brushColor
      brushSize.value = prev.brushSize
    }
  }

  function reset() {
    pushHistory()
    boneId.value = defaultConfig.boneId
    styleId.value = defaultConfig.styleId
    features.value = { ...defaultConfig.features }
    colors.value = { ...defaultConfig.colors }
    decorations.value = [...defaultConfig.decorations]
    decorationStates.value = {}
    brushStrokes.value = []
    brushColor.value = defaultConfig.brushColor
    brushSize.value = defaultConfig.brushSize
  }

  return {
    boneId, styleId, features, colors, decorations, decorationStates,
    brushStrokes, brushColor, brushSize, history,
    currentConfig,
    setBone, setStyle, updateFeature, applyColor, toggleDecoration,
    setDecorationState, addBrushStroke, setBrushColor, setBrushSize, clearBrushStrokes,
    undo, reset
  }
}, {
  persist: {
    key: 'wacat-rebirth-config'
  }
})
