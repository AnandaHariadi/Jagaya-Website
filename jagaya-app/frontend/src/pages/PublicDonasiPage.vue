<script setup>
import { ref } from 'vue'
import PublicLayout from '../components/PublicLayout.vue'

const isLoading = ref(false)
const isSuccess = ref(false)
const form = ref({
  nama: '',
  telepon: '',
  jenisDonasi: 'Dana',
  nominal: '',
  barang: '',
  pesan: ''
})

const handleSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSuccess.value = true
    // Reset form
    form.value = {
      nama: '', telepon: '', jenisDonasi: 'Dana', nominal: '', barang: '', pesan: ''
    }
  }, 1500)
}
</script>

<template>
  <PublicLayout>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-4">Pusat Donasi Bencana</h1>
        <p class="text-gray-500 font-medium text-lg">Setiap bantuan Anda sangat berarti bagi mereka yang terdampak banjir di Kabupaten Demak.</p>
      </div>

      <!-- Success Alert -->
      <div v-if="isSuccess" class="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center animate-fade-in">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-green-800 mb-2">Terima Kasih atas Donasi Anda!</h3>
        <p class="text-green-700 font-medium">Bantuan Anda telah kami catat. Petugas kami akan segera menghubungi Anda jika diperlukan koordinasi lebih lanjut.</p>
        <button @click="isSuccess = false" class="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors">Donasi Lagi</button>
      </div>

      <!-- Donation Form -->
      <div v-else class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap / Instansi</label>
              <input type="text" v-model="form.nama" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="Nama Anda" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
              <input type="tel" v-model="form.telepon" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="08123456789" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Jenis Donasi</label>
            <div class="grid grid-cols-2 gap-4">
              <label class="relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all"
                     :class="form.jenisDonasi === 'Dana' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:bg-gray-50'">
                <input type="radio" v-model="form.jenisDonasi" value="Dana" class="sr-only" />
                <span class="font-bold">Uang Tunai / Transfer</span>
              </label>
              <label class="relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all"
                     :class="form.jenisDonasi === 'Barang' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:bg-gray-50'">
                <input type="radio" v-model="form.jenisDonasi" value="Barang" class="sr-only" />
                <span class="font-bold">Barang Logistik</span>
              </label>
            </div>
          </div>

          <div v-if="form.jenisDonasi === 'Dana'" class="animate-fade-in">
            <label class="block text-sm font-bold text-gray-700 mb-2">Nominal Donasi (Rp)</label>
            <input type="number" v-model="form.nominal" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="100000" />
            <p class="text-xs text-gray-500 mt-2 font-medium">Instruksi transfer akan ditampilkan setelah Anda mengirimkan form ini.</p>
          </div>

          <div v-if="form.jenisDonasi === 'Barang'" class="animate-fade-in">
            <label class="block text-sm font-bold text-gray-700 mb-2">Rincian Barang</label>
            <textarea v-model="form.barang" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="Contoh: 10 Dus Indomie, 5 Karung Beras, Pakaian Layak Pakai"></textarea>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Pesan & Doa (Opsional)</label>
            <textarea v-model="form.pesan" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white" placeholder="Tuliskan pesan dukungan untuk para korban..."></textarea>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Memproses...' : 'Kirim Donasi' }}
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
