<template>
  <NavBar />
  <router-view />
  <footer class="bg-wamao-ink text-wamao-bg/70 text-center py-10 px-[5%] text-sm mt-16">
    <div class="font-display text-wamao-bg text-3xl mb-3">瓦猫新生</div>
    <p>"文化中国"参赛作品 · 云南瓦猫文化数字互动体验</p>
    <p class="mt-2 opacity-60">请君入座，共塑灵兽</p>
  </footer>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
