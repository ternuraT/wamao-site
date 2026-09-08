<template>
  <router-link :to="link" class="block bg-wamao-bg rounded-lg overflow-hidden shadow-lg transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl border border-wamao-brown/10 no-underline text-inherit">
    <div class="h-[350px] bg-cover bg-top relative" :style="{ backgroundImage: `url('${image}')` }">
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span class="absolute top-4 right-4 z-[2] bg-wamao-red text-white px-3.5 py-1 rounded-full text-[0.8rem] tracking-[2px]">
        {{ name }}
      </span>
    </div>
    <div class="p-7">
      <h3 class="text-2xl text-wamao-ink mb-2.5 font-display">{{ title }}</h3>
      <p class="text-wamao-text text-[0.95rem] leading-relaxed">{{ desc }}</p>
      <div class="flex gap-2.5 mt-4 flex-wrap">
        <span v-for="t in traits" :key="t" class="px-3 py-1 bg-wamao-red/8 text-wamao-red rounded text-[0.8rem] border border-wamao-red/20">
          {{ t }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  title: string
  desc: string
  image: string
  traits: string[]
  link: string
}>()
</script>
