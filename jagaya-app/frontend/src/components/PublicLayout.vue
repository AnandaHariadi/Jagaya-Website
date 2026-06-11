<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userRole')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo & Brand -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer" @click="router.push('/public-dashboard')">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                J
              </div>
              <span class="font-black text-xl tracking-tight text-gray-900 hidden sm:block">JAGAYA <span class="text-orange-500 text-sm font-bold">Publik</span></span>
            </div>
            
            <!-- Desktop Menu -->
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
              <router-link to="/public-dashboard" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors" active-class="!border-orange-500 !text-gray-900" exact-active-class="!border-orange-500 !text-gray-900">
                Beranda
              </router-link>
              <router-link to="/public-donasi" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors" active-class="!border-orange-500 !text-gray-900">
                Donasi
              </router-link>
              <router-link to="/public-relawan" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors" active-class="!border-orange-500 !text-gray-900">
                Daftar Relawan
              </router-link>
            </div>
          </div>

          <!-- User Actions -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button @click="handleLogout" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gray-900 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Keluar
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!isMobileMenuOpen" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMobileMenuOpen" class="sm:hidden border-t border-gray-200" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <router-link to="/public-dashboard" @click="isMobileMenuOpen=false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" active-class="!bg-orange-50 !border-orange-500 !text-orange-700">Beranda</router-link>
          <router-link to="/public-donasi" @click="isMobileMenuOpen=false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" active-class="!bg-orange-50 !border-orange-500 !text-orange-700">Donasi</router-link>
          <router-link to="/public-relawan" @click="isMobileMenuOpen=false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" active-class="!bg-orange-50 !border-orange-500 !text-orange-700">Daftar Relawan</router-link>
          <button @click="handleLogout" class="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-300">Keluar</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; 2026 JAGAYA System. Didedikasikan untuk Penanggulangan Bencana Demak.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }
</style>
