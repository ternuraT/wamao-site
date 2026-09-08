<template>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <span class="text-xs text-wamao-brown w-8">X</span>
      <input
        type="range"
        min="0"
        max="100"
        :value="Math.round((state?.x ?? 0.5) * 100)"
        @input="onChange('x', parseInt(($event.target as HTMLInputElement).value) / 100)"
        class="flex-1 accent-wamao-red h-1.5"
      />
      <span class="text-xs text-wamao-brown w-8 text-right">{{ Math.round((state?.x ?? 0.5) * 100) }}%</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-wamao-brown w-8">Y</span>
      <input
        type="range"
        min="0"
        max="100"
        :value="Math.round((state?.y ?? 0.5) * 100)"
        @input="onChange('y', parseInt(($event.target as HTMLInputElement).value) / 100)"
        class="flex-1 accent-wamao-red h-1.5"
      />
      <span class="text-xs text-wamao-brown w-8 text-right">{{ Math.round((state?.y ?? 0.5) * 100) }}%</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-wamao-brown w-8">大小</span>
      <input
        type="range"
        min="30"
        max="200"
        :value="Math.round((state?.scale ?? 1) * 100)"
        @input="onChange('scale', parseInt(($event.target as HTMLInputElement).value) / 100)"
        class="flex-1 accent-wamao-red h-1.5"
      />
      <span class="text-xs text-wamao-brown w-8 text-right">{{ Math.round((state?.scale ?? 1) * 100) }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DecorationState } from '@/stores/catConfig'

const props = defineProps<{
  decoId: string
  state?: DecorationState
}>()

const emit = defineEmits<{
  (e: 'change', id: string, state: Partial<DecorationState>): void
}>()

function onChange(key: keyof DecorationState, value: number) {
  emit('change', props.decoId, { [key]: value })
}
</script>
