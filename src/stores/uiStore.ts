import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isLoading = ref(false)
  const activeSection = ref('home')
  const isMobile = ref(false)

  function setMobile(v: boolean) {
    isMobile.value = v
  }

  function setActiveSection(s: string) {
    activeSection.value = s
  }

  function setLoading(v: boolean) {
    isLoading.value = v
  }

  return { isLoading, activeSection, isMobile, setMobile, setActiveSection, setLoading }
})
