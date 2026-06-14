<script setup>
import { useRoute } from 'vue-router'
import {
  HomeIcon, UsersIcon, MapPinIcon, HeartIcon, TruckIcon,
  DocumentTextIcon, Cog6ToothIcon, ChevronDownIcon,
  Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon, ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline'
import { ShieldCheckIcon as ShieldSolid } from '@heroicons/vue/24/solid'
import { sidebarOpen, handleLogout } from '../composables/dashboardState'
import logoImg from '../assets/logo-jagaya.png'

const route = useRoute()

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Pengungsian', icon: MapPinIcon, path: '/pengungsian' },
  { name: 'Relawan', icon: UsersIcon, path: '/relawan', badge: 12 },
  { name: 'Donasi', icon: HeartIcon, path: '/donasi' },
  { name: 'Logistik', icon: TruckIcon, path: '/logistik' },
  { name: 'Laporan', icon: DocumentTextIcon, path: '/laporan' },
  { name: 'Forum Aspirasi', icon: ChatBubbleLeftRightIcon, path: '/forum' },
]
</script>

<template>
  <div>
    <!-- Mobile Overlay -->
    <div class="mobile-overlay lg:hidden" :class="{ 'overlay-visible': sidebarOpen }" @click="sidebarOpen = false"></div>
    
    <!-- Mobile Floating Toggle -->
    <button class="mobile-floating-toggle lg:hidden" @click="sidebarOpen = !sidebarOpen">
      <Bars3Icon v-if="!sidebarOpen" class="w-6 h-6" />
      <XMarkIcon v-else class="w-6 h-6" />
    </button>

    <aside class="ds-sidebar" :class="{ collapsed: !sidebarOpen, 'mobile-open': sidebarOpen }">
    <div class="ds-header">
      <div class="ds-logo">
        <div class="ds-logo-icon"><img :src="logoImg" alt="JAGAYA" class="w-7 h-7 object-contain" /></div>
        <transition name="ds-fade-text">
          <span v-if="sidebarOpen" class="ds-logo-text">JAGAYA</span>
        </transition>
      </div>
      <button @click="sidebarOpen = !sidebarOpen" class="ds-toggle">
        <Bars3Icon v-if="!sidebarOpen" class="w-5 h-5" />
        <XMarkIcon v-else class="w-5 h-5" />
      </button>
    </div>

    <div class="ds-user" v-if="sidebarOpen">
      <div class="ds-avatar">
        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" alt="Admin" />
        <span class="ds-status-dot"></span>
      </div>
      <div class="ds-user-info">
        <p class="ds-user-name">Admin Posko</p>
        <p class="ds-user-role">Koordinator Utama</p>
      </div>
      <ChevronDownIcon class="w-4 h-4 text-gray-400" />
    </div>

    <nav class="ds-nav">
      <p class="ds-nav-label" v-if="sidebarOpen">MENU UTAMA</p>
      <router-link
        v-for="item in menuItems" :key="item.name"
        :to="item.path"
        class="ds-nav-item"
        :class="{ active: route.path === item.path }"
      >
        <component :is="item.icon" class="ds-nav-icon" />
        <span v-if="sidebarOpen" class="ds-nav-text">{{ item.name }}</span>
        <span v-if="item.badge && sidebarOpen" class="ds-nav-badge">{{ item.badge }}</span>
      </router-link>
    </nav>

    <div class="ds-bottom">
      <router-link to="/dashboard" class="ds-nav-item">
        <Cog6ToothIcon class="ds-nav-icon" />
        <span v-if="sidebarOpen" class="ds-nav-text">Pengaturan</span>
      </router-link>
      <button class="ds-nav-item ds-logout" @click="handleLogout" type="button">
        <ArrowLeftOnRectangleIcon class="ds-nav-icon" />
        <span v-if="sidebarOpen" class="ds-nav-text">Logout</span>
      </button>
    </div>
  </aside>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
.ds-sidebar * { font-family: 'Inter', system-ui, sans-serif; }

