<script setup>
import DashboardSidebar from './DashboardSidebar.vue'
import { sidebarOpen } from '../composables/dashboardState'
</script>

<template>
  <div class="dl-wrapper">
    <DashboardSidebar />
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
@media (max-width: 768px) {
  .dl-main, .dl-main.collapsed { margin-left: 72px; }
}
</style>
