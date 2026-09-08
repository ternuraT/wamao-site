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
  features: { eyes: string; nose: string; mouth: string }
  colors: { base: string; accent: string; overlay: string }
  decorations: string[]
  decorationStates: Record<string, DecorationState>
  brushStrokes: BrushStroke[]
  brushColor: string
  brushSize: number
}

const defaultDecoState = (): DecorationState => ({ x: 0.5, y: 0.5, scale: 1 })

const defaultConfig: CatConfig = {
  boneId: 'bone1',
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
    features.value = { ...defaultConfig.features }
    colors.value = { ...defaultConfig.colors }
    decorations.value = [...defaultConfig.decorations]
    decorationStates.value = {}
    brushStrokes.value = []
    brushColor.value = defaultConfig.brushColor
    brushSize.value = defaultConfig.brushSize
  }

  return {
    boneId, features, colors, decorations, decorationStates,
    brushStrokes, brushColor, brushSize, history,
    currentConfig,
    setBone, updateFeature, applyColor, toggleDecoration,
    setDecorationState, addBrushStroke, setBrushColor, setBrushSize, clearBrushStrokes,
    undo, reset
  }
}, {
  persist: {
    key: 'wacat-rebirth-config'
  }
})
