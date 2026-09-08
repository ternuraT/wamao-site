<template>
  <div class="space-y-5">
    <!-- Base color -->
    <div>
      <label class="block text-wamao-brown text-sm mb-2 font-display">底色</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in baseColors"
          :key="c.value"
          @click="emit('update:base', c.value)"
          class="w-10 h-10 rounded-full border-2 transition-all duration-200"
          :class="base === c.value ? 'border-wamao-red scale-110 shadow' : 'border-transparent hover:scale-105'"
          :style="{ backgroundColor: c.value }"
          :title="c.name"
        />
        <input
          type="color"
          :value="base"
          @input="e => emit('update:base', (e.target as HTMLInputElement).value)"
          class="w-10 h-10 rounded-full border-2 border-wamao-brown/20 cursor-pointer"
        />
      </div>
    </div>

    <!-- Overlay tint -->
    <div>
      <label class="block text-wamao-brown text-sm mb-2 font-display">釉色叠加（仅作用于瓦猫）</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in overlayColors"
          :key="c.value"
          @click="emit('update:overlay', c.value)"
          class="w-10 h-10 rounded-full border-2 transition-all duration-200"
          :class="overlay === c.value ? 'border-wamao-red scale-110 shadow' : 'border-transparent hover:scale-105'"
          :style="{ backgroundColor: c.preview }"
          :title="c.name"
        />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        :value="Math.round(parseOverlayAlpha(overlay) * 100)"
        @input="updateOverlayAlpha"
        class="w-full mt-3 accent-wamao-red"
      />
      <div class="text-xs text-wamao-brown/70 mt-1">透明度: {{ Math.round(parseOverlayAlpha(overlay) * 100) }}%</div>
    </div>

    <!-- Accent color -->
    <div>
      <label class="block text-wamao-brown text-sm mb-2 font-display">点缀色（仅作用于瓦猫高光）</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in accentColors"
          :key="c.value"
          @click="emit('update:accent', c.value)"
          class="w-10 h-10 rounded-full border-2 transition-all duration-200"
          :class="accent === c.value ? 'border-wamao-red scale-110 shadow' : 'border-transparent hover:scale-105'"
          :style="{ backgroundColor: c.value }"
          :title="c.name"
        />
        <input
          type="color"
          :value="accent"
          @input="e => emit('update:accent', (e.target as HTMLInputElement).value)"
          class="w-10 h-10 rounded-full border-2 border-wamao-brown/20 cursor-pointer"
        />
      </div>
    </div>

    <!-- Brush -->
    <div class="border-t border-wamao-brown/10 pt-4">
      <label class="block text-wamao-brown text-sm mb-2 font-display">画笔涂鸦</label>
      <div class="flex items-center gap-3 mb-2">
        <input
          type="color"
          :value="brushColor"
          @input="e => emit('update:brushColor', (e.target as HTMLInputElement).value)"
          class="w-8 h-8 rounded-full border-2 border-wamao-brown/20 cursor-pointer"
        />
        <span class="text-xs text-wamao-brown/70">颜色</span>
        <input
          type="range"
          min="1"
          max="20"
          :value="brushSize"
          @input="e => emit('update:brushSize', parseInt((e.target as HTMLInputElement).value))"
          class="flex-1 accent-wamao-red"
        />
        <span class="text-xs text-wamao-brown/70 w-10 text-right">{{ brushSize }}px</span>
      </div>
      <button
        @click="emit('clearBrush')"
        class="px-3 py-1.5 text-xs bg-white/60 border border-wamao-brown/10 rounded hover:bg-white transition-colors text-wamao-brown"
      >
        清空涂鸦
      </button>
    </div>

    <!-- Decorations toggle -->
    <div class="border-t border-wamao-brown/10 pt-4">
      <label class="block text-wamao-brown text-sm mb-2 font-display">文化纹饰</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="d in decorationList"
          :key="d.id"
          @click="toggleDecoration(d.id)"
          class="px-4 py-2 rounded-full text-sm border transition-all duration-200 font-display"
          :class="selectedDecorations.includes(d.id)
            ? 'bg-wamao-red text-white border-wamao-red'
            : 'bg-white/60 text-wamao-brown border-wamao-brown/20 hover:border-wamao-brown'"
        >
          {{ d.label }}
        </button>
      </div>
    </div>

    <!-- Adjustable decorations -->
    <div v-if="selectedDecorations.includes('bagua')" class="bg-white/40 rounded-lg p-3 border border-wamao-brown/10">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-display text-wamao-ink">八卦图 位置 / 大小</span>
        <button @click="resetDeco('bagua')" class="text-xs text-wamao-brown hover:text-wamao-red">重置</button>
      </div>
      <DecoControl deco-id="bagua" :state="decorationStates['bagua']" @change="onDecoChange" />
    </div>

    <div v-if="selectedDecorations.includes('yun1')" class="bg-white/40 rounded-lg p-3 border border-wamao-brown/10">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-display text-wamao-ink">云纹·卷 位置 / 大小</span>
        <button @click="resetDeco('yun1')" class="text-xs text-wamao-brown hover:text-wamao-red">重置</button>
      </div>
      <DecoControl deco-id="yun1" :state="decorationStates['yun1']" @change="onDecoChange" />
    </div>

    <div v-if="selectedDecorations.includes('yun2')" class="bg-white/40 rounded-lg p-3 border border-wamao-brown/10">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-display text-wamao-ink">云纹·双 位置 / 大小</span>
        <button @click="resetDeco('yun2')" class="text-xs text-wamao-brown hover:text-wamao-red">重置</button>
      </div>
      <DecoControl deco-id="yun2" :state="decorationStates['yun2']" @change="onDecoChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DecorationState } from '@/stores/catConfig'
