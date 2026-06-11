<script setup>
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ShieldCheckIcon, DocumentCheckIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '../components/DashboardLayout.vue'
import { downloadCSV } from '../composables/dashboardState'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Analytics Data
const trendData = {
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [{
    label: 'Aliran Dana Masuk (Juta Rp)',
    data: [120, 150, 110, 240, 310, 280, 420],
    borderColor: '#16a34a',
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    fill: true,
    tension: 0.4
  }]
}
const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } }
}

const allocations = [
  { kategori: 'Logistik Pangan', persentase: 45, nominal: 'Rp 110.25 M' },
  { kategori: 'Obat & Medis', persentase: 25, nominal: 'Rp 61.25 M' },
  { kategori: 'Infrastruktur Darurat', persentase: 20, nominal: 'Rp 49.00 M' },
  { kategori: 'Operasional Relawan', persentase: 10, nominal: 'Rp 24.50 M' }
]

const recentDonations = [
  { id: 'TRX-9982', nama: 'Hamba Allah', nominal: 'Rp 5.000.000', waktu: '10 menit lalu', verifikasi: true },
  { id: 'TRX-9981', nama: 'PT Makmur Jaya', nominal: 'Rp 150.000.000', waktu: '1 jam lalu', verifikasi: true },
  { id: 'TRX-9980', nama: 'Komunitas Peduli Demak', nominal: 'Rp 12.500.000', waktu: '3 jam lalu', verifikasi: true },
]

const exportLedger = () => {
  const rows = [['ID Transaksi', 'Donatur', 'Nominal', 'Waktu', 'Terverifikasi']]
  recentDonations.forEach(d => rows.push([d.id, d.nama, d.nominal, d.waktu, d.verifikasi ? 'Ya' : 'Tidak']))
  downloadCSV('audit-donasi-jagaya.csv', rows)
}
</script>


<template>
  <DashboardLayout>
    <div class="font-sans pb-24">
    <div class="bg-white pt-8 pb-10 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span class="text-green-600 text-[11px] font-bold uppercase tracking-widest mb-2 block">Analisis Finansial Terbuka</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Transparansi Dana Bantuan</h1>
          </div>
          <button class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg flex items-center gap-2" @click="exportLedger" type="button">
            <DocumentCheckIcon class="w-5 h-5" /> Download Audit Report
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      
      <!-- Top Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl text-white">
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Terkumpul</p>
          <p class="text-3xl font-black mb-2">Rp 245.000.000.000</p>
          <div class="w-full bg-gray-700 rounded-full h-1.5 mb-2">
            <div class="bg-green-500 h-1.5 rounded-full" style="width: 49%"></div>
          </div>
          <p class="text-xs text-gray-400">Target: Rp 500 Miliar (49% Tercapai)</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dana Tersalurkan</p>
            <p class="text-3xl font-black text-gray-900 mb-1">89%</p>
            <p class="text-xs text-green-600 font-bold flex items-center gap-1"><ArrowTrendingUpIcon class="w-3 h-3"/> Sangat Efisien</p>
          </div>
          <div class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100"><CurrencyDollarIcon class="w-8 h-8"/></div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status Audit</p>
            <p class="text-2xl font-black text-gray-900 mb-1">Wajar Tanpa Pengecualian</p>
            <p class="text-xs text-gray-500 font-medium">Oleh KAP Independen</p>
          </div>
          <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"><ShieldCheckIcon class="w-8 h-8"/></div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Chart -->
        <div class="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h2 class="text-lg font-black text-gray-900 mb-2">Tren Aliran Dana Masuk (7 Hari Terakhir)</h2>
          <p class="text-sm text-gray-500 mb-6">Analisis: Terjadi lonjakan donasi pada hari Minggu akibat kampanye nasional.</p>
          <div class="h-[300px] w-full flex-1">
            <Line :data="trendData" :options="chartOpts" />
          </div>
        </div>

        <!-- Allocation Breakdown -->
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 class="text-lg font-black text-gray-900 mb-4">Rencana Alokasi Kritis</h2>
          <div class="space-y-6">
            <div v-for="a in allocations" :key="a.kategori">
              <div class="flex justify-between text-sm font-bold text-gray-900 mb-1">
                <span>{{ a.kategori }}</span>
                <span>{{ a.persentase }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2 mb-1">
                <div class="bg-orange-500 h-2 rounded-full" :style="{width: a.persentase+'%'}"></div>
              </div>
              <p class="text-xs text-gray-500 font-medium text-right">{{ a.nominal }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Real-time Ledger -->
      <div class="bg-white mt-8 p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h2 class="text-lg font-black text-gray-900 mb-4">Buku Besar Interaktif (Live Ledger)</h2>
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-y border-gray-100">
            <tr>
              <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase">ID Transaksi</th>
              <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Donatur</th>
              <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Nominal Masuk</th>
              <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Waktu</th>
              <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Verifikasi Bank</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="d in recentDonations" :key="d.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-4 text-xs font-mono text-gray-500">{{ d.id }}</td>
              <td class="px-4 py-4 text-sm font-bold text-gray-900">{{ d.nama }}</td>
              <td class="px-4 py-4 text-sm font-black text-green-600 text-right">+ {{ d.nominal }}</td>
              <td class="px-4 py-4 text-xs text-gray-500">{{ d.waktu }}</td>
              <td class="px-4 py-4 text-center">
                <ShieldCheckIcon class="w-5 h-5 text-blue-500 mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }
</style>
