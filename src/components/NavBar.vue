<template>
  <nav class="fixed top-0 w-full z-[1000] backdrop-blur-md border-b border-wamao-brown/15 h-16 flex items-center justify-between px-[5%]"
       :class="isScrolled ? 'bg-wamao-bg/95' : 'bg-wamao-bg/80'">
    <router-link to="/" class="font-display text-wamao-ink text-3xl tracking-widest no-underline">
      瓦猫新生 <span class="text-wamao-red text-xl ml-2">文化中国</span>
    </router-link>
    <ul class="hidden md:flex gap-8 list-none">
      <li v-for="link in navLinks" :key="link.to">
        <router-link :to="link.to"
          class="text-wamao-text text-[0.95rem] relative py-1 transition-colors duration-300 no-underline hover:text-wamao-red group">
          {{ link.label }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-wamao-red transition-all duration-300 group-hover:w-full" />
        </router-link>
      </li>
    </ul>
    <div class="md:hidden text-2xl cursor-pointer text-wamao-ink" @click="toggleMobile">☰</div>
  </nav>
  <!-- Mobile menu -->
  <div v-if="mobileOpen" class="fixed inset-0 z-[999] bg-wamao-bg/98 md:hidden pt-20 px-[5%]">
    <div class="flex flex-col gap-6 text-center">
      <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
        class="text-wamao-text text-xl no-underline py-2 border-b border-wamao-brown/10"
        @click="mobileOpen = false">
        {{ link.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mobileOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/chenggong', label: '呈贡瓦猫' },
  { to: '/dali', label: '大理瓦猫' },
  { to: '/lijiang', label: '丽江瓦猫' },
  { to: '/diy', label: 'DIY工坊' }
]

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
