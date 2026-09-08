<template>
  <!-- Hero -->
  <section class="min-h-screen relative flex items-center bg-[url('/images/hero-bg.jpg')] bg-center bg-cover">
    <div class="absolute inset-0 bg-gradient-to-r from-wamao-bg/85 via-wamao-bg/40 to-wamao-bg/20" />
    <div class="relative z-[2] px-[8%] max-w-[700px]">
      <div class="text-[1.1rem] text-wamao-brown tracking-[6px] mb-4 pl-4 border-l-[3px] border-wamao-red">
        滇云之脊 · 千载传承
      </div>
      <h1 class="font-display text-wamao-ink text-[5rem] leading-[1.1] mb-6 drop-shadow-sm max-md:text-[3.2rem]">
        瓦猫新生
      </h1>
      <p class="text-[1.15rem] text-wamao-text max-w-[520px] mb-10 text-justify">
        滇云之脊，栖一灵兽。名曰瓦猫，实寓虎威，取猫之形，纳虎之魄。
        它踞于屋脊之上，俯仰天地之间，吞金纳福，镇守家宅，庇佑一方安宁。
        今以数字为媒，邀君共赴一场跨越时空的创作。
      </p>
      <div class="flex gap-5 flex-wrap">
        <a href="#regions" class="btn-primary" @click.prevent="scrollToSection('regions')">探索地域流派 →</a>
        <a href="#culture" class="btn-outline" @click.prevent="scrollToSection('culture')">了解文化溯源</a>
      </div>
      <div class="inline-flex w-12 h-12 border-2 border-wamao-red rounded text-wamao-red font-display text-[0.7rem] items-center justify-center -rotate-[5deg] opacity-60 mt-4">
        非遗
      </div>
    </div>
  </section>

  <!-- Regions -->
  <section id="regions" class="py-[100px] px-[5%] bg-wamao-bg-warm scroll-mt-16">
    <div class="text-center mb-[60px]">
      <h2 class="font-display text-wamao-ink text-[2.8rem] mb-3">一方水土 · 一方灵兽</h2>
      <div class="w-[60px] h-[3px] bg-wamao-red mx-auto rounded" />
      <p class="text-wamao-brown text-[1.05rem] tracking-[2px] mt-4">南诏以降，千载传承，其形无定，千猫千面</p>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 max-w-[1200px] mx-auto">
      <RegionCard
        v-for="region in regions"
        :key="region.name"
        v-bind="region"
      />
    </div>
  </section>

  <!-- Culture -->
  <section id="culture" class="py-[100px] px-[5%] flex items-center gap-[60px] max-w-[1200px] mx-auto flex-wrap max-md:flex-col max-md:gap-10 scroll-mt-16">
    <div class="flex-1 min-w-[300px] rounded-lg overflow-hidden shadow-xl relative">
      <img src="/images/wamao-overview.jpg" alt="瓦猫 overview" class="w-full block" />
      <span class="absolute -top-5 -left-5 font-display text-wamao-red text-[4rem] opacity-15 -z-[1]">瓦猫</span>
    </div>
    <div class="flex-1 min-w-[300px]">
      <h2 class="font-display text-wamao-ink text-[2.4rem] mb-5">屋脊上的守护灵</h2>
      <p class="mb-4 text-justify text-[1.05rem]">
        瓦猫，云南特有的屋脊兽，以陶土塑形，经烈火烧制，最终踞于民居正脊、角脊或门头之上。
        它非猫非虎，却取猫之形、纳虎之魄，是云南多民族文化交融的活化石。
      </p>
      <div class="border-l-[3px] border-wamao-red pl-5 my-6 text-wamao-brown italic">
        "吞金纳福，镇守家宅，庇佑一方安宁。"
      </div>
      <p class="mb-4 text-justify text-[1.05rem]">
        从呈贡的俏皮灵动，到大理的威仪奔放，再到丽江的古拙想象——
        每一只瓦猫都凝结着手艺人的指尖温度，也承载着一方百姓对美好生活的朴素向往。
      </p>
      <p class="mb-4 text-justify text-[1.05rem]">
        如今，这只古老的守护神正从屋脊走向茶席、从坊间走进展厅，
        以崭新的姿态融入当代生活，完成它的"新生"。
      </p>
    </div>
  </section>

  <!-- DIY -->
  <section id="diy" class="py-[100px] px-[5%] text-center bg-gradient-to-b from-wamao-bg-warm to-wamao-bg">
    <div class="max-w-[800px] mx-auto border-2 border-dashed border-wamao-brown rounded-2xl py-[60px] px-10 relative">
      <span class="absolute top-3 left-3 text-wamao-red text-xl">◆</span>
      <span class="absolute bottom-3 right-3 text-wamao-red text-xl">◆</span>
      <h2 class="font-display text-wamao-ink text-[2.4rem] mb-4">DIY 瓦猫工坊</h2>
      <p class="text-wamao-brown mb-8 text-[1.1rem]">
        选其形，赋其色，塑其神。让这只古老的守护神，以你心之所想，重生于指尖之下。
      </p>
      <router-link to="/diy" class="inline-block px-10 py-3 bg-wamao-ink text-wamao-gold rounded font-display text-[1.1rem] tracking-[4px] no-underline hover:bg-wamao-brown transition-colors">
        立即开启 →
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import RegionCard from '@/components/RegionCard.vue'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const regions = [
  {
    name: '呈贡',
    title: '呈贡瓦猫 · 俏皮灵动',
    desc: '张口露齿，双目炯炯，耳朵高耸，形貌活泼。圆头圆脑、脚踩瓦片，暗合"天圆地方"之意。',
    image: '/images/wamao-chenggong.jpg',
    traits: ['奶凶气质', '八卦图', '王字纹'],
    link: '/chenggong'
  },
  {
    name: '大理',
    title: '大理瓦猫 · 威仪奔放',
    desc: '嘴巴大张，几乎占据整个头部。造型夸张奔放，蹲姿踞守，虎气十足。"口要张，肚要空，屁眼要通"。',
    image: '/images/wamao-dali-1.jpg',
    traits: ['吞金屙银', '独角虎', '飞虎'],
    link: '/dali'
  },
  {
    name: '丽江',
    title: '丽江瓦猫 · 古拙想象',
    desc: '造型最富想象力，似麒麟类龙狮，脖子修长。伫立屋脊，守望古城，承载纳西族人对安宁生活的祈愿。',
    image: '/images/wamao-lijiang.jpg',
    traits: ['麒麟形', '龙狮韵', '长颈古拙'],
    link: '/lijiang'
  }
]
</script>

<style scoped>
.btn-primary {
  @apply px-9 py-3.5 rounded text-base no-underline inline-flex items-center gap-2 transition-all duration-300 font-serif;
  background: var(--red); color: #fff;
  box-shadow: 0 4px 16px rgba(184,58,43,0.3);
}
.btn-primary:hover { background: #9C2E20; transform: translateY(-2px); }
.btn-outline {
  @apply px-9 py-3.5 rounded text-base no-underline inline-flex items-center gap-2 transition-all duration-300 font-serif border-2;
  border-color: var(--brown); color: var(--ink);
}
.btn-outline:hover { background: var(--brown); color: var(--bg); }
</style>
