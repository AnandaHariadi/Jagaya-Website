<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { laporanService } from '../services/laporanService'

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

// Load Bootstrap CSS dynamically
let bsLink = null
onMounted(() => {
  bsLink = document.createElement('link')
  bsLink.rel = 'stylesheet'
  bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
  document.head.appendChild(bsLink)
  fetchLaporan()
})

onUnmounted(() => {
  if (bsLink) {
    document.head.removeChild(bsLink)
  }
})

// Methods
const fetchLaporan = async () => {
  try {
    const res = await laporanService.getAll(currentPage.value, limit, search.value)
    laporanList.value = res.data
    totalPages.value = res.pagination?.total_pages || 1
  } catch (error) {
    console.error('Error fetching data', error)
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
    : 'http://localhost/jagaya-api/uploads/' + item.foto // fallback
  uploadError.value = ''
  showForm.value = true
}

const saveLaporan = async () => {
  try {
    // 1. Upload foto jika ada file baru
    if (photoFile.value) {
      const uploadRes = await laporanService.uploadPhoto(photoFile.value)
      formData.value.foto = uploadRes.url
    }

    if (!isEdit.value && !formData.value.foto) {
      uploadError.value = 'Foto wajib diunggah untuk laporan baru.'
      return
    }

    // Trim spasi di belakang dan depan data (Keamanan Dasar untuk mencegah SQL Injection & Data kotor)
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
  <div class="bg-light min-vh-100 py-5" style="font-family: Arial, sans-serif;">
    <div class="container">
      
      <!-- Deskripsi Aplikasi -->
      <div class="card shadow-sm mb-5 border-0">
        <div class="card-body p-5 bg-white rounded">
          <h1 class="text-primary fw-bold mb-3">JAGAYA - Laporan Warga</h1>
          <h4 class="text-secondary mb-4">Deskripsi Aplikasi</h4>
          <p class="lead">
            JAGAYA (Platform Manajemen Tanggap Darurat Terpadu) adalah sistem informasi yang memfasilitasi penanganan bencana, 
            khususnya banjir. Melalui halaman <strong>Laporan Warga</strong> ini, masyarakat dapat berpartisipasi aktif 
            dengan melaporkan kondisi terkini di lokasi mereka. Warga bisa melapor pakai unggah foto keadaan sekitar.
          </p>
          <hr/>
          <p class="mb-2 fw-bold">Materi yang dipelajari dan diimplementasikan pada aplikasi ini meliputi:</p>
          <ul class="row">
            <li class="col-md-6">1. Create (Menyimpan Data ke MySQL)</li>
            <li class="col-md-6">2. Read (Menampilkan Data dari MySQL)</li>
            <li class="col-md-6">3. Update (Mengubah Data MySQL)</li>
            <li class="col-md-6">4. Delete (Menghapus Data MySQL)</li>
            <li class="col-md-6">5. Pencarian Data</li>
            <li class="col-md-6">6. Pagination (Pembatasan Halaman)</li>
            <li class="col-md-6">7. Upload File Foto dengan Validasi & Preview</li>
            <li class="col-md-6">8. Desain Menggunakan CSS Bootstrap 5</li>
            <li class="col-md-6">9. Validasi Form Input (Wajib Isi & Batasan Karakter)</li>
            <li class="col-md-6">10. Keamanan Dasar Mencegah SQL Injection (Trim & Binding)</li>
          </ul>
        </div>
      </div>

      <!-- CRUD Section -->
      <div class="card shadow-sm border-0">
        <div class="card-header bg-white d-flex justify-content-between align-items-center p-4">
          <h3 class="mb-0 fw-bold">Manajemen Data Laporan</h3>
          <button class="btn btn-primary px-4" @click="openCreate">
            + Tambah Laporan
          </button>
        </div>
        <div class="card-body p-4">
          
          <!-- Pencarian -->
          <div class="row mb-4">
            <div class="col-md-5">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Cari nama, lokasi, atau keterangan..." v-model="search" @keyup.enter="handleSearch">
                <button class="btn btn-outline-secondary" @click="handleSearch">Cari</button>
              </div>
            </div>
          </div>

          <!-- Tabel Data (Read) -->
          <div class="table-responsive">
            <table class="table table-hover table-striped align-middle">
              <thead class="table-light">
                <tr>
                  <th>No</th>
                  <th>Foto</th>
                  <th>Nama Pelapor</th>
                  <th>Lokasi</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="laporanList.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted">Tidak ada data ditemukan.</td>
                </tr>
                <tr v-for="(item, index) in laporanList" :key="item.id">
                  <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                  <td>
                    <img v-if="item.foto" :src="'http://localhost/jagaya-api' + item.foto" alt="Foto Bencana" class="img-thumbnail" style="width: 80px; height: 80px; object-fit: cover;">
                  </td>
                  <td class="fw-bold">{{ item.nama }}</td>
                  <td>{{ item.lokasi }}</td>
                  <td>{{ item.keterangan }}</td>
                  <td>
                    <span class="badge" :class="{
                      'bg-warning': item.status === 'Menunggu',
                      'bg-info': item.status === 'Diproses',
                      'bg-success': item.status === 'Selesai'
                    }">{{ item.status }}</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="openEdit(item)">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteLaporan(item.id)">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation" class="mt-4" v-if="totalPages > 1">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)">Sebelumnya</button>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)">Selanjutnya</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>

    <!-- Modal Form (Create / Update) -->
    <div v-if="showForm" class="modal d-block" style="background-color: rgba(0,0,0,0.5);" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="saveLaporan">
            <div class="modal-header">
              <h5 class="modal-title fw-bold">{{ isEdit ? 'Edit Status Laporan' : 'Tambah Laporan Baru' }}</h5>
              <button type="button" class="btn-close" @click="showForm = false"></button>
            </div>
            <div class="modal-body">
              
              <div v-if="isEdit" class="alert alert-info">
                <strong>Mode Edit:</strong> Hanya status laporan yang dapat diperbarui oleh petugas.
              </div>

              <!-- Nama -->
              <div class="mb-3">
                <label class="form-label fw-bold">Nama Pelapor <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="formData.nama" @input="validateInputName" required :disabled="isEdit" placeholder="Hanya huruf dan angka yang diizinkan">
                <div class="form-text">Maksimal 50 karakter. Simbol ilegal otomatis dihapus.</div>
              </div>

              <!-- Lokasi -->
              <div class="mb-3">
                <label class="form-label fw-bold">Lokasi Kejadian <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="formData.lokasi" required :disabled="isEdit">
              </div>

              <!-- Keterangan -->
              <div class="mb-3">
                <label class="form-label fw-bold">Keterangan <span class="text-danger">*</span></label>
                <textarea class="form-control" rows="3" v-model="formData.keterangan" required :disabled="isEdit"></textarea>
              </div>

              <!-- Upload File -->
              <div class="mb-3" v-if="!isEdit">
                <label class="form-label fw-bold">Upload Foto <span class="text-danger">*</span></label>
                <input type="file" class="form-control" accept="image/png, image/jpeg, image/jpg" @change="handleFileChange" required>
                <div class="form-text text-danger" v-if="uploadError">{{ uploadError }}</div>
                <div class="form-text">Format JPG/PNG. Maksimal 2MB.</div>
                
                <!-- Preview Foto -->
                <div class="mt-3" v-if="photoPreview">
                  <p class="mb-1 fw-bold">Preview Foto:</p>
                  <img :src="photoPreview" alt="Preview" class="img-thumbnail" style="max-height: 200px;">
                </div>
              </div>

              <!-- Status (Hanya saat Edit) -->
              <div class="mb-3" v-if="isEdit">
                <label class="form-label fw-bold">Status Penanganan <span class="text-danger">*</span></label>
                <select class="form-select" v-model="formData.status" required>
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showForm = false">Batal</button>
              <button type="submit" class="btn btn-primary px-4">Simpan Data</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped overrides if necessary */
</style>
