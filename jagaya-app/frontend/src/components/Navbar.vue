<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
const router = useRouter()
const route = useRoute()

const navLinks = [
  { name: 'Beranda', path: '/landing' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Donasi', path: '/donasi' },
  { name: 'Relawan', path: '/relawan' },
  { name: 'Tentang Kami', path: '/developer' }
]

const isActive = (path) => {
  if (path === '/landing') {
    return route.path === '/landing' || route.path === '/' || route.path === '/splash'
  }
  return route.path === path
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="fixed w-full z-50 top-0 transition-all duration-300 font-sans" :class="[route.path === '/landing' ? 'bg-white/80 backdrop-blur-md border-b border-gray-100' : 'bg-white border-b border-gray-100']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer group" @click="router.push('/landing')">
          <div class="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_5px_15px_rgba(37,99,235,0.2)] group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
              <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="text-xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">JAGAYA</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 relative group overflow-hidden"
            :class="[isActive(link.path) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900']"
          >
            <span class="relative z-10">{{ link.name }}</span>
            <div 
              class="absolute inset-0 bg-blue-50 rounded-full transition-transform duration-300 transform scale-0 origin-center z-0"
              :class="isActive(link.path) ? 'scale-100' : 'group-hover:scale-100'"
            ></div>
          </router-link>
        </div>

        <!-- Right CTA & Profile -->
        <div class="hidden md:flex items-center gap-4">
          <router-link to="/login" class="px-6 py-2.5 text-[14px] font-bold text-gray-700 hover:text-blue-600 transition-colors">Masuk</router-link>
          <router-link to="/donasi" class="px-6 py-2.5 rounded-full bg-gray-900 hover:bg-blue-600 text-white text-[14px] font-bold shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
            Bantu Sekarang
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-gray-500 hover:text-gray-900 focus:outline-none p-2 rounded-full hover:bg-gray-50 transition-colors">
            <Bars3Icon v-if="!isOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isOpen" class="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden animate-slide-down">
      <div class="px-4 pt-2 pb-6 space-y-1">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          @click="isOpen = false"
          class="block px-4 py-3 rounded-xl text-base font-semibold transition-colors"
          :class="[isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
        >
          {{ link.name }}
        </router-link>
        <div class="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
          <router-link to="/login" @click="isOpen = false" class="w-full text-center px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
            Masuk ke Sistem
          </router-link>
          <router-link to="/donasi" @click="isOpen = false" class="w-full text-center px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Bantu Sekarang
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* {
  font-family: 'Inter', system-ui, sans-serif;
}
.animate-slide-down {
  animation: slideDown 0.3s ease-out forwards;
  transform-origin: top;
}
@keyframes slideDown {
  from { opacity: 0; transform: scaleY(0); }
  to { opacity: 1; transform: scaleY(1); }
}
</style>
