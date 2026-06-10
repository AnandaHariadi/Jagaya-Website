<script setup>
import { DocumentChartBarIcon, ArrowDownTrayIcon, PrinterIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Analytics Data
const annualData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
  datasets: [{
    label: 'Intensitas Bencana Banjir (Level Debit Air)',
    data: [80, 95, 70, 40, 20, 10, 5, 5, 15, 45, 75, 90],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true,
    tension: 0.4
  }]
}
const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, max: 100 } }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen font-sans pb-24">
    <div class="bg-white pt-10 pb-16 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between">
          <div>
            <span class="text-blue-600 text-[11px] font-bold uppercase tracking-widest mb-2 block">Rekapitulasi Sistem</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Laporan & Evaluasi Kinerja</h1>
          </div>
          <div class="flex gap-3">
            <button class="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
              <PrinterIcon class="w-5 h-5" /> Cetak
            </button>
            <button class="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2">
              <ArrowDownTrayIcon class="w-5 h-5" /> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      
      <!-- Executive Summary -->
      <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <h2 class="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><DocumentChartBarIcon class="w-6 h-6 text-blue-500" /> Executive Summary: Q1 2026</h2>
        <div class="prose prose-sm text-gray-600 max-w-none">
          <p>
            Laporan ini menyajikan evaluasi performa manajemen krisis banjir di Kabupaten Demak selama kuartal pertama tahun 2026. 
            <strong>Poin Kritis:</strong> Terjadi anomali curah hujan pada minggu kedua Februari yang menyebabkan 12 titik tanggul kritis (Status: Merah). 
            Respon sistem JAGAYA berhasil memobilisasi 1,200 relawan dalam waktu <span class="bg-green-100 text-green-800 px-1 font-bold">kurang dari 4 jam</span> (meningkat 35% dibanding tahun lalu).
          </p>
          <p>
            <strong>Rekomendasi Strategis:</strong> Penambahan buffer stock logistik di area Bonang dan Sayung sebesar 40% mengingat siklus rob laut yang diprediksi memburuk pada bulan Mei mendatang.
          </p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Seasonal Trend Chart -->
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h2 class="text-lg font-black text-gray-900 mb-2">Tren Musiman Bencana (Historis 5 Tahun)</h2>
          <p class="text-sm text-gray-500 mb-6">Analisis menunjukkan puncak debit air tertinggi selalu terjadi pada siklus Jan-Feb dan Nov-Des.</p>
          <div class="h-[300px] w-full flex-1">
            <Line :data="annualData" :options="chartOpts" />
          </div>
        </div>

        <!-- KPI Table -->
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 class="text-lg font-black text-gray-900 mb-4">Indikator Kinerja Utama (KPI)</h2>
          <div class="space-y-4">
            <div class="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-gray-900 text-sm">Waktu Respon Darurat (SLA)</span>
                <span class="text-green-600 font-bold text-sm">Target Tercapai</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Rata-rata waktu dari laporan hingga evakuasi.</p>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 95%"></div>
              </div>
            </div>
            <div class="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-gray-900 text-sm">Akurasi Distribusi Bantuan</span>
                <span class="text-orange-600 font-bold text-sm">Perlu Perhatian</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Persentase bantuan yang tepat sasaran tanpa duplikasi.</p>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full" style="width: 78%"></div>
              </div>
            </div>
            <div class="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-gray-900 text-sm">Uptime Sistem Pemantauan IoT</span>
                <span class="text-green-600 font-bold text-sm">Sangat Baik</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Keandalan sensor ketinggian air di 24 titik.</p>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 99.9%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }
</style>
