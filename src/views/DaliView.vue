<template>
  <section class="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-wamao-bg-warm to-wamao-bg relative pt-16 text-center">
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-wamao-red text-[10rem] opacity-[0.06] z-0 max-md:text-[6rem]">大理</span>
    <div class="relative z-[1]">
      <div class="text-wamao-brown text-[1.2rem] tracking-[4px]">苍洱之间 · 大理古国</div>
      <h1 class="font-display text-wamao-ink text-[3.6rem] mb-3 max-md:text-[2.6rem]">大理瓦猫</h1>
      <div class="w-[60px] h-[3px] bg-wamao-red mx-auto rounded my-5" />
      <p class="text-wamao-brown text-[1.1rem]">威仪奔放 · 吞金屙银 · 虎气十足</p>
    </div>
  </section>

  <div class="max-w-[1000px] mx-auto py-20 px-[5%]">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 my-10">
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img src="/images/wamao-dali-1.jpg" alt="大理瓦猫家族" class="w-full block transition-transform duration-400 hover:scale-105" />
        <div class="px-4 py-3 bg-wamao-bg-warm text-wamao-brown text-center text-[0.9rem]">大理瓦猫家族 — 泥塑原型</div>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg">
        <img src="/images/wamao-dali-2.jpg" alt="大理瓦猫手工" class="w-full block transition-transform duration-400 hover:scale-105" />
        <div class="px-4 py-3 bg-wamao-bg-warm text-wamao-brown text-center text-[0.9rem]">大理手工瓦猫 — 掌中灵兽</div>
      </div>
    </div>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />形貌特征
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      大理瓦猫最显著的特征，是<strong>嘴巴大张，几乎占据整个头部</strong>。
      其造型<strong>夸张奔放，蹲姿踞守，虎气十足</strong>。
    </p>
    <div class="bg-wamao-red/5 border-l-4 border-wamao-red px-7 py-6 my-7 rounded-r-lg">
      <p class="text-wamao-brown text-[1.1rem]">
        瓦猫<strong>"口要张，肚要空，屁眼要通"</strong>——肚子中空，传说中<strong>"吞金屙银"</strong>：张着大嘴把外面的金银财宝吞进肚，屙到主人家中来。
      </p>
    </div>
    <p class="mb-4 text-justify text-[1.05rem]">
      有的瓦猫有角，称<strong>独角虎</strong>；有的有翅膀，称<strong>飞虎</strong>；
      有的虎身人面，称<strong>笑面虎</strong>。风吹过，瓦猫"呼呼"作响，方为正宗的大理手工工艺。
    </p>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />四大品类
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">以用途区分，大理瓦猫可分为四大类，又有迎吉、望庚、嘉瑞等十余种精致造型：</p>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 my-7">
      <div class="bg-wamao-bg-warm rounded-lg p-6 border border-wamao-brown/10 text-center">
        <h4 class="font-display text-wamao-red text-[1.3rem] mb-2">脊猫</h4>
        <p class="text-wamao-text text-[0.95rem]">踞于正脊之上，统领全屋气场，镇宅守院。</p>
      </div>
      <div class="bg-wamao-bg-warm rounded-lg p-6 border border-wamao-brown/10 text-center">
        <h4 class="font-display text-wamao-red text-[1.3rem] mb-2">带猫</h4>
        <p class="text-wamao-text text-[0.95rem]">饰于檐带之间，护佑屋檐滴水不漏，家宅安宁。</p>
      </div>
      <div class="bg-wamao-bg-warm rounded-lg p-6 border border-wamao-brown/10 text-center">
        <h4 class="font-display text-wamao-red text-[1.3rem] mb-2">角猫</h4>
        <p class="text-wamao-text text-[0.95rem]">蹲守屋角，目光如炬，专司驱邪避煞。</p>
      </div>
      <div class="bg-wamao-bg-warm rounded-lg p-6 border border-wamao-brown/10 text-center">
        <h4 class="font-display text-wamao-red text-[1.3rem] mb-2">门猫</h4>
        <p class="text-wamao-text text-[0.95rem]">立于门头之上，迎福纳吉，守护出入平安。</p>
      </div>
    </div>

    <h2 class="font-display text-wamao-ink text-[2rem] my-12 flex items-center gap-3">
      <span class="w-1 h-7 bg-wamao-red rounded" />文化寓意
    </h2>
    <p class="mb-4 text-justify text-[1.05rem]">
      大理瓦猫是白族文化与中原屋脊兽传统融合的产物。
      "吞金屙银"的民间传说，寄托了大理百姓对富足生活的向往；
      而"口张肚空"的物理结构，既是对自然风雨的顺应，也是对"虚怀若谷"哲学的生活化表达。
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
const traits = ['大嘴吞天', '吞金屙银', '独角虎', '飞虎', '笑面虎', '风吹作响']
</script>
