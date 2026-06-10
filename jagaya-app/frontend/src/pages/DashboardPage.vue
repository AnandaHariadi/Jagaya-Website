<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  HomeIcon, UsersIcon, MapPinIcon, GiftIcon, CurrencyDollarIcon,
  Cog6ToothIcon, BellIcon, ChevronDownIcon, ArrowTrendingUpIcon,
  ArrowTrendingDownIcon, MagnifyingGlassIcon, FunnelIcon,
  EllipsisHorizontalIcon, ArrowRightIcon, ShieldCheckIcon,
  ClockIcon, ExclamationTriangleIcon, CheckCircleIcon,
  TruckIcon, HeartIcon, UserGroupIcon, BuildingOfficeIcon,
  ChartBarIcon, DocumentTextIcon, Bars3Icon, XMarkIcon,
  ArrowUpIcon, ArrowDownIcon, EyeIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/vue/24/outline'

import { ShieldCheckIcon as ShieldSolid } from '@heroicons/vue/24/solid'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

/* ── SIDEBAR ─────────────────────────────────────────── */
const sidebarOpen = ref(true)
const activeMenu = ref('Dashboard')

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Pengungsian', icon: MapPinIcon, path: '/pengungsian' },
  { name: 'Relawan', icon: UsersIcon, path: '/relawan', badge: 12 },
  { name: 'Donasi', icon: HeartIcon, path: '/donasi' },
  { name: 'Logistik', icon: TruckIcon, path: '/logistik' },
  { name: 'Laporan', icon: DocumentTextIcon, path: '/laporan' },
]

const bottomMenuItems = [
  { name: 'Pengaturan', icon: Cog6ToothIcon, path: '/dashboard' },
]

/* ── LIVE CLOCK ─────────────────────────────────────────── */
const now = ref(new Date())
let ticker = null
onMounted(() => { ticker = setInterval(() => now.value = new Date(), 1000) })
onUnmounted(() => clearInterval(ticker))
const timeStr = computed(() => now.value.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
const dateStr = computed(() => now.value.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

/* ── STAT CARDS ──────────────────────────────────────────── */
const statCards = [
  {
    category: 'Pengungsian',
    icon: MapPinIcon,
    color: 'from-red-600 to-red-500',
    bgLight: 'bg-red-50',
    textColor: 'text-red-600',
    stats: [
      { label: 'Posko Aktif', value: 45 },
      { label: 'Pengungsi', value: '12.4K' },
      { label: 'Terdampak', value: '28.7K' },
    ]
  },
  {
    category: 'Relawan',
    icon: UsersIcon,
    color: 'from-orange-500 to-amber-500',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-600',
    stats: [
      { label: 'Total', value: '1.2K' },
      { label: 'Aktif', value: 842 },
      { label: 'Standby', value: 358 },
    ]
  },
  {
    category: 'Logistik',
    icon: TruckIcon,
    color: 'from-emerald-600 to-emerald-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    stats: [
      { label: 'Dikirim', value: '8.4K' },
      { label: 'Diterima', value: '7.9K' },
      { label: 'Pending', value: 523 },
    ]
  },
  {
    category: 'Donasi',
    icon: CurrencyDollarIcon,
    color: 'from-violet-600 to-violet-500',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-600',
    stats: [
      { label: 'Total (Jt)', value: 245 },
      { label: 'Donatur', value: '3.2K' },
      { label: 'Tersalur', value: '89%' },
    ]
  },
]

/* ── CHART DATA ──────────────────────────────────────────── */
const lineData = {
  labels: ['00', '03', '06', '09', '12', '15', '18', '21', '24', '27', '30'],
  datasets: [
    {
      label: 'Pengungsi Masuk',
      data: [120, 185, 215, 340, 380, 420, 395, 450, 480, 520, 545],
      borderColor: '#ea580c',
      backgroundColor: ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220)
        g.addColorStop(0, 'rgba(234,88,12,0.2)')
        g.addColorStop(1, 'rgba(234,88,12,0)')
        return g
      },
      tension: 0.4, fill: true, borderWidth: 2.5,
      pointBackgroundColor: '#ea580c', pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 0, pointHoverRadius: 6
    },
    {
      label: 'Bantuan Tersalur',
      data: [80, 120, 165, 200, 280, 350, 310, 380, 410, 460, 490],
      borderColor: '#2563eb',
      backgroundColor: ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220)
        g.addColorStop(0, 'rgba(37,99,235,0.12)')
        g.addColorStop(1, 'rgba(37,99,235,0)')
        return g
      },
      tension: 0.4, fill: true, borderWidth: 2.5,
      pointBackgroundColor: '#2563eb', pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 0, pointHoverRadius: 6
    }
  ]
}
const lineOpts = {
  responsive: true, maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#18181b', titleColor: '#f9fafb', bodyColor: '#d1d5db',
      padding: 12, cornerRadius: 12, bodySpacing: 6,
      callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}` }
    }
  },
  scales: {
    y: { grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false }, ticks: { color: '#9ca3af', font: { size: 11 } }, border: { display: false } },
    x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } }, border: { display: false } }
  }
}

const donutData = {
  labels: ['Makanan', 'Obat-obatan', 'Pakaian', 'Air Bersih', 'Selimut'],
  datasets: [{
    data: [35, 22, 12, 20, 11],
    backgroundColor: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
    borderWidth: 0, hoverOffset: 8, borderRadius: 4
  }]
}
const donutOpts = {
  responsive: true, maintainAspectRatio: false, cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#18181b', titleColor: '#f9fafb', bodyColor: '#d1d5db',
      padding: 12, cornerRadius: 12,
      callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` }
    }
  }
}

