<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progress = ref(0)
const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)

  const interval = setInterval(() => {
    progress.value += Math.random() * 4
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        router.push('/landing')
      }, 400)
    }
  }, 30)
})
</script>

<template>
  <div class="w-screen h-screen bg-white flex flex-col items-center justify-center font-sans relative overflow-hidden">
    <!-- Subtle Gradient Glow in Background -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <div class="w-[500px] h-[500px] bg-gradient-to-tr from-orange-100 to-red-50 rounded-full blur-[100px]"></div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center transition-all duration-1000 transform" :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
      
      <!-- Elegant Logo Animation -->
      <div class="relative mb-6">
        <div class="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
        <div class="w-20 h-20 bg-white rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.15)] flex items-center justify-center relative z-10 border border-gray-50">
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#splashGrad)"/>
            <path d="M2 17l10 5 10-5" stroke="url(#splashGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12l10 5 10-5" stroke="url(#splashGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="splashGrad" x1="2" y1="2" x2="22" y2="22">
                <stop offset="0%" stop-color="#f97316"/>
                <stop offset="100%" stop-color="#dc2626"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Clean Typography -->
      <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">JAGAYA</h1>
      
      <!-- Minimalist Loading Indicator -->
      <div class="w-48 h-1 bg-gray-100 rounded-full mt-8 overflow-hidden relative">
        <div class="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-75 ease-out" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
