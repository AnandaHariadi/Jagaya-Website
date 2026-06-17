<script setup>
import { ref, onMounted } from 'vue'
import { laporanService } from '../services/laporanService'
import PublicLayout from '../components/PublicLayout.vue'

// Data
const laporanList = ref([])
const totalPages = ref(1)
const currentPage = ref(1)
const search = ref('')
const limit = 5

// Form state
const showForm = ref(false)
const isEdit = ref(false)
const formData = ref({
  id: null,
  nama: '',
  lokasi: '',
  keterangan: '',
  foto: '',
  status: 'Menunggu'
})

// Upload & Preview
const photoFile = ref(null)
const photoPreview = ref(null)
const uploadError = ref('')
const isLoading = ref(false)

onMounted(() => {
  fetchLaporan()
})

// Methods
const fetchLaporan = async () => {
  try {
    const res = await laporanService.getAll(currentPage.value, limit, search.value)
    if (res && Array.isArray(res.data)) {
      laporanList.value = res.data
      totalPages.value = res.pagination?.total_pages || 1
    } else {
      laporanList.value = []
    }
  } catch (error) {
    console.error('Error fetching data', error)
    laporanList.value = []
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchLaporan()
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchLaporan()
  }
}

const validateInputName = (event) => {
  // Hanya huruf, angka, spasi, titik, koma
  formData.value.nama = event.target.value.replace(/[^a-zA-Z0-9\s.,]/g, '')
}

const handleFileChange = (event) => {
  uploadError.value = ''
  const file = event.target.files[0]
  if (!file) return

  // Validasi tipe
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!validTypes.includes(file.type)) {
    uploadError.value = 'Hanya file JPG dan PNG yang diperbolehkan.'
    photoFile.value = null
    photoPreview.value = null
    event.target.value = ''
    return
  }

  // Validasi ukuran (Maks 2MB)
  if (file.size > 2 * 1024 * 1024) {
    uploadError.value = 'Ukuran file maksimal 2MB.'
    photoFile.value = null
    photoPreview.value = null
    event.target.value = ''
    return
  }

  photoFile.value = file
  // Preview
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const openCreate = () => {
  isEdit.value = false
  formData.value = { id: null, nama: '', lokasi: '', keterangan: '', foto: '', status: 'Menunggu' }
  photoFile.value = null
  photoPreview.value = null
  uploadError.value = ''
  showForm.value = true
}

const openEdit = (item) => {
  isEdit.value = true
  formData.value = { ...item }
  photoFile.value = null
  photoPreview.value = item.foto.startsWith('http') || item.foto.startsWith('/') 
    ? item.foto 
    : 'http://localhost:8080/jagaya-api/uploads/' + item.foto // fallback
  uploadError.value = ''
  showForm.value = true
}

const saveLaporan = async () => {
  try {
    isLoading.value = true
    // 1. Upload foto jika ada file baru
    if (photoFile.value) {
      const uploadRes = await laporanService.uploadPhoto(photoFile.value)
      formData.value.foto = uploadRes.url
    }

    if (!isEdit.value && !formData.value.foto) {
      uploadError.value = 'Foto wajib diunggah untuk laporan baru.'
      isLoading.value = false
      return
    }

    // Trim spasi di belakang dan depan data
    formData.value.nama = formData.value.nama.trim()
    formData.value.lokasi = formData.value.lokasi.trim()
    formData.value.keterangan = formData.value.keterangan.trim()

    // 2. Simpan Data
    if (isEdit.value) {
      await laporanService.updateStatus(formData.value.id, formData.value.status)
      alert('Data berhasil diupdate!')
    } else {
      await laporanService.create(formData.value)
      alert('Laporan berhasil ditambahkan!')
    }

    showForm.value = false
    fetchLaporan()
  } catch (error) {
    console.error('Error saving data', error)
    alert(error.response?.data?.error || 'Gagal menyimpan data')
  } finally {
    isLoading.value = false
  }
}

const deleteLaporan = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    try {
      await laporanService.delete(id)
      alert('Data berhasil dihapus!')
      fetchLaporan()
    } catch (error) {
      console.error('Error deleting data', error)
      alert('Gagal menghapus data')
    }
  }
}
</script>

