<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/logo-jagaya.png'

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
        <div class="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        <div class="relative z-10 flex items-center justify-center">
          <img :src="logoImg" alt="JAGAYA" class="w-28 h-28 object-contain drop-shadow-xl hover:scale-105 transition-transform" />
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
