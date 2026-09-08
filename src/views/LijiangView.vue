<template>
  <section class="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-wamao-bg-warm to-wamao-bg relative pt-16 text-center">
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-wamao-red text-[10rem] opacity-[0.06] z-0 max-md:text-[6rem]">丽江</span>
    <div class="relative z-[1]">
      <div class="text-wamao-brown text-[1.2rem] tracking-[4px]">玉龙雪山下 · 丽江古城</div>
      <h1 class="font-display text-wamao-ink text-[3.6rem] mb-3 max-md:text-[2.6rem]">丽江瓦猫</h1>
      <div class="w-[60px] h-[3px] bg-wamao-red mx-auto rounded my-5" />
      <p class="text-wamao-brown text-[1.1rem]">古拙想象 · 麒麟龙狮 · 长颈灵韵</p>
    </div>
  </section>

  <div class="max-w-[1000px] mx-auto py-20 px-[5%]">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 my-10">
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img src="/images/wamao-lijiang.jpg" alt="丽江瓦猫" class="w-full block transition-transform duration-400 hover:scale-105" />
        <div class="px-4 py-3 bg-wamao-bg-warm text-wamao-brown text-center text-[0.9rem]">丽江瓦猫 — 伫立屋脊之上</div>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img src="/images/wamao-overview.jpg" alt="瓦猫 overview" class="w-full block transition-transform duration-400 hover:scale-105" />
        <div class="px-4 py-3 bg-wamao-bg-warm text-wamao-brown text-center text-[0.9rem]">云南瓦猫概览 — 屋脊上的非遗</div>
      </div>
    </div>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />形貌特征
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      丽江瓦猫造型<strong>最富想象力</strong>，似麒麟类龙狮，脖子修长。
      与呈贡的俏皮、大理的威仪不同，丽江瓦猫呈现出一种超脱现实的神秘气质。
    </p>
    <div class="bg-wamao-red/5 border-l-4 border-wamao-red px-7 py-6 my-7 rounded-r-lg">
      <p class="text-wamao-brown text-[1.1rem]">
        它融合了纳西族东巴文化中的神兽意象，将猫、虎、麒麟、龙狮的特征熔于一炉，创造出独一无二的屋脊守护形象。
      </p>
    </div>
    <p class="mb-4 text-justify text-[1.05rem]">
      修长的脖颈使丽江瓦猫显得格外挺拔，仿佛随时会昂首长啸；
      而古拙的线条处理，又赋予它历经岁月洗礼的沧桑感与神圣感。
    </p>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />文化寓意
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      丽江瓦猫不仅是建筑构件，更是纳西族精神世界的外化。
      在玉龙雪山的庇佑下，纳西先民将他们对自然神灵的敬畏、对家宅平安的祈愿，
      都熔铸在这尊小小的陶兽之中。
    </p>
    <p class="mb-4 text-justify text-[1.05rem]">
      "似麒麟类龙狮"的造型特征，体现了纳西文化对多元神兽图腾的吸收与再造。
      它既非纯粹的猫，也非纯粹的虎，而是一种超越具体物象的"灵"——
      守护着古城的每一座院落，也守护着纳西人代代相传的文化记忆。
    </p>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />与古城共生
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      漫步丽江古城，抬头仰望那些历经数百年风雨的民居屋脊，
      常常能与这些静默的守护者不期而遇。
      它们与古城的流水、石桥、五花石路共同构成了丽江独特的人文景观，
      是活着的非遗，是凝固的时光。
    </p>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 my-6">
      <span v-for="t in traits" :key="t" class="px-3 py-2.5 bg-wamao-ink text-wamao-gold rounded text-[0.9rem] tracking-[2px] text-center whitespace-nowrap">{{ t }}</span>
    </div>

    <router-link to="/" class="inline-flex items-center gap-2 mt-10 px-7 py-3 bg-transparent text-wamao-ink border-2 border-wamao-brown rounded no-underline transition-all duration-300 font-serif hover:bg-wamao-brown hover:text-wamao-bg">
      ← 返回主页
    </router-link>
  </div>
</template>

<script setup lang="ts">
const traits = ['麒麟形', '龙狮韵', '脖子修长', '古拙神秘', '东巴文化', '屋脊守望']
</script>