/* ── METRICS ─────────────────────────────────────────────── */
const sideMetrics = [
  { label: 'Total Pengungsi', value: '12,450', icon: UserGroupIcon, change: '+2.5%', up: true, sub: 'vs kemarin' },
  { label: 'Paket Tersalur', value: '8,250', icon: GiftIcon, change: '+12.3%', up: true, sub: 'vs kemarin' },
  { label: 'Posko Aktif', value: '45', icon: BuildingOfficeIcon, change: '-2', up: false, sub: 'vs kemarin' },
  { label: 'Respons Rate', value: '94.5%', icon: CheckCircleIcon, change: '+1.2%', up: true, sub: 'vs kemarin' },
]

/* ── TABLE DATA ──────────────────────────────────────────── */
const poskoData = ref([
  { id: 1, nama: 'Posko Karanganyar', lokasi: 'Kec. Karanganyar', kapasitas: 500, pengungsi: 487, status: 'Kritis', koordinator: 'Budi Santoso', kontak: '0812-3456-789', lastUpdate: '10 menit lalu' },
  { id: 2, nama: 'Posko Sayung Utara', lokasi: 'Kec. Sayung', kapasitas: 300, pengungsi: 215, status: 'Siaga', koordinator: 'Siti Rahayu', kontak: '0898-7654-321', lastUpdate: '25 menit lalu' },
  { id: 3, nama: 'Posko Demak Kota', lokasi: 'Kec. Demak', kapasitas: 400, pengungsi: 180, status: 'Normal', koordinator: 'Ahmad Fauzi', kontak: '0856-1234-567', lastUpdate: '5 menit lalu' },
  { id: 4, nama: 'Posko Bonang', lokasi: 'Kec. Bonang', kapasitas: 250, pengungsi: 240, status: 'Kritis', koordinator: 'Dewi Lestari', kontak: '0878-9012-345', lastUpdate: '2 menit lalu' },
  { id: 5, nama: 'Posko Mijen Selatan', lokasi: 'Kec. Mijen', kapasitas: 350, pengungsi: 122, status: 'Normal', koordinator: 'Rudi Hartono', kontak: '0813-5678-901', lastUpdate: '45 menit lalu' },
  { id: 6, nama: 'Posko Wedung', lokasi: 'Kec. Wedung', kapasitas: 280, pengungsi: 265, status: 'Siaga', koordinator: 'Nur Hidayah', kontak: '0857-2345-678', lastUpdate: '15 menit lalu' },
])