<template>
  <PublicLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Deskripsi Aplikasi -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 mb-10 text-center sm:text-left relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <!-- Background decorative element -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-100 to-red-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-4 uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Pantauan Real-time
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Laporan Warga</h1>
          <p class="text-gray-500 font-medium text-lg max-w-3xl">
            Sistem Informasi Pelaporan Kondisi Darurat Terpadu. Masyarakat dapat berpartisipasi aktif melaporkan situasi terkini di lokasi terdampak bencana dengan bukti foto untuk percepatan respon tim SAR & Relawan.
          </p>
        </div>
      </div>

      <!-- CRUD Section -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        <!-- Header & Toolbar -->
        <div class="px-6 py-6 sm:px-8 sm:flex sm:items-center sm:justify-between border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 class="text-2xl font-bold leading-6 text-gray-900">Data Laporan Warga</h3>
            <p class="mt-2 text-sm text-gray-500">Daftar laporan terkini yang dikirim oleh masyarakat.</p>
          </div>
          <div class="mt-4 sm:mt-0 flex gap-4">
            <div class="relative">
              <input type="text" v-model="search" @keyup.enter="handleSearch" placeholder="Cari laporan..." class="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm w-full sm:w-64" />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <button @click="openCreate" class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Buat Laporan
            </button>
          </div>
        </div>

        <!-- Tabel Data -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">No</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Foto Bukti</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Informasi Pelapor</th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="laporanList.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500 font-medium">Tidak ada data ditemukan.</td>
              </tr>
              <tr v-for="(item, index) in laporanList" :key="item.id" class="group hover:bg-orange-50/50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {{ (currentPage - 1) * limit + index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="h-16 w-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <img v-if="item.foto" :src="'http://localhost:8080/jagaya-api' + item.foto" class="h-full w-full object-cover" alt="Foto Bencana" />
                    <svg v-else class="h-full w-full text-gray-300 p-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900">{{ item.nama }}</div>
                  <div class="text-sm text-gray-500 font-medium mt-0.5 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ item.lokasi }}
                  </div>
                  <div class="text-sm text-gray-600 mt-1 line-clamp-2">{{ item.keterangan }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full" 
                        :class="{
                          'bg-yellow-100 text-yellow-800 border border-yellow-200': item.status === 'Menunggu',
                          'bg-blue-100 text-blue-800 border border-blue-200': item.status === 'Diproses',
                          'bg-green-100 text-green-800 border border-green-200': item.status === 'Selesai'
                        }">
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="openEdit(item)" class="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors mr-2 font-bold">Edit</button>
                  <button @click="deleteLaporan(item.id)" class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors font-bold">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-4 sm:px-6 border-t border-gray-200 flex items-center justify-between" v-if="totalPages > 1">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 font-medium">
                Menampilkan halaman <span class="font-bold">{{ currentPage }}</span> dari <span class="font-bold">{{ totalPages }}</span>
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                </button>
                <button v-for="page in totalPages" :key="page" @click="changePage(page)" 
                        :class="page === currentPage ? 'z-10 bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'" 
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-bold">
                  {{ page }}
                </button>
                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal Overlay -->
    <div v-if="showForm" class="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" @click="showForm = false" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <!-- Modal panel -->
        <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-gray-100">
          <form @submit.prevent="saveLaporan">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex justify-between items-center mb-5">
                <h3 class="text-2xl leading-6 font-black text-gray-900" id="modal-title">
                  {{ isEdit ? 'Edit Status Laporan' : 'Tambah Laporan Baru' }}
                </h3>
                <button type="button" @click="showForm = false" class="text-gray-400 hover:text-gray-500 bg-gray-50 rounded-full p-2 hover:bg-gray-100 transition-colors">
                  <span class="sr-only">Close</span>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div class="space-y-5">
                <div v-if="isEdit" class="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 text-sm font-medium flex items-start gap-3">
                  <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                  <span><strong>Mode Edit:</strong> Hanya status laporan yang dapat diperbarui oleh petugas. Data lain hanya dapat dilihat.</span>
                </div>

                <!-- Nama -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Nama Pelapor <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.nama" @input="validateInputName" required :disabled="isEdit" 
                         class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed" 
                         placeholder="Hanya huruf dan angka yang diizinkan" />
                  <p class="mt-1.5 text-xs text-gray-500 font-medium">Maksimal 50 karakter. Simbol ilegal otomatis dihapus.</p>
                </div>

                <!-- Lokasi -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Lokasi Kejadian <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.lokasi" required :disabled="isEdit" 
                         class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed" 
                         placeholder="Contoh: Jl. Pemuda No. 10, Demak" />
                </div>

                <!-- Keterangan -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Keterangan <span class="text-red-500">*</span></label>
                  <textarea v-model="formData.keterangan" required :disabled="isEdit" rows="3"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed" 
                            placeholder="Deskripsikan kondisi terkini..."></textarea>
                </div>

                <!-- Upload File -->
                <div v-if="!isEdit" class="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed">
                  <label class="block text-sm font-bold text-gray-700 mb-2">Upload Foto Bukti <span class="text-red-500">*</span></label>
                  <input type="file" accept="image/png, image/jpeg, image/jpg" @change="handleFileChange" required 
                         class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition-colors" />
                  <p v-if="uploadError" class="mt-2 text-sm text-red-600 font-bold">{{ uploadError }}</p>
                  <p class="mt-2 text-xs text-gray-500 font-medium">Format JPG/PNG. Maksimal 2MB.</p>
                  
                  <!-- Preview -->
                  <div v-if="photoPreview" class="mt-4">
                    <p class="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Preview Foto:</p>
                    <div class="h-40 w-full rounded-xl overflow-hidden shadow-sm border border-gray-200">
                      <img :src="photoPreview" class="w-full h-full object-cover" alt="Preview" />
                    </div>
                  </div>
                </div>

                <!-- Status (Hanya saat Edit) -->
                <div v-if="isEdit">
                  <label class="block text-sm font-bold text-gray-700 mb-1">Status Penanganan <span class="text-red-500">*</span></label>
                  <select v-model="formData.status" required 
                          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white">
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>

              </div>
            </div>
            
            <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
              <button type="submit" :disabled="isLoading" 
                      class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-base font-bold text-white hover:shadow-lg transition-all sm:ml-3 sm:w-auto sm:text-sm items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Menyimpan...' : 'Simpan Data' }}
              </button>
              <button type="button" @click="showForm = false" 
                      class="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-6 py-2.5 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
/* Animasi form fade in sudah ditangani oleh transition Tailwind */
</style>
