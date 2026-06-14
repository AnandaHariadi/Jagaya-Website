<script setup>
import { Bars3Icon } from '@heroicons/vue/24/outline'
import DashboardSidebar from './DashboardSidebar.vue'
import { sidebarOpen } from '../composables/dashboardState'
import logoImg from '../assets/logo-jagaya.png'
</script>

<template>
  <div class="dl-wrapper">
    <DashboardSidebar />
    
    <!-- Mobile Top Header -->
    <div class="mobile-top-header lg:hidden">
      <div class="flex items-center gap-3">
        <button @click="sidebarOpen = true" class="mobile-toggle-btn">
          <Bars3Icon class="w-6 h-6 text-gray-700" />
        </button>
        <div class="flex items-center gap-2">
          <img :src="logoImg" alt="JAGAYA" class="w-6 h-6 object-contain" />
          <span class="font-black text-lg text-gray-900 tracking-tight">JAGAYA</span>
        </div>
      </div>
    </div>

    <div class="dl-main" :class="{ collapsed: !sidebarOpen }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dl-wrapper { min-height: 100vh; background: #f8f9fb; }
.dl-main {
  margin-left: 260px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
}
.dl-main.collapsed { margin-left: 72px; }

.mobile-top-header {
  display: none;
}

@media (max-width: 1024px) {
  .dl-main, .dl-main.collapsed { 
    margin-left: 0 !important; 
    padding-top: 60px; /* Space for the fixed mobile header */
  }
  
  .mobile-top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #f0f0f3;
    padding: 0 16px;
    z-index: 80;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  
  .mobile-toggle-btn {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px; border: none; background: #f5f5f7;
    cursor: pointer; transition: background 0.2s;
  }
  .mobile-toggle-btn:active {
    background: #e5e7eb;
  }
}
</style>
