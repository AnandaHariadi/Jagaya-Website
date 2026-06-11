<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const hiddenNavbarPages = ['Splash', 'Login', 'Dashboard', 'Pengungsian', 'Relawan', 'Donasi', 'Logistik', 'Laporan']
const showNavbar = computed(() => !hiddenNavbarPages.includes(route.name))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar v-if="showNavbar" />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
