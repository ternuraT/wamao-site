<template>
  <!-- Hero -->
  <section class="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-wamao-bg-warm to-wamao-bg relative pt-16 text-center">
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-wamao-red text-[10rem] opacity-[0.06] z-0 max-md:text-[6rem]">呈贡</span>
    <div class="relative z-[1]">
      <div class="text-wamao-brown text-[1.2rem] tracking-[4px]">滇中腹地 · 昆明呈贡</div>
      <h1 class="font-display text-wamao-ink text-[3.6rem] mb-3 max-md:text-[2.6rem]">呈贡瓦猫</h1>
      <div class="w-[60px] h-[3px] bg-wamao-red mx-auto rounded my-5" />
      <p class="text-wamao-brown text-[1.1rem]">俏皮灵动 · 奶凶可爱 · 天圆地方</p>
    </div>
  </section>

  <!-- Content -->
  <div class="max-w-[1000px] mx-auto py-20 px-[5%]">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 my-10">
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img src="/images/wamao-chenggong.jpg" alt="呈贡瓦猫" class="w-full block transition-transform duration-400 hover:scale-105" />
        <div class="px-4 py-3 bg-wamao-bg-warm text-wamao-brown text-center text-[0.9rem]">呈贡瓦猫实物 — 与滇瓦猫 X 昆明瓦猫</div>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img src="/images/wamao-detail.jpg" alt="瓦猫细节" class="w-full block transition-transform duration-400 hover:scale-105" />
        <div class="px-4 py-3 bg-wamao-bg-warm text-wamao-brown text-center text-[0.9rem]">瓦猫细节特写 — 张口露齿</div>
      </div>
    </div>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />
      形貌特征
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      呈贡瓦猫最显著的特征，是<strong>张口露齿，双目炯炯，耳朵高耸，形貌活泼</strong>。
      脑门上的"王"字昭示着它是威风的"大猫"——老虎。
      胸前镶有一块方形八卦图，用以克邪降鬼。
    </p>
    <div class="bg-wamao-red/5 border-l-4 border-wamao-red px-7 py-6 my-7 rounded-r-lg">
      <p class="text-wamao-brown text-[1.1rem]">四肢站立，尾朝内、尾后中空，寓意<strong>招财进宝</strong>。其造型<strong>圆头圆脑、脚踩瓦片</strong>，暗合"天圆地方"之意。</p>
    </div>
    <p class="mb-4 text-justify text-[1.05rem]">
      既有庄重的威仪，也不乏憨态可掬的<strong>"奶凶"</strong>气质。
      呈贡瓦猫在昆明周边地区广泛流传，是云南瓦猫家族中最具亲和力的一支。
    </p>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />
      文化寓意
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      呈贡瓦猫承载着滇中百姓对家宅平安、财源广进的美好祈愿。
      "王"字纹象征虎威镇宅，八卦图代表阴阳调和、驱邪避凶，
      而中空的尾部设计则暗含"财气内聚、不漏不泄"的风水智慧。
    </p>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 my-6">
      <span v-for="t in traits" :key="t" class="px-3 py-2.5 bg-wamao-ink text-wamao-gold rounded text-[0.9rem] tracking-[2px] text-center whitespace-nowrap">
        {{ t }}
      </span>
    </div>

    <router-link to="/" class="inline-flex items-center gap-2 mt-10 px-7 py-3 bg-transparent text-wamao-ink border-2 border-wamao-brown rounded no-underline transition-all duration-300 font-serif hover:bg-wamao-brown hover:text-wamao-bg">
      ← 返回主页
    </router-link>
  </div>
</template>

<script setup lang="ts">
const traits = ['张口露齿', '王字纹', '八卦图', '尾朝内', '圆头圆脑', '奶凶气质']
</script>