.ds-sidebar {
  width: 260px;
  background: #fff;
  border-right: 1px solid #f0f0f3;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.ds-sidebar.collapsed { width: 72px; }

/* Mobile Floating Toggle */
.mobile-floating-toggle {
  display: none;
}
.mobile-overlay {
  display: none;
}

@media (max-width: 1024px) {
  .mobile-floating-toggle {
    display: flex;
    position: fixed; bottom: 20px; right: 20px;
    width: 50px; height: 50px; border-radius: 25px;
    background: linear-gradient(135deg, #ea580c, #dc2626); color: #fff; border: none;
    align-items: center; justify-content: center;
    z-index: 110; box-shadow: 0 4px 16px rgba(234, 88, 12, 0.4);
    cursor: pointer;
    transition: transform 0.2s;
  }
  .mobile-floating-toggle:active {
    transform: scale(0.92);
  }
  .ds-sidebar {
    transform: translateX(-100%);
    width: 260px !important;
  }
  .ds-sidebar.mobile-open {
    transform: translateX(0);
  }
  .mobile-overlay {
    display: block; position: fixed; inset: 0;
    background: rgba(0,0,0,0.5); z-index: 90;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .mobile-overlay.overlay-visible {
    opacity: 1; pointer-events: auto;
  }
}
@media (max-width: 480px) {
  .mobile-floating-toggle {
    bottom: 16px; right: 16px;
    width: 46px; height: 46px;
  }
}

.ds-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 16px 16px;
  border-bottom: 1px solid #f5f5f7;
}
.ds-logo { display: flex; align-items: center; gap: 10px; }
.ds-logo-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #ea580c, #dc2626);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3); flex-shrink: 0;
}
.ds-logo-text { font-size: 18px; font-weight: 900; color: #111827; letter-spacing: -0.5px; }
.ds-toggle {
  width: 32px; height: 32px; border-radius: 8px; border: none;
  background: #f5f5f7; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #6b7280; transition: all 0.2s;
}
.ds-toggle:hover { background: #eee; color: #111; }

.ds-user {
  display: flex; align-items: center; gap: 10px;
  padding: 16px; margin: 8px 12px; border-radius: 14px;
  background: #fafafa; border: 1px solid #f0f0f3; cursor: pointer; transition: all 0.2s;
}
.ds-user:hover { background: #f5f5f5; }
.ds-avatar { position: relative; flex-shrink: 0; }
.ds-avatar img { width: 38px; height: 38px; border-radius: 10px; object-fit: cover; }
.ds-status-dot {
  position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px;
  border-radius: 50%; background: #22c55e; border: 2px solid #fff;
}
.ds-user-info { flex: 1; min-width: 0; }
.ds-user-name { font-size: 13px; font-weight: 700; color: #111827; }
.ds-user-role { font-size: 11px; font-weight: 500; color: #9ca3af; }

.ds-nav { flex: 1; padding: 8px 12px; overflow-y: auto; }
.ds-nav-label { font-size: 10px; font-weight: 800; color: #c0c0c8; letter-spacing: 0.12em; padding: 12px 12px 6px; }
.ds-nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 10px;
  font-size: 13.5px; font-weight: 600; color: #6b7280;
  text-decoration: none; transition: all 0.2s; margin-bottom: 2px;
  position: relative; width: 100%; border: none; background: none; cursor: pointer;
}
.ds-nav-item:hover { background: #f5f5f7; color: #111827; }
.ds-nav-item.active {
  background: linear-gradient(135deg, #fff7ed, #fef2f2);
  color: #ea580c; font-weight: 700;
}
.ds-nav-item.active::before {
  content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 3px; height: 20px; border-radius: 0 4px 4px 0;
  background: linear-gradient(to bottom, #ea580c, #dc2626);
}
.ds-nav-icon { width: 20px; height: 20px; flex-shrink: 0; }
.ds-nav-text { white-space: nowrap; }
.ds-nav-badge {
  margin-left: auto; font-size: 10px; font-weight: 800;
  background: linear-gradient(135deg, #ea580c, #dc2626); color: #fff;
  padding: 2px 7px; border-radius: 6px;
}
.ds-bottom { padding: 12px; border-top: 1px solid #f5f5f7; }
.ds-logout:hover { background: #fef2f2; color: #dc2626; }

.ds-fade-text-enter-active, .ds-fade-text-leave-active { transition: opacity 0.2s; }
.ds-fade-text-enter-from, .ds-fade-text-leave-to { opacity: 0; }
</style>
