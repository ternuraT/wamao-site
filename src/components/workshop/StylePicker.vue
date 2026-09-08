<template>
  <div class="border-t border-wamao-brown/10 pt-4">
    <label class="block text-wamao-brown text-sm mb-1 font-display">一键风格化 · 民俗彩塑</label>
    <p class="text-xs text-wamao-brown/60 mb-3">手艺人代你上彩，一键即成；换色与涂鸦不受影响</p>
    <div class="grid grid-cols-2 gap-3">
      <!-- 素坯原色 -->
      <button
        @click="emit('select', null)"
        class="relative rounded-lg overflow-hidden border-2 transition-all duration-300 p-2 bg-white/60"
        :class="modelValue === null ? 'border-wamao-brown shadow' : 'border-transparent hover:border-wamao-brown/30'"
      >
        <img :src="currentBone.src" :alt="currentBone.name" class="w-full aspect-[4/5] object-contain" />
        <div class="mt-1.5 text-center text-xs text-wamao-brown font-display">素坯原色</div>
        <div v-if="modelValue === null" class="absolute top-1.5 right-1.5 w-5 h-5 bg-wamao-brown text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
      </button>
      <!-- 民俗彩塑风格 -->
      <button
        @click="emit('select', currentBone.id)"
        class="relative rounded-lg overflow-hidden border-2 transition-all duration-300 p-2 bg-white/60"
        :class="modelValue === currentBone.id ? 'border-wamao-red shadow-lg scale-[1.02]' : 'border-transparent hover:border-wamao-red/40'"
      >
        <img :src="currentBone.thumb" :alt="currentBone.styleName" class="w-full aspect-[4/5] object-contain" />
        <div class="mt-1.5 text-center text-xs text-wamao-red font-display">{{ currentBone.styleName }}</div>
        <div v-if="modelValue === currentBone.id" class="absolute top-1.5 right-1.5 w-5 h-5 bg-wamao-red text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | null
  boneId: string
}>()

const emit = defineEmits<{
  (e: 'select', id: string | null): void
}>()

// 风格素材与胎骨一一对应，风格名取自画面特征
const styles: Record<string, { id: string; name: string; src: string; thumb: string; styleName: string }> = {
  bone1: { id: 'bone1', name: '精致白陶', src: '/images/wamao-yuanshi.png', thumb: '/images/wamao-style1-thumb.png', styleName: '点翠鎏金' },
  bone2: { id: 'bone2', name: '古拙长颈', src: '/images/wamao-yuanshi2.png', thumb: '/images/wamao-style2-thumb.png', styleName: '层檐叠彩' },
  bone3: { id: 'bone3', name: '古拙宽脸', src: '/images/wamao-yuanshi3.png', thumb: '/images/wamao-style3-thumb.png', styleName: '祥云拂彩' },
  bone4: { id: 'bone4', name: '古拙大嘴', src: '/images/wamao-yuanshi4.png', thumb: '/images/wamao-style4-thumb.png', styleName: '朱砂重彩' }
}

const currentBone = computed(() => styles[props.boneId] || styles.bone1)
</script>
