<script setup>
import { ref, computed } from 'vue'
import { MapPinIcon, PlusIcon, ExclamationTriangleIcon, UserGroupIcon, HomeModernIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import DashboardLayout from '../components/DashboardLayout.vue'
import { downloadCSV } from '../composables/dashboardState'
import { poskoService } from '../services/poskoService'

// Fix for default Leaflet icon in Vue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Map Settings
const zoom = ref(12)
const center = ref([-6.8953, 110.6386]) // Demak center roughly
const mapOptions = { zoomControl: false }

// Data Posko with Coordinates
const poskoData = ref([])

import { onMounted } from 'vue'

onMounted(async () => {
  try {
    poskoData.value = await poskoService.getAll()
  } catch (err) {
    console.error('Failed to load posko data:', err)
  }
})

// Analytics Chart Data
const trendData = {
  labels: ['H-6', 'H-5', 'H-4', 'H-3', 'H-2', 'H-1', 'Hari Ini'],
  datasets: [{
    label: 'Kepadatan Pengungsi (%)',
    data: [45, 52, 68, 75, 82, 88, 92],
    borderColor: '#dc2626',
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    fill: true,
    tension: 0.4
  }]
}
const chartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, max: 100 } }
}

// Images of Posko
import img1 from '../assets/tenda_pengungsian.png'
import img2 from '../assets/fasilitas_medis.png'
import img3 from '../assets/dapur_umum.png'
import img4 from '../assets/suasana_dalam_tenda.png'

const poskoImages = [img1, img2, img3, img4]

const exportLaporan = () => {
  const rows = [['Nama Posko', 'Latitude', 'Longitude', 'Kapasitas', 'Terisi', 'Status', 'Tren']]
  poskoData.value.forEach(p => rows.push([p.nama, p.lat, p.lng, p.kapasitas, p.terisi, p.status, p.tren]))
  downloadCSV('laporan-pengungsian-demak.csv', rows)
}
</script>

<template>
  <DashboardLayout>
    <div class="font-sans pb-24">
    <!-- Header -->
    <div class="bg-white pt-8 pb-10 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span class="text-red-600 text-[11px] font-bold uppercase tracking-widest mb-2 block">Analisis Tata Letak & Kapasitas</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Geospasial Posko Pengungsian</h1>
          </div>
          <button class="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg" @click="exportLaporan" type="button">Unduh Laporan Analitik</button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <!-- Top Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><HomeModernIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Total Posko</p>
            <p class="text-2xl font-black text-gray-900">45 <span class="text-sm text-red-500 font-bold">+2 hari ini</span></p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600"><UserGroupIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Kapasitas Terpakai</p>
            <p class="text-2xl font-black text-gray-900">85% <span class="text-sm text-red-500 font-bold">Kritis</span></p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><ExclamationTriangleIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Risiko Penumpukan</p>
            <p class="text-2xl font-black text-gray-900">Tinggi</p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><ArrowTrendingUpIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Sirkulasi Keluar</p>
            <p class="text-2xl font-black text-gray-900">12% / hari</p>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Interactive Map (Left Col, Span 2) -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 class="text-lg font-black text-gray-900 mb-4">Peta Sebaran Interaktif</h2>
            <div class="w-full h-[450px] rounded-2xl overflow-hidden border border-gray-200 z-0 relative">
              <l-map ref="map" v-model:zoom="zoom" :center="center" :options="mapOptions">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker v-for="p in poskoData" :key="p.id" :lat-lng="[p.lat, p.lng]">
                  <l-popup>
                    <div class="font-sans">
                      <p class="font-bold text-sm mb-1">{{ p.nama }}</p>
                      <p class="text-xs text-gray-600">Terisi: <b>{{ p.terisi }}</b> / {{ p.kapasitas }}</p>
                      <p class="text-xs mt-1"><span class="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">{{ p.status }}</span></p>
                    </div>
                  </l-popup>
                </l-marker>
              </l-map>
            </div>
            <div class="mt-4 flex gap-4 text-xs font-medium text-gray-500">
              <span class="flex items-center gap-1"><div class="w-3 h-3 bg-red-500 rounded-full"></div> Kritis (>90%)</span>
              <span class="flex items-center gap-1"><div class="w-3 h-3 bg-orange-500 rounded-full"></div> Waspada (70-90%)</span>
              <span class="flex items-center gap-1"><div class="w-3 h-3 bg-green-500 rounded-full"></div> Aman (<70%)</span>
            </div>
          </div>

          <!-- Documentation Photos -->
          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 class="text-lg font-black text-gray-900 mb-4">Dokumentasi Tenda & Fasilitas</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="(img, i) in poskoImages" :key="i" class="aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                <img :src="img" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Sidebar (Right Col) -->
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 class="text-lg font-black text-gray-900 mb-4">Analisis Kritis Kapasitas</h2>
            <p class="text-sm text-gray-600 mb-6">Tren penumpukan di 4 posko utama menunjukkan lonjakan ekstrem. Posko Karanganyar butuh relokasi segera.</p>
            <div class="h-[200px] w-full">
              <Line :data="trendData" :options="chartOpts" />
            </div>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 class="text-lg font-black text-gray-900 mb-4">Daftar Posko Kritis</h2>
            <div class="space-y-4">
              <div v-for="p in poskoData" :key="p.id" class="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-start mb-2">
                  <p class="font-bold text-sm text-gray-900">{{ p.nama }}</p>
                  <span :class="p.status === 'Kritis' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'" class="text-[10px] px-2 py-0.5 rounded font-bold uppercase">{{ p.status }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div class="bg-red-600 h-2 rounded-full" :style="{width: (p.terisi/p.kapasitas*100)+'%'}"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 font-medium">
                  <span>{{ p.terisi }} jiwa</span>
                  <span>{{ p.tren }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }
</style>
