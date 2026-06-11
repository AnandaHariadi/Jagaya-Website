<script setup>
import { ref } from 'vue'
import PublicLayout from '../components/PublicLayout.vue'

const isLoading = ref(false)
const isSuccess = ref(false)
const form = ref({
  nama: '',
  nik: '',
  telepon: '',
  pekerjaan: '',
  keahlian: [],
  ketersediaanWaktu: ''
})

const keahlianOptions = [
  'Medis & P3K',
  'Logistik & Distribusi',
  'Dapur Umum',
  'Evakuasi & SAR',
  'Trauma Healing / Psikologi',
  'Administrasi / IT'
]

const handleSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSuccess.value = true
    form.value = {
      nama: '', nik: '', telepon: '', pekerjaan: '', keahlian: [], ketersediaanWaktu: ''
    }
  }, 1500)
}
</script>

<template>
  <PublicLayout>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-4">Daftar Menjadi Relawan</h1>
        <p class="text-gray-500 font-medium text-lg">Bergabunglah bersama kami di garis depan. Tenaga dan keahlian Anda dapat menyelamatkan banyak nyawa.</p>
      </div>

      <!-- Success Alert -->
      <div v-if="isSuccess" class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-center animate-fade-in">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-blue-800 mb-2">Pendaftaran Berhasil!</h3>
        <p class="text-blue-700 font-medium">Terima kasih atas dedikasi Anda. Tim koordinator JAGAYA akan menghubungi Anda untuk instruksi dan penempatan selanjutnya.</p>
        <button @click="isSuccess = false" class="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">Daftar Relawan Lain</button>
      </div>

      <!-- Volunteer Form -->
      <div v-else class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
              <input type="text" v-model="form.nama" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="Nama Anda" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nomor Induk Kependudukan (NIK)</label>
              <input type="text" v-model="form.nik" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="3321..." />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon / WhatsApp Aktif</label>
              <input type="tel" v-model="form.telepon" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="08123456789" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Pekerjaan Saat Ini</label>
              <input type="text" v-model="form.pekerjaan" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="Mahasiswa / Dokter / dll" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">Bidang Keahlian (Bisa pilih lebih dari satu)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label v-for="skill in keahlianOptions" :key="skill" class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" v-model="form.keahlian" :value="skill" class="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                <span class="ml-3 text-sm font-medium text-gray-700">{{ skill }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Ketersediaan Waktu / Shift</label>
            <select v-model="form.ketersediaanWaktu" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white">
              <option value="" disabled>Pilih Ketersediaan Waktu</option>
              <option value="Penuh Waktu (Tinggal di Posko)">Penuh Waktu (Tinggal di Posko)</option>
              <option value="Paruh Waktu (Siang Hari)">Paruh Waktu (Siang Hari)</option>
              <option value="Paruh Waktu (Malam Hari)">Paruh Waktu (Malam Hari)</option>
              <option value="Hanya Akhir Pekan">Hanya Akhir Pekan</option>
            </select>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full bg-gradient-to-r from-slate-800 to-gray-900 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Mengirim Data...' : 'Kirim Pendaftaran' }}
          </button>
        </form>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