import DecoControl from './DecoControl.vue'

const props = defineProps<{
  base: string
  overlay: string
  accent: string
  selectedDecorations: string[]
  decorationStates: Record<string, DecorationState>
  brushColor: string
  brushSize: number
}>()

const emit = defineEmits<{
  (e: 'update:base', val: string): void
  (e: 'update:overlay', val: string): void
  (e: 'update:accent', val: string): void
  (e: 'toggleDecoration', id: string): void
  (e: 'setDecorationState', payload: { id: string; state: Partial<DecorationState> }): void
  (e: 'update:brushColor', val: string): void
  (e: 'update:brushSize', val: number): void
  (e: 'clearBrush'): void
}>()

const baseColors = [
  { name: '米黄', value: '#F5E6C8' },
  { name: '陶土', value: '#8B4513' },
  { name: '白瓷', value: '#F5F5F0' },
  { name: '青砖', value: '#4A5568' },
  { name: '朱红', value: '#C53030' },
  { name: '墨黑', value: '#1A1A1A' },
  { name: '琥珀', value: '#D69E2E' }
]

const overlayColors = [
  { name: '透明', value: 'rgba(139,69,19,0)', preview: '#F5E6C8' },
  { name: '淡褐', value: 'rgba(139,69,19,0.25)', preview: 'rgba(139,69,19,0.4)' },
  { name: '朱红釉', value: 'rgba(184,58,43,0.35)', preview: 'rgba(184,58,43,0.6)' },
  { name: '翠绿釉', value: 'rgba(56,161,105,0.3)', preview: 'rgba(56,161,105,0.5)' },
  { name: '钴蓝釉', value: 'rgba(66,153,225,0.3)', preview: 'rgba(66,153,225,0.5)' },
  { name: '紫金釉', value: 'rgba(128,90,213,0.25)', preview: 'rgba(128,90,213,0.5)' }
]

const accentColors = [
  { name: '金', value: '#FFD700' },
  { name: '红', value: '#E53E3E' },
  { name: '绿', value: '#38A169' },
  { name: '蓝', value: '#4299E1' },
  { name: '紫', value: '#805AD5' },
  { name: '橙', value: '#DD6B20' }
]

const decorationList = [
  { id: 'bagua', label: '八卦图' },
  { id: 'fu', label: '福字' },
  { id: 'shou', label: '寿字' },
  { id: 'yun1', label: '云纹·卷' },
  { id: 'yun2', label: '云纹·双' },
  { id: 'frame', label: '框饰' }
]

function parseOverlayAlpha(overlay: string): number {
  const match = overlay.match(/rgba?\([^)]+,\s*([\d.]+)\)/)
  return match ? parseFloat(match[1]) : 0.3
}

function updateOverlayAlpha(e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value)
  const alpha = val / 100
  const current = props.overlay
  const rgbMatch = current.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1])
    const g = parseInt(rgbMatch[2])
    const b = parseInt(rgbMatch[3])
    emit('update:overlay', `rgba(${r},${g},${b},${alpha})`)
  } else {
    emit('update:overlay', `rgba(139,69,19,${alpha})`)
  }
}

function toggleDecoration(id: string) {
  emit('toggleDecoration', id)
}

function onDecoChange(id: string, state: Partial<DecorationState>) {
  emit('setDecorationState', { id, state })
}

function resetDeco(id: string) {
  const defaults: Record<string, DecorationState> = {
    bagua: { x: 0.5, y: 0.72, scale: 1 },
    yun1: { x: 0.5, y: 0.82, scale: 1 },
    yun2: { x: 0.5, y: 0.82, scale: 1 }
  }
  emit('setDecorationState', { id, state: defaults[id] || { x: 0.5, y: 0.5, scale: 1 } })
}
</script>
