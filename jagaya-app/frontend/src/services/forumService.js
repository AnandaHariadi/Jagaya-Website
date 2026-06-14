import api from './api'
import { authService } from './authService'

/**
 * Mock forum data for demo mode.
 */
const MOCK_FORUM = [
  { id: 1, nama: 'Pak Hasan', kategori: 'Infrastruktur', isi: 'Jembatan penghubung Desa Karanganyar ke posko terputus. Warga harus memutar jauh untuk mengakses bantuan. Mohon segera diperbaiki agar distribusi logistik tidak terhambat.', likes: 42, waktu: '2 jam lalu' },
  { id: 2, nama: 'Bu Sari Warga Sayung', kategori: 'Kesehatan', isi: 'Di posko Sayung banyak anak-anak yang mulai batuk dan demam. Obat-obatan di posko sudah menipis. Butuh tenaga medis tambahan dan pasokan obat segera.', likes: 38, waktu: '3 jam lalu' },
  { id: 3, nama: 'Anonim', kategori: 'Logistik', isi: 'Stok air bersih di Posko Bonang tinggal untuk 1 hari. Pengiriman terakhir sudah 3 hari lalu. Prioritaskan pengiriman air bersih ke wilayah ini!', likes: 55, waktu: '4 jam lalu' },
  { id: 4, nama: 'Relawan Dimas', kategori: 'Evakuasi', isi: 'Masih ada sekitar 20 KK di RT 05/RW 02 Dukuh Tugu yang belum dievakuasi. Akses jalan tergenang setinggi 1 meter. Butuh perahu karet tambahan.', likes: 67, waktu: '5 jam lalu' },
  { id: 5, nama: 'Ibu Ratna', kategori: 'Lainnya', isi: 'Terima kasih kepada seluruh relawan dan donatur. Semoga bantuan terus mengalir. Warga Demak sangat berterima kasih atas solidaritas yang luar biasa ini.', likes: 89, waktu: '6 jam lalu' },
  { id: 6, nama: 'Ahmad Fauzi', kategori: 'Infrastruktur', isi: 'Tanggul di titik KM 12 sudah retak dan mulai bocor. Jika tidak segera ditangani, bisa menyebabkan banjir susulan di 3 desa sekaligus. Mohon perhatian BPBD.', likes: 73, waktu: '8 jam lalu' },
  { id: 7, nama: 'Warga Mijen', kategori: 'Logistik', isi: 'Dapur umum di Posko Mijen kekurangan bahan bakar LPG. Sudah 2 hari memasak dengan kayu bakar seadanya. Mohon pengiriman tabung gas.', likes: 31, waktu: '10 jam lalu' },
]

let nextForumId = 8

/**
 * Forum service - manages community forum/aspirasi data via the API.
 * Falls back to mock data in demo mode.
 */
export const forumService = {
  async getAll() {
    if (authService.isDemoMode()) {
      return [...MOCK_FORUM]
    }
    const res = await api.get('/forum')
    return res.data.data
  },

  async create(aspirasi) {
    if (authService.isDemoMode()) {
      const newPost = {
        ...aspirasi,
        id: nextForumId++,
        likes: 0,
        waktu: 'Baru saja',
        nama: aspirasi.nama || 'Anonim',
      }
      MOCK_FORUM.unshift(newPost)
      return newPost
    }
    const res = await api.post('/forum', aspirasi)
    return res.data.data
  },

  async toggleLike(aspirasiId) {
    if (authService.isDemoMode()) {
      const post = MOCK_FORUM.find(p => p.id === aspirasiId)
      if (post) {
        // Simple toggle: the UI handles optimistic updates, 
        // we just return the current like count
        return { likes: post.likes }
      }
      return { likes: 0 }
    }
    const sessionId = authService.getSessionId()
    const res = await api.post(`/forum/${aspirasiId}/like`, { session_id: sessionId })
    return res.data
  }
}
