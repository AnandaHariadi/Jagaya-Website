<script setup>
import { ref } from 'vue'
import { PlusIcon, MagnifyingGlassIcon, UserGroupIcon, BriefcaseIcon, MapPinIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const relawans = ref([
  { id: 1, nama: 'Budi Santoso', spesialisasi: 'Medis Darurat', lokasi: 'Posko Karanganyar', status: 'Aktif' },
  { id: 2, nama: 'Siti Aminah', spesialisasi: 'Dapur Umum', lokasi: 'Posko Sayung', status: 'Aktif' },
  { id: 3, nama: 'Ahmad Fauzi', spesialisasi: 'Evakuasi (SAR)', lokasi: 'Posko Demak Kota', status: 'Standby' },
  { id: 4, nama: 'Rina Melati', spesialisasi: 'Trauma Healing', lokasi: 'Posko Bonang', status: 'Aktif' },
])

// Analytics Data
const donutData = {
  labels: ['Medis Darurat', 'Dapur Umum', 'Evakuasi (SAR)', 'Trauma Healing', 'Logistik'],
  datasets: [{
    data: [25, 35, 15, 10, 15],
    backgroundColor: ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6'],
    borderWidth: 0
  }]
}
const donutOpts = { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right' } } }

const barData = {
  labels: ['Karanganyar', 'Sayung', 'Demak Kota', 'Bonang', 'Mijen'],
  datasets: [{
    label: 'Rasio Pengungsi per Relawan',
    data: [150, 120, 80, 140, 95], // e.g. 1 volunteer per 150 refugees (red flag)
    backgroundColor: (ctx) => {
      const val = ctx.raw
      return val > 120 ? '#ef4444' : val > 90 ? '#f97316' : '#22c55e'
    },
    borderRadius: 6
  }]
}
const barOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { title: { display: true, text: 'Pengungsi / 1 Relawan' } } }
}

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>


<template>
  <div class="bg-gray-50 min-h-screen font-sans pb-24">
    <!-- Header -->
    <div class="bg-white pt-24 pb-16 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between">
          <div>
            <span class="text-orange-600 text-[11px] font-bold uppercase tracking-widest mb-2 block">Analisis Tenaga Bantuan</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Kinerja & Distribusi Relawan</h1>
          </div>
          <div class="flex items-center gap-3">
            <button class="bg-white border border-orange-100 text-red-600 px-4 py-2.5 rounded-xl font-bold hover:bg-orange-50 transition-colors flex items-center gap-2" @click="handleLogout" type="button">
              <ArrowLeftOnRectangleIcon class="w-5 h-5" /> Logout
            </button>
            <button class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-colors shadow-lg shadow-orange-500/30 flex items-center gap-2">
              <PlusIcon class="w-5 h-5" /> Registrasi Relawan
            </button>
          </div>
        </div>

      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      
      <!-- Critical Analytics Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h2 class="text-lg font-black text-gray-900 mb-2">Sebaran Spesialisasi Relawan</h2>
          <p class="text-sm text-gray-500 mb-4">Analisis defisit: Kekurangan fatal pada tenaga Medis Darurat (hanya 25%).</p>
          <div class="h-[250px] flex-1">
            <Doughnut :data="donutData" :options="donutOpts" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-lg font-black text-gray-900">Beban Kerja: Rasio Pengungsi vs Relawan</h2>
            <span class="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Kritis di Karanganyar</span>
          </div>
          <p class="text-sm text-gray-500 mb-4">Standar ideal: 1 relawan per 50 pengungsi. Data saat ini sangat tidak berimbang.</p>
          <div class="h-[250px] flex-1">
            <Bar :data="barData" :options="barOpts" />
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 class="text-lg font-black text-gray-900">Database Personel Aktif</h2>
          <div class="relative w-64">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" placeholder="Cari relawan..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
          </div>
        </div>
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Nama Personel</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Spesialisasi</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Lokasi Tugas</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="r in relawans" :key="r.id" class="hover:bg-orange-50/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{{ r.nama.charAt(0) }}</div>
                  <div>
                    <p class="font-bold text-gray-900 text-sm">{{ r.nama }}</p>
                    <p class="text-xs text-gray-500">ID: RLW-{{ r.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-600 flex items-center gap-2"><BriefcaseIcon class="w-4 h-4 text-gray-400"/>{{ r.spesialisasi }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-600"><div class="flex items-center gap-2"><MapPinIcon class="w-4 h-4 text-orange-500"/>{{ r.lokasi }}</div></td>
              <td class="px-6 py-4">
                <span :class="r.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'" class="px-2.5 py-1 rounded-md text-xs font-bold uppercase">{{ r.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }
</style>
