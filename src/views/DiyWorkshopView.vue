<template>
  <div class="pt-16 min-h-screen bg-gradient-to-b from-wamao-bg-warm to-wamao-bg">
    <!-- Header -->
    <section class="pt-16 pb-8 text-center px-[5%]">
      <div class="text-wamao-brown text-[1.1rem] tracking-[4px] mb-2">指尖造物 · 赋予新生</div>
      <h1 class="font-display text-wamao-ink text-[3rem] max-md:text-[2.2rem]">DIY 瓦猫工坊</h1>
      <div class="w-[60px] h-[3px] bg-wamao-red mx-auto rounded my-4" />
      <p class="text-wamao-brown max-w-[520px] mx-auto">
        选其形，赋其色，塑其神。三步之间，一只独属于你的瓦猫灵兽便跃然眼前。
      </p>
    </section>

    <!-- Step Navigation -->
    <div class="px-[5%] max-w-[800px] mx-auto">
      <StepController v-model="currentStep" />
    </div>

    <!-- Main Workshop Area -->
    <div class="px-[5%] pb-16 max-w-[1200px] mx-auto">
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <!-- Canvas -->
        <div class="flex-1 w-full lg:sticky lg:top-20">
          <WorkshopCanvas ref="canvasRef" />
          <!-- Quick action buttons under canvas -->
          <div class="flex justify-center gap-3 mt-4 flex-wrap">
            <button @click="store.undo()" class="px-4 py-2 bg-white/60 rounded text-wamao-brown text-sm border border-wamao-brown/10 hover:bg-white transition-colors">
              ↩ 撤销
            </button>
            <button @click="store.reset()" class="px-4 py-2 bg-white/60 rounded text-wamao-brown text-sm border border-wamao-brown/10 hover:bg-white transition-colors">
              ↺ 重置
            </button>
            <button @click="generatePoster" class="px-4 py-2 bg-wamao-red text-white rounded text-sm hover:bg-red-800 transition-colors font-display tracking-wider">
              ✦ 生成海报
            </button>
          </div>
          <div class="text-center mt-2 text-xs text-wamao-brown/50">
            提示：在画布上按住鼠标/手指可自由涂鸦
          </div>
        </div>

        <!-- Controls Panel -->
        <div class="w-full lg:w-[380px] bg-white/50 rounded-xl p-6 border border-wamao-brown/10 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
          <!-- Step 1: Select Bone -->
          <div v-if="currentStep === 'bone'" class="animate-fadeIn">
            <h3 class="font-display text-wamao-ink text-xl mb-4 flex items-center gap-2">
              <span class="w-7 h-7 bg-wamao-red text-white rounded-full text-sm flex items-center justify-center">1</span>
              选择胎骨
            </h3>
            <p class="text-wamao-brown text-sm mb-4">四种云南传统瓦猫原型，各有气韵：</p>
            <BoneSelector v-model="store.boneId" />
          </div>

          <!-- Step 2: Color & Decorate -->
          <div v-else-if="currentStep === 'color'" class="animate-fadeIn">
            <h3 class="font-display text-wamao-ink text-xl mb-4 flex items-center gap-2">
              <span class="w-7 h-7 bg-wamao-red text-white rounded-full text-sm flex items-center justify-center">2</span>
              披彩衣 · 加纹饰 · 自由画
            </h3>
            <div class="mb-5">
              <StylePicker :model-value="store.styleId" :bone-id="store.boneId" @select="store.setStyle($event)" />
            </div>
            <ColorPainter
              :base="store.colors.base"
              :overlay="store.colors.overlay"
              :accent="store.colors.accent"
              :selected-decorations="store.decorations"
              :decoration-states="store.decorationStates"
              :brush-color="store.brushColor"
              :brush-size="store.brushSize"
              @update:base="store.applyColor('base', $event)"
              @update:overlay="store.applyColor('overlay', $event)"
              @update:accent="store.applyColor('accent', $event)"
              @toggle-decoration="store.toggleDecoration($event)"
              @set-decoration-state="store.setDecorationState($event.id, $event.state)"
              @update:brush-color="store.setBrushColor($event)"
              @update:brush-size="store.setBrushSize($event)"
              @clear-brush="store.clearBrushStrokes()"
            />
          </div>

          <!-- Step 3: Poster Preview -->
          <div v-else-if="currentStep === 'poster'" class="animate-fadeIn text-center">
            <h3 class="font-display text-wamao-ink text-xl mb-4 flex items-center justify-center gap-2">
              <span class="w-7 h-7 bg-wamao-red text-white rounded-full text-sm flex items-center justify-center">3</span>
              作品完成
            </h3>
            <p class="text-wamao-brown text-sm mb-6">
              你的瓦猫已经诞生！<br>
              点击下方按钮保存你的作品，或返回继续调整。
            </p>
            <button @click="generatePoster" class="w-full py-4 bg-wamao-red text-white rounded-lg text-lg hover:bg-red-800 transition-colors font-display tracking-widest shadow-lg">
              ✦ 生成海报
            </button>
            <div class="mt-4 text-xs text-wamao-brown/60">
              支持长按保存 · 分享朋友圈
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Poster Modal -->
    <PosterGenerator
      :visible="posterVisible"
      :poster-url="posterUrl"
      @close="posterVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCatConfigStore } from '@/stores/catConfig'
import WorkshopCanvas from '@/components/workshop/WorkshopCanvas.vue'
import BoneSelector from '@/components/workshop/BoneSelector.vue'
import ColorPainter from '@/components/workshop/ColorPainter.vue'
import StepController from '@/components/workshop/StepController.vue'
import StylePicker from '@/components/workshop/StylePicker.vue'
import PosterGenerator from '@/components/workshop/PosterGenerator.vue'

const store = useCatConfigStore()
const currentStep = ref('bone')
const canvasRef = ref<InstanceType<typeof WorkshopCanvas> | null>(null)
const posterVisible = ref(false)
const posterUrl = ref<string | null>(null)

async function generatePoster() {
  const url = canvasRef.value?.getDataUrl()
  if (!url) return
  posterUrl.value = url
  posterVisible.value = true
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
