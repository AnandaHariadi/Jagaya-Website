<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, MagnifyingGlassIcon, BriefcaseIcon, MapPinIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '../components/DashboardLayout.vue'

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const relawans = ref([
  { id: 1, nama: 'Budi Santoso', spesialisasi: 'Medis Darurat', lokasi: 'Posko Karanganyar', status: 'Aktif' },
  { id: 2, nama: 'Siti Aminah', spesialisasi: 'Dapur Umum', lokasi: 'Posko Sayung', status: 'Aktif' },
  { id: 3, nama: 'Ahmad Fauzi', spesialisasi: 'Evakuasi (SAR)', lokasi: 'Posko Demak Kota', status: 'Standby' },
  { id: 4, nama: 'Rina Melati', spesialisasi: 'Trauma Healing', lokasi: 'Posko Bonang', status: 'Aktif' },
])

/* ── Search ── */
const search = ref('')
const filteredRelawans = computed(() => {
  if (!search.value.trim()) return relawans.value
  const q = search.value.toLowerCase()
  return relawans.value.filter(r =>
    r.nama.toLowerCase().includes(q) || r.spesialisasi.toLowerCase().includes(q) || r.lokasi.toLowerCase().includes(q)
  )
})

/* ── Registrasi modal ── */
const showModal = ref(false)
const form = ref({ nama: '', spesialisasi: 'Medis Darurat', lokasi: '', status: 'Aktif' })
const spesialisasiOptions = ['Medis Darurat', 'Dapur Umum', 'Evakuasi (SAR)', 'Trauma Healing', 'Logistik']
const openModal = () => { form.value = { nama: '', spesialisasi: 'Medis Darurat', lokasi: '', status: 'Aktif' }; showModal.value = true }
const addRelawan = () => {
  if (!form.value.nama.trim()) return
  relawans.value.unshift({
    id: Date.now(),
    nama: form.value.nama.trim(),
    spesialisasi: form.value.spesialisasi,
    lokasi: form.value.lokasi.trim() || 'Belum ditugaskan',
    status: form.value.status,
  })
  showModal.value = false
}

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
    data: [150, 120, 80, 140, 95],
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
</script>


<template>
  <DashboardLayout>
    <div class="font-sans pb-24">
    <!-- Header -->
    <div class="bg-white pt-8 pb-10 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span class="text-orange-600 text-[11px] font-bold uppercase tracking-widest mb-2 block">Analisis Tenaga Bantuan</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight">Kinerja & Distribusi Relawan</h1>
          </div>
          <button class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-colors shadow-lg shadow-orange-500/30 flex items-center gap-2" @click="openModal" type="button">
            <PlusIcon class="w-5 h-5" /> Registrasi Relawan
          </button>
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
        <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 flex-wrap gap-4">
          <h2 class="text-lg font-black text-gray-900">Database Personel Aktif <span class="text-sm font-bold text-gray-400">({{ filteredRelawans.length }})</span></h2>
          <div class="relative w-64">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input v-model="search" type="text" placeholder="Cari relawan..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
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
            <tr v-for="r in filteredRelawans" :key="r.id" class="hover:bg-orange-50/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{{ r.nama.charAt(0) }}</div>
                  <div>
                    <p class="font-bold text-gray-900 text-sm">{{ r.nama }}</p>
                    <p class="text-xs text-gray-500">ID: RLW-{{ r.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-600"><div class="flex items-center gap-2"><BriefcaseIcon class="w-4 h-4 text-gray-400"/>{{ r.spesialisasi }}</div></td>
              <td class="px-6 py-4 text-sm font-medium text-gray-600"><div class="flex items-center gap-2"><MapPinIcon class="w-4 h-4 text-orange-500"/>{{ r.lokasi }}</div></td>
              <td class="px-6 py-4">
                <span :class="r.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'" class="px-2.5 py-1 rounded-md text-xs font-bold uppercase">{{ r.status }}</span>
              </td>
            </tr>
            <tr v-if="filteredRelawans.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-400 font-medium">Tidak ada relawan yang cocok dengan pencarian.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Registrasi -->
    <transition name="fade">
      <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
        <div class="modal-box">
          <div class="modal-head">
            <h3>Registrasi Relawan Baru</h3>
            <button @click="showModal = false" class="modal-close"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <div class="modal-body">
            <label class="modal-label">Nama Lengkap</label>
            <input v-model="form.nama" type="text" placeholder="cth. Andi Wijaya" class="modal-input" />
            <label class="modal-label">Spesialisasi</label>
            <select v-model="form.spesialisasi" class="modal-input">
              <option v-for="s in spesialisasiOptions" :key="s" :value="s">{{ s }}</option>
            </select>
            <label class="modal-label">Lokasi Tugas</label>
            <input v-model="form.lokasi" type="text" placeholder="cth. Posko Sayung" class="modal-input" />
            <label class="modal-label">Status</label>
            <select v-model="form.status" class="modal-input">
              <option>Aktif</option>
              <option>Standby</option>
            </select>
          </div>
          <div class="modal-foot">
            <button class="modal-btn-ghost" @click="showModal = false" type="button">Batal</button>
            <button class="modal-btn-primary" @click="addRelawan" :disabled="!form.nama.trim()" type="button">Simpan Relawan</button>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { font-family: 'Inter', system-ui, sans-serif; }

.modal-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(15,23,42,0.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: 16px;
}
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
