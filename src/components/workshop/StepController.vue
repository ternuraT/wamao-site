<template>
  <div class="flex items-center justify-center gap-2 sm:gap-4 mb-6">
    <button
      v-for="(step, i) in steps"
      :key="step.id"
      @click="emit('update:modelValue', step.id)"
      class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
      :class="modelValue === step.id
        ? 'bg-wamao-red text-white shadow-md'
        : 'bg-white/50 text-wamao-brown hover:bg-white'"
    >
      <span class="w-6 h-6 rounded-full text-xs flex items-center justify-center border"
        :class="modelValue === step.id ? 'bg-white text-wamao-red border-white' : 'bg-wamao-brown/10 text-wamao-brown border-wamao-brown/20'">
        {{ i + 1 }}
      </span>
      <span class="text-sm font-display hidden sm:inline">{{ step.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const steps = [
  { id: 'bone', label: '选胎骨' },
  { id: 'color', label: '披彩衣' },
  { id: 'poster', label: '生成海报' }
]

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void
}>()
</script>