const searchQuery = ref('')
const filteredPosko = computed(() => {
  if (!searchQuery.value) return poskoData.value
  const q = searchQuery.value.toLowerCase()
  return poskoData.value.filter(p =>
    p.nama.toLowerCase().includes(q) || p.lokasi.toLowerCase().includes(q) || p.koordinator.toLowerCase().includes(q)
  )
})

/* ── RECENT ACTIVITIES ───────────────────────────────────── */
const activities = [
  { time: '10:45', text: 'Tanggul jebol di 2 titik — Karanganyar', type: 'danger' },
  { time: '10:30', text: 'Bantuan BNPB tiba 3 truk logistik', type: 'success' },
  { time: '09:15', text: 'Evakuasi warga RT 01/RW 03 Sayung', type: 'warning' },
  { time: '08:45', text: 'Posko Bonang hampir penuh (96%)', type: 'warning' },
  { time: '08:00', text: 'Relawan baru terdaftar: 15 orang', type: 'info' },
]

/* ── NOTIFICATION COUNT ─────────────────────────────────── */
const notifCount = ref(5)

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  window.location.href = '/login'
}
</script>


<template>
  <div class="dashboard-wrapper" style="font-family:'Inter',system-ui,sans-serif">
    <!-- ═══════ SIDEBAR ═══════ -->
    <aside class="sidebar" :class="{ collapsed: !sidebarOpen }">
      <!-- Logo -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <ShieldSolid class="w-5 h-5 text-white" />
          </div>
          <transition name="fade-text">
            <span v-if="sidebarOpen" class="logo-text">JAGAYA</span>
          </transition>
        </div>
        <button @click="sidebarOpen = !sidebarOpen" class="sidebar-toggle">
          <Bars3Icon v-if="!sidebarOpen" class="w-5 h-5" />
          <XMarkIcon v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- User card -->
      <div class="sidebar-user" v-if="sidebarOpen">
        <div class="user-avatar">
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" alt="Admin" />
          <span class="user-status-dot"></span>
        </div>
        <div class="user-info">
          <p class="user-name">Admin Posko</p>
          <p class="user-role">Koordinator Utama</p>
        </div>
        <ChevronDownIcon class="w-4 h-4 text-gray-400" />
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <p class="nav-label" v-if="sidebarOpen">MENU UTAMA</p>
        <router-link
          v-for="item in menuItems" :key="item.name"
          :to="item.path"
          class="nav-item"
          :class="{ active: activeMenu === item.name }"
          @click="activeMenu = item.name"
        >
          <component :is="item.icon" class="nav-icon" />
          <span v-if="sidebarOpen" class="nav-text">{{ item.name }}</span>
          <span v-if="item.badge && sidebarOpen" class="nav-badge">{{ item.badge }}</span>
        </router-link>
      </nav>

      <!-- Bottom nav -->
      <div class="sidebar-bottom">
        <router-link
          v-for="item in bottomMenuItems" :key="item.name"
          :to="item.path"
          class="nav-item"
        >
          <component :is="item.icon" class="nav-icon" />
          <span v-if="sidebarOpen" class="nav-text">{{ item.name }}</span>
        </router-link>
      </div>
    </aside>

    <!-- ═══════ MAIN CONTENT ═══════ -->
    <div class="main-content">
      <!-- Top Header Bar -->
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">{{ dateStr }} · <span class="live-time">{{ timeStr }} WIB</span></p>
        </div>
        <div class="header-right">
          <!-- Search -->
          <div class="header-search">
            <MagnifyingGlassIcon class="search-icon" />
            <input type="text" placeholder="Cari data posko, relawan..." class="search-input" />
          </div>
          <!-- Notification -->
          <button class="notif-btn">
            <BellIcon class="w-5 h-5" />
            <span v-if="notifCount" class="notif-badge">{{ notifCount }}</span>
          </button>
          <!-- Logout -->
          <button class="view-site-btn" @click="handleLogout" type="button" style="background:#fff; color:#dc2626; border:1px solid #fee2e2;">
            <ArrowLeftOnRectangleIcon class="w-4 h-4" />
            Logout
          </button>
          <!-- View Site -->
          <router-link to="/landing" class="view-site-btn">
            <EyeIcon class="w-4 h-4" />
            Lihat Situs
          </router-link>
        </div>
      </header>


      <!-- Content Area -->
      <div class="content-area">
        <!-- ══ Banner CTA ══ -->
        <div class="promo-banner">
          <div class="banner-content">
            <div class="banner-icon-wrap">
              <ExclamationTriangleIcon class="w-6 h-6 text-white" />
            </div>
            <div class="banner-text">
              <p class="banner-title">12 titik kritis membutuhkan bantuan segera di wilayah Demak.</p>
              <p class="banner-sub">Koordinasi tim relawan dan distribusi logistik untuk mempercepat penanganan.</p>
            </div>
          </div>
          <router-link to="/donasi" class="banner-btn">
            Koordinasi Sekarang
          </router-link>
        </div>

        <!-- ══ Stat Cards (4 columns like the image) ══ -->
        <div class="stat-cards-grid">
          <div v-for="card in statCards" :key="card.category" class="stat-card">
            <div class="stat-card-header">
              <div :class="['stat-card-icon', card.bgLight]">
                <component :is="card.icon" :class="['w-5 h-5', card.textColor]" />
              </div>
              <h3 class="stat-card-title">{{ card.category }}</h3>
            </div>
            <div class="stat-card-body">
              <div v-for="(stat, i) in card.stats" :key="i" class="stat-item" :class="{ 'stat-item-border': i > 0 }">
                <p class="stat-value">{{ stat.value }}</p>
                <p class="stat-label">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ══ Main Grid: Chart + Side Metrics ══ -->
        <div class="dashboard-grid">
          <!-- Chart Section -->
          <div class="chart-card">
            <div class="chart-header">
              <div>
                <h3 class="chart-title">Monitoring Harian</h3>
                <div class="chart-summary">
                  <span class="chart-big-number">545</span>
                  <span class="chart-change positive">
                    <ArrowTrendingUpIcon class="w-4 h-4" /> +25.02%
                  </span>
                </div>
                <p class="chart-sub">(12.4K total pengungsi terdaftar)</p>
              </div>
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-dot" style="background:#ea580c"></span>
                  <span>Pengungsi Masuk</span>
                </div>
                <div class="legend-item">
                  <span class="legend-dot" style="background:#2563eb"></span>
                  <span>Bantuan Tersalur</span>
                </div>
              </div>
            </div>
            <div class="chart-body">
              <Line :data="lineData" :options="lineOpts" />
            </div>
          </div>

          <!-- Right Metrics -->
          <div class="metrics-side">
            <div v-for="m in sideMetrics" :key="m.label" class="metric-card">
              <div class="metric-icon-wrap">
                <component :is="m.icon" class="w-5 h-5 text-orange-600" />
              </div>
              <div class="metric-content">
                <p class="metric-label">{{ m.label }}</p>
                <p class="metric-value">{{ m.value }}</p>
                <div class="metric-change" :class="m.up ? 'positive' : 'negative'">
                  <ArrowUpIcon v-if="m.up" class="w-3 h-3" />
                  <ArrowDownIcon v-else class="w-3 h-3" />
                  {{ m.change }} <span class="metric-sub">{{ m.sub }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ══ Second Grid: Doughnut + Activity ══ -->
        <div class="dashboard-grid-2">
          <!-- Doughnut -->
          <div class="donut-card">
            <div class="donut-header">
              <h3 class="chart-title">Distribusi Kebutuhan</h3>
              <button class="header-action-btn">
                <EllipsisHorizontalIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="donut-body">
              <div class="donut-wrap">
                <Doughnut :data="donutData" :options="donutOpts" />
                <div class="donut-center">
                  <p class="donut-center-value">8.4K</p>
                  <p class="donut-center-label">Total Paket</p>
                </div>
              </div>
              <div class="donut-legend">
                <div v-for="(label, i) in donutData.labels" :key="i" class="donut-legend-item">
                  <span class="donut-legend-dot" :style="{ background: donutData.datasets[0].backgroundColor[i] }"></span>
                  <span class="donut-legend-text">{{ label }}</span>
                  <span class="donut-legend-val">{{ donutData.datasets[0].data[i] }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="activity-card">
            <div class="activity-header">
              <h3 class="chart-title">Aktivitas Terkini</h3>
              <span class="live-badge">
                <span class="live-dot"></span>
                LIVE
              </span>
            </div>
            <div class="activity-list">
              <div v-for="(a, i) in activities" :key="i" class="activity-item">
                <div class="activity-time">{{ a.time }}</div>
                <div class="activity-dot-col">
                  <div :class="['activity-dot', `dot-${a.type}`]"></div>
                  <div v-if="i < activities.length - 1" class="activity-line"></div>
                </div>
                <div class="activity-text">
                  <p :class="['activity-msg', `msg-${a.type}`]">{{ a.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ══ Data Table ══ -->
        <div class="table-card">
          <div class="table-header">
            <div class="table-title-area">
              <h3 class="chart-title">Data Posko Pengungsian</h3>
              <p class="table-count">{{ filteredPosko.length }} posko terdaftar</p>
            </div>
            <div class="table-actions">
              <div class="table-search">
                <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" />
                <input v-model="searchQuery" type="text" placeholder="Cari posko..." class="table-search-input" />
              </div>
              <button class="filter-btn">
                <FunnelIcon class="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nama Posko</th>
                  <th>Lokasi</th>
                  <th>Koordinator</th>
                  <th>Kapasitas</th>
                  <th>Pengungsi</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in filteredPosko" :key="p.id" class="table-row">
                  <td>
                    <div class="posko-name-cell">
                      <div class="posko-avatar">
                        <MapPinIcon class="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p class="posko-name">{{ p.nama }}</p>
                        <p class="posko-id">PSK-2026-{{ String(p.id).padStart(3, '0') }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="cell-text">{{ p.lokasi }}</td>
                  <td class="cell-text">{{ p.koordinator }}</td>
                  <td class="cell-text">{{ p.kapasitas }}</td>
                  <td>
                    <div class="capacity-cell">
                      <span class="capacity-num">{{ p.pengungsi }}</span>
                      <div class="capacity-bar">
                        <div
                          class="capacity-fill"
                          :class="{
                            'fill-danger': (p.pengungsi / p.kapasitas) > 0.9,
                            'fill-warning': (p.pengungsi / p.kapasitas) > 0.7 && (p.pengungsi / p.kapasitas) <= 0.9,
                            'fill-ok': (p.pengungsi / p.kapasitas) <= 0.7,
                          }"
                          :style="{ width: Math.min((p.pengungsi / p.kapasitas) * 100, 100) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span :class="['status-badge',
                      p.status === 'Kritis' ? 'badge-danger' :
                      p.status === 'Siaga' ? 'badge-warning' : 'badge-ok'
                    ]">
                      <span class="badge-dot"></span>
                      {{ p.status }}
                    </span>
                  </td>
                  <td class="cell-muted">{{ p.lastUpdate }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="table-footer">
            <p class="table-info">Menampilkan <strong>1</strong> sampai <strong>{{ filteredPosko.length }}</strong> dari <strong>{{ poskoData.length }}</strong> posko</p>
            <div class="table-pagination">
              <button class="page-btn" disabled>&laquo;</button>
              <button class="page-btn active">1</button>
              <button class="page-btn">&raquo;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

/* ═══════ LAYOUT ═══════ */
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f8f9fb;
}

/* ═══════ SIDEBAR ═══════ */
.sidebar {
  width: 260px;
  background: #fff;
  border-right: 1px solid #f0f0f3;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.sidebar.collapsed {
  width: 72px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 16px;
  border-bottom: 1px solid #f5f5f7;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ea580c, #dc2626);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
  flex-shrink: 0;
}
.logo-text {
  font-size: 18px; font-weight: 900; color: #111827;
  letter-spacing: -0.5px;
}
.sidebar-toggle {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: none;
  background: #f5f5f7;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
}
.sidebar-toggle:hover { background: #eee; color: #111; }

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  margin: 8px 12px;
  border-radius: 14px;
  background: #fafafa;
  border: 1px solid #f0f0f3;
  cursor: pointer;
  transition: all 0.2s;
}
.sidebar-user:hover { background: #f5f5f5; }
.user-avatar {
  position: relative; flex-shrink: 0;
}
.user-avatar img {
  width: 38px; height: 38px;
  border-radius: 10px;
  object-fit: cover;
}
.user-status-dot {
  position: absolute; bottom: -1px; right: -1px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #fff;
}
.user-info { flex: 1; min-width: 0; }
.user-name { font-size: 13px; font-weight: 700; color: #111827; }
.user-role { font-size: 11px; font-weight: 500; color: #9ca3af; }

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 8px 12px;
  overflow-y: auto;
}
.nav-label {
  font-size: 10px;
  font-weight: 800;
  color: #c0c0c8;
  letter-spacing: 0.12em;
  padding: 12px 12px 6px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 2px;
  position: relative;
}
.nav-item:hover { background: #f5f5f7; color: #111827; }
.nav-item.active {
  background: linear-gradient(135deg, #fff7ed, #fef2f2);
  color: #ea580c;
  font-weight: 700;
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 50%; transform: translateY(-50%);
  width: 3px; height: 20px;
  border-radius: 0 4px 4px 0;
  background: linear-gradient(to bottom, #ea580c, #dc2626);
}
.nav-icon {
  width: 20px; height: 20px;
  flex-shrink: 0;
}
.nav-text { white-space: nowrap; }
.nav-badge {
  margin-left: auto;
  font-size: 10px; font-weight: 800;
  background: linear-gradient(135deg, #ea580c, #dc2626);
  color: #fff;
  padding: 2px 7px;
  border-radius: 6px;
}

.sidebar-bottom {
  padding: 12px;
  border-top: 1px solid #f5f5f7;
}

/* ═══════ MAIN CONTENT ═══════ */
.main-content {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
}
.sidebar.collapsed ~ .main-content {
  margin-left: 72px;
}

/* Top Header */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  background: #fff;
  border-bottom: 1px solid #f0f0f3;
  position: sticky;
  top: 0;
  z-index: 50;
}
.page-title {
  font-size: 22px;
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.5px;
}
.page-subtitle {
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  margin-top: 2px;
}
.live-time {
  color: #ea580c;
  font-weight: 700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-search {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 12px; top: 50%; transform: translateY(-50%);
  width: 16px; height: 16px;
  color: #9ca3af;
}
.search-input {
  width: 240px;
  padding: 9px 14px 9px 36px;
  border: 1px solid #f0f0f3;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  background: #fafafa;
  transition: all 0.2s;
  outline: none;
}
.search-input:focus {
  border-color: #ea580c;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
}
.search-input::placeholder { color: #c0c0c8; }

.notif-btn {
  position: relative;
  width: 40px; height: 40px;
  border-radius: 10px;
  border: 1px solid #f0f0f3;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.notif-btn:hover { background: #f5f5f5; color: #111; }
.notif-badge {
  position: absolute; top: -4px; right: -4px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ea580c, #dc2626);
  color: #fff;
  font-size: 10px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
}

.view-site-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 18px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  font-size: 13px; font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}
.view-site-btn:hover {
  background: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

/* ═══════ CONTENT AREA ═══════ */
.content-area {
  padding: 24px 32px 48px;
}

/* Banner */
.promo-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%);
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(22, 101, 52, 0.2);
}
.banner-content {
  display: flex; align-items: center; gap: 14px;
}
.banner-icon-wrap {
  width: 42px; height: 42px;
  border-radius: 12px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.banner-title {
  font-size: 14px; font-weight: 700; color: #fff;
}
.banner-sub {
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.75);
  margin-top: 2px;
}
.banner-btn {
  flex-shrink: 0;
  padding: 10px 22px;
  border-radius: 10px;
  background: #fff;
  color: #166534;
  font-size: 13px; font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.banner-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

/* ═══════ STAT CARDS ═══════ */
.stat-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f3;
  padding: 18px 20px;
  transition: all 0.3s;
}
.stat-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
.stat-card-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px;
}
.stat-card-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.stat-card-title {
  font-size: 14px; font-weight: 800; color: #111827;
}
.stat-card-body {
  display: flex;
  gap: 0;
}
.stat-item {
  flex: 1;
  text-align: center;
}
.stat-item-border {
  border-left: 1px solid #f0f0f3;
}
.stat-value {
  font-size: 20px; font-weight: 900; color: #111827;
  line-height: 1;
}
.stat-label {
  font-size: 11px; font-weight: 600; color: #9ca3af;
  margin-top: 4px;
}

/* ═══════ DASHBOARD GRID ═══════ */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

/* Chart Card */
.chart-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f3;
  overflow: hidden;
}
.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 0;
}
.chart-title {
  font-size: 15px; font-weight: 800; color: #111827;
}
.chart-summary {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 6px;
}
.chart-big-number {
  font-size: 32px; font-weight: 900; color: #111827;
  line-height: 1;
}
.chart-change {
  display: flex; align-items: center; gap: 3px;
  font-size: 13px; font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
}
.chart-change.positive {
  color: #16a34a;
  background: #f0fdf4;
}
.chart-change.negative {
  color: #dc2626;
  background: #fef2f2;
}
.chart-sub {
  font-size: 12px; font-weight: 500; color: #9ca3af;
  margin-top: 4px;
}
.chart-legend {
  display: flex; flex-direction: column; gap: 6px;
  padding-top: 8px;
}
.legend-item {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; color: #6b7280;
}
.legend-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
}
.chart-body {
  padding: 12px 20px 16px;
  height: 240px;
}

/* Metrics Side */
.metrics-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.metric-card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #f0f0f3;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.3s;
}
.metric-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.05);
  transform: translateY(-2px);
}
.metric-icon-wrap {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: #fff7ed;
  display: flex; align-items: center; justify-content: center;
}
.metric-label {
  font-size: 11px; font-weight: 600; color: #9ca3af;
}
.metric-value {
  font-size: 22px; font-weight: 900; color: #111827;
  line-height: 1;
  margin-top: 2px;
}
.metric-change {
  display: flex; align-items: center; gap: 3px;
  font-size: 11px; font-weight: 700;
  margin-top: 4px;
}
.metric-change.positive { color: #16a34a; }
.metric-change.negative { color: #dc2626; }
.metric-sub { color: #9ca3af; font-weight: 500; margin-left: 3px; }

/* ═══════ SECOND GRID ═══════ */
.dashboard-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

/* Doughnut Card */
.donut-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f3;
  overflow: hidden;
}
.donut-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
}
.header-action-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: 1px solid #f0f0f3;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
}
.header-action-btn:hover { background: #f5f5f5; color: #111; }
.donut-body {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 24px 24px;
}
.donut-wrap {
  position: relative;
  width: 180px; height: 180px;
  flex-shrink: 0;
}
.donut-center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.donut-center-value {
  font-size: 24px; font-weight: 900; color: #111827;
  line-height: 1;
}
.donut-center-label {
  font-size: 11px; font-weight: 600; color: #9ca3af;
  margin-top: 3px;
}
.donut-legend {
  flex: 1;
  display: flex; flex-direction: column; gap: 10px;
}
.donut-legend-item {
  display: flex; align-items: center; gap: 8px;
}
.donut-legend-dot {
  width: 10px; height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}
.donut-legend-text {
  flex: 1;
  font-size: 13px; font-weight: 600; color: #374151;
}
.donut-legend-val {
  font-size: 13px; font-weight: 800; color: #111827;
}

/* Activity Card */
.activity-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f3;
  overflow: hidden;
}
.activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
}
.live-badge {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 800;
  color: #16a34a;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 4px 10px;
  border-radius: 8px;
  letter-spacing: 0.1em;
}
.live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #16a34a;
  animation: pulse-dot 1.5s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.activity-list {
  padding: 20px 24px 24px;
}
.activity-item {
  display: flex;
  gap: 12px;
}
.activity-time {
  font-size: 12px; font-weight: 700; color: #9ca3af;
  width: 40px; flex-shrink: 0;
  padding-top: 2px;
}
.activity-dot-col {
  display: flex; flex-direction: column; align-items: center;
  flex-shrink: 0;
}
.activity-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid;
}
.dot-danger { border-color: #dc2626; background: #fecaca; }
.dot-success { border-color: #16a34a; background: #bbf7d0; }
.dot-warning { border-color: #f59e0b; background: #fde68a; }
.dot-info { border-color: #3b82f6; background: #bfdbfe; }

.activity-line {
  width: 2px;
  flex: 1;
  background: #f0f0f3;
  min-height: 32px;
}
.activity-text {
  flex: 1;
  padding-bottom: 20px;
}
.activity-msg {
  font-size: 13px; font-weight: 600; color: #374151;
  line-height: 1.5;
}

/* ═══════ TABLE CARD ═══════ */
.table-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f3;
  overflow: hidden;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f5f5f7;
}
.table-count {
  font-size: 12px; font-weight: 500; color: #9ca3af;
  margin-top: 2px;
}
.table-actions {
  display: flex; align-items: center; gap: 10px;
}
.table-search {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  background: #fafafa;
  border: 1px solid #f0f0f3;
  border-radius: 10px;
  transition: all 0.2s;
}
.table-search:focus-within {
  border-color: #ea580c;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
}
.table-search-input {
  border: none;
  background: transparent;
  font-size: 13px; font-weight: 500;
  color: #374151;
  outline: none;
  width: 160px;
}
.table-search-input::placeholder { color: #c0c0c8; }
.filter-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #f0f0f3;
  background: #fff;
  font-size: 13px; font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { background: #f5f5f5; color: #111; }

.table-wrap {
  overflow-x: auto;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table thead tr {
  background: #fafafa;
}
.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
}
.data-table td {
  padding: 14px 16px;
  border-top: 1px solid #f5f5f7;
  white-space: nowrap;
}
.table-row {
  transition: background 0.2s;
}
.table-row:hover { background: #fefbf7; }

.posko-name-cell {
  display: flex; align-items: center; gap: 10px;
}
.posko-avatar {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.posko-name {
  font-size: 13px; font-weight: 700; color: #111827;
}
.posko-id {
  font-size: 11px; font-weight: 500; color: #9ca3af;
}
.cell-text {
  font-size: 13px; font-weight: 500; color: #6b7280;
}
.cell-muted {
  font-size: 12px; font-weight: 500; color: #c0c0c8;
}

.capacity-cell {
  display: flex; flex-direction: column; gap: 4px;
}
.capacity-num {
  font-size: 13px; font-weight: 700; color: #111827;
}
.capacity-bar {
  width: 60px; height: 4px;
  background: #f0f0f3;
  border-radius: 4px;
  overflow: hidden;
}
.capacity-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}
.fill-danger { background: #dc2626; }
.fill-warning { background: #f59e0b; }
.fill-ok { background: #22c55e; }

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge-danger {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.badge-warning {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}
.badge-ok {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.badge-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-top: 1px solid #f5f5f7;
  background: #fafafa;
}
.table-info {
  font-size: 13px; font-weight: 500; color: #9ca3af;
}
.table-info strong { color: #374151; }
.table-pagination {
  display: flex; gap: 4px;
}
.page-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: 1px solid #f0f0f3;
  background: #fff;
  font-size: 13px; font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.page-btn:hover:not(:disabled) { background: #f5f5f5; color: #111; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-btn.active {
  background: linear-gradient(135deg, #ea580c, #dc2626);
  color: #fff;
  border-color: transparent;
}

/* ═══════ TRANSITIONS ═══════ */
.fade-text-enter-active, .fade-text-leave-active {
  transition: opacity 0.2s ease;
}
.fade-text-enter-from, .fade-text-leave-to {
  opacity: 0;
}

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 1280px) {
  .stat-cards-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 1024px) {
  .sidebar { display: none; }
  .main-content { margin-left: 0 !important; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .dashboard-grid-2 { grid-template-columns: 1fr; }
  .header-search { display: none; }
}
@media (max-width: 768px) {
  .stat-cards-grid { grid-template-columns: 1fr; }
  .content-area { padding: 16px; }
  .top-header { padding: 14px 16px; }
  .promo-banner { flex-direction: column; gap: 14px; text-align: center; }
  .banner-content { flex-direction: column; }
}
</style>
