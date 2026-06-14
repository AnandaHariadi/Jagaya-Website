<script setup>
import { ref } from 'vue'
import { TruckIcon, ArchiveBoxIcon, ExclamationCircleIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'vue-chartjs'
import DashboardLayout from '../components/DashboardLayout.vue'
import { logistikService } from '../services/logistikService'
import { onMounted } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Analytics Data
const inventoryData = ref({
  labels: [],
  datasets: []
})
const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } }
}

const deliveries = ref([])

onMounted(async () => {
  try {
    const inv = await logistikService.getInventaris()
    inventoryData.value = {
      labels: inv.map(i => i.nama_barang),
      datasets: [
        {
          label: 'Stok Saat Ini',
          data: inv.map(i => i.stok_saat_ini),
          backgroundColor: '#f97316',
          borderRadius: 4
        },
        {
          label: 'Batas Kritis',
          data: inv.map(i => i.batas_kritis),
          backgroundColor: '#ef4444',
          borderRadius: 4
        }
      ]
    }
    
    deliveries.value = await logistikService.getDistribusi()
  } catch (err) {
    console.error('Failed to load logistik data:', err)
  }
})

/* ── Input Barang Masuk modal ── */
const showModal = ref(false)
const form = ref({ tujuan: '', barang: '', status: 'Loading' })
const openModal = () => { form.value = { tujuan: '', barang: '', status: 'Loading' }; showModal.value = true }
const addDelivery = async () => {
  if (!form.value.tujuan.trim() || !form.value.barang.trim()) return
  
  try {
    const newDeliv = await logistikService.createDistribusi({
      tujuan: form.value.tujuan.trim(),
      barang: form.value.barang.trim(),
      status: form.value.status
    })
    deliveries.value.unshift(newDeliv)
    showModal.value = false
  } catch (err) {
    alert('Gagal mencatat distribusi: ' + (err.response?.data?.error || err.message))
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="font-sans pb-24">
    <div class="bg-white pt-8 pb-10 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span class="text-orange-600 text-[11px] font-bold uppercase tracking-widest mb-2 block">Manajemen Rantai Pasok</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Gudang & Logistik</h1>
          </div>
          <button class="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2" @click="openModal" type="button">
            <ArchiveBoxIcon class="w-5 h-5" /> Input Barang Masuk
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-green-500">
          <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><ArchiveBoxIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Total Tonase</p>
            <p class="text-2xl font-black text-gray-900">45.2 <span class="text-sm font-bold">Ton</span></p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><TruckIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Armada Aktif</p>
            <p class="text-2xl font-black text-gray-900">12 <span class="text-sm font-bold">Truk</span></p>
          </div>
        </div>
        <div class="bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
          <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600"><ExclamationCircleIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-red-400 uppercase">Peringatan Stok</p>
            <p class="text-lg font-black text-red-900 leading-tight">Susu Bayi Menipis</p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-orange-500">
          <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600"><ArrowPathIcon class="w-6 h-6"/></div>
          <div>
            <p class="text-[11px] font-bold text-gray-400 uppercase">Turnover Rate</p>
            <p class="text-2xl font-black text-gray-900">8.5 <span class="text-sm font-bold">Hari</span></p>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h2 class="text-lg font-black text-gray-900 mb-2">Analisis Ketahanan Inventaris (Inventory Health)</h2>
          <p class="text-sm text-gray-500 mb-6">Berdasarkan rasio konsumsi harian pengungsi vs stok gudang utama BPBD.</p>
          <div class="h-[350px] w-full flex-1">
            <Bar :data="inventoryData" :options="chartOpts" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 class="text-lg font-black text-gray-900 mb-4">Pemantauan Distribusi (Live)</h2>
          <div class="space-y-4">
            <div v-for="d in deliveries" :key="d.id" class="p-4 rounded-xl border border-gray-100">
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] font-mono font-bold bg-gray-100 px-2 py-0.5 rounded">{{ d.id_distribusi }}</span>
                <span :class="d.status === 'Selesai' ? 'text-green-600' : d.status === 'Loading' ? 'text-orange-600' : 'text-blue-600'" class="text-[10px] font-bold uppercase">{{ d.status }}</span>
              </div>
              <p class="font-bold text-gray-900 text-sm">{{ d.tujuan }}</p>
              <p class="text-xs text-gray-600 mt-1"><span class="font-semibold text-gray-900">Muatan:</span> {{ d.barang }}</p>
              <div class="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-medium">
                <TruckIcon class="w-4 h-4" /> {{ d.waktu }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>

    <!-- Modal Input Barang -->
    <transition name="fade">
      <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
        <div class="modal-box">
          <div class="modal-head">
            <h3>Input Barang / Distribusi Baru</h3>
            <button @click="showModal = false" class="modal-close"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <div class="modal-body">
            <label class="modal-label">Tujuan Pengiriman</label>
            <input v-model="form.tujuan" type="text" placeholder="cth. Posko Bonang" class="modal-input" />
            <label class="modal-label">Muatan / Barang</label>
            <input v-model="form.barang" type="text" placeholder="cth. 300 Dus Air Mineral" class="modal-input" />
            <label class="modal-label">Status</label>
            <select v-model="form.status" class="modal-input">
              <option>Loading</option>
              <option>Dalam Perjalanan</option>
              <option>Selesai</option>
            </select>
          </div>
          <div class="modal-foot">
            <button class="modal-btn-ghost" @click="showModal = false" type="button">Batal</button>
            <button class="modal-btn-primary" @click="addDelivery" :disabled="!form.tujuan.trim() || !form.barang.trim()" type="button">Catat Distribusi</button>
          </div>
        </div>
      </div>
    </transition>
  </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }

.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(15,23,42,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 16px; }
.modal-box { width: 100%; max-width: 460px; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.3); }
.modal-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }
.modal-head h3 { font-size: 17px; font-weight: 900; color: #111827; }
.modal-close { width: 34px; height: 34px; border-radius: 999px; border: none; background: #f1f5f9; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.modal-close:hover { background: #fee2e2; color: #dc2626; }
.modal-body { padding: 20px 24px; }
.modal-label { display: block; font-size: 12px; font-weight: 800; color: #475569; margin: 12px 0 6px; }
.modal-label:first-child { margin-top: 0; }
.modal-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 14px; outline: none; }
.modal-input:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
.modal-foot { display: flex; gap: 12px; padding: 16px 24px 24px; }
.modal-btn-ghost { flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #e2e8f0; background: #fff; font-weight: 800; color: #475569; cursor: pointer; }
.modal-btn-ghost:hover { background: #f8fafc; }
.modal-btn-primary { flex: 2; padding: 12px; border-radius: 12px; border: none; background: linear-gradient(135deg, #f97316, #dc2626); color: #fff; font-weight: 800; cursor: pointer; }
.modal-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
