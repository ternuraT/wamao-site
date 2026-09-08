<template>
  <div v-if="visible" class="fixed inset-0 z-[2000] bg-black/70 flex items-center justify-center p-4">
    <div class="bg-wamao-bg rounded-xl max-w-[500px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="p-6 border-b border-wamao-brown/10 flex items-center justify-between">
        <h3 class="font-display text-wamao-ink text-2xl">你的瓦猫作品</h3>
        <button @click="emit('close')" class="text-wamao-brown text-2xl hover:text-wamao-red">&times;</button>
      </div>
      <div class="p-6">
        <div ref="posterRef" class="rounded-lg overflow-hidden border border-wamao-brown/10 bg-gradient-to-b from-wamao-bg-warm to-wamao-bg p-4">
          <img v-if="posterUrl" :src="posterUrl" class="w-full rounded" />
          <div class="mt-4 text-center">
            <div class="font-display text-wamao-red text-xl">瓦猫新生</div>
            <div class="text-wamao-brown text-sm mt-1">文化中国 · 云南瓦猫数字体验</div>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="downloadPoster" class="flex-1 py-3 bg-wamao-red text-white rounded font-display tracking-wider hover:bg-red-800 transition-colors">
            保存图片
          </button>
          <button @click="emit('close')" class="px-6 py-3 border border-wamao-brown text-wamao-brown rounded hover:bg-wamao-brown hover:text-wamao-bg transition-colors">
            继续创作
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  posterUrl: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'download'): void
}>()

const posterRef = ref<HTMLDivElement | null>(null)

function downloadPoster() {
  if (!props.posterUrl) return
  const link = document.createElement('a')
  link.href = props.posterUrl
  link.download = `瓦猫新生_${Date.now()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  emit('download')
}
</script>
