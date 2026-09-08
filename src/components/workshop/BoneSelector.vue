<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
    <button
      v-for="bone in bones"
      :key="bone.id"
      @click="selectBone(bone.id)"
      class="relative rounded-lg overflow-hidden border-2 transition-all duration-300 p-2 bg-white/60"
      :class="modelValue === bone.id ? 'border-wamao-red shadow-lg scale-[1.02]' : 'border-transparent hover:border-wamao-brown/30'"
    >
      <img :src="bone.src" :alt="bone.name" class="w-full aspect-square object-contain" />
      <div class="mt-2 text-center text-sm text-wamao-brown font-display">{{ bone.name }}</div>
      <div v-if="modelValue === bone.id" class="absolute top-2 right-2 w-6 h-6 bg-wamao-red text-white rounded-full flex items-center justify-center text-xs">✓</div>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void
}>()

const bones = [
  { id: 'bone1', name: '精致白陶', src: '/images/wamao-yuanshi.png' },
  { id: 'bone2', name: '古拙长颈', src: '/images/wamao-yuanshi2.png' },
  { id: 'bone3', name: '古拙宽脸', src: '/images/wamao-yuanshi3.png' },
  { id: 'bone4', name: '古拙大嘴', src: '/images/wamao-yuanshi4.png' }
]

function selectBone(id: string) {
  emit('update:modelValue', id)
}
</script>
