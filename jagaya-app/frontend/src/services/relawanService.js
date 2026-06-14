import api from './api'
import { authService } from './authService'

/**
 * Mock relawan data for demo mode.
 */
const MOCK_RELAWAN = [
  { id: 1, nama: 'Andi Wijaya', spesialisasi: 'Medis Darurat', lokasi: 'Posko Karanganyar', status: 'Aktif' },
  { id: 2, nama: 'Sari Dewi', spesialisasi: 'Dapur Umum', lokasi: 'Posko Sayung', status: 'Aktif' },
  { id: 3, nama: 'Rizky Pratama', spesialisasi: 'Evakuasi (SAR)', lokasi: 'Posko Bonang', status: 'Aktif' },
  { id: 4, nama: 'Nurul Hidayah', spesialisasi: 'Trauma Healing', lokasi: 'Posko Demak Kota', status: 'Aktif' },
  { id: 5, nama: 'Fajar Setiawan', spesialisasi: 'Logistik', lokasi: 'Posko Mijen', status: 'Standby' },
  { id: 6, nama: 'Mega Putri', spesialisasi: 'Medis Darurat', lokasi: 'Posko Karangtengah', status: 'Aktif' },
  { id: 7, nama: 'Bayu Aditya', spesialisasi: 'Evakuasi (SAR)', lokasi: 'Posko Gajah', status: 'Aktif' },
  { id: 8, nama: 'Lina Marlina', spesialisasi: 'Dapur Umum', lokasi: 'Posko Wonosalam', status: 'Standby' },
  { id: 9, nama: 'Dimas Ardianto', spesialisasi: 'Logistik', lokasi: 'Posko Karanganyar', status: 'Aktif' },
  { id: 10, nama: 'Ratna Sari', spesialisasi: 'Trauma Healing', lokasi: 'Posko Sayung', status: 'Aktif' },
]

let nextId = 11

/**
 * Relawan service - manages volunteer data via the API.
 * Falls back to mock data in demo mode.
 */
export const relawanService = {
  async getAll() {
    if (authService.isDemoMode()) {
      return [...MOCK_RELAWAN]
    }
    const res = await api.get('/relawan')
    return res.data.data
  },

  async create(relawan) {
    if (authService.isDemoMode()) {
      const newRelawan = { ...relawan, id: nextId++ }
      MOCK_RELAWAN.unshift(newRelawan)
      return newRelawan
    }
    const res = await api.post('/relawan', relawan)
    return res.data.data
  },

  async delete(id) {
    if (authService.isDemoMode()) {
      const idx = MOCK_RELAWAN.findIndex(r => r.id === id)
      if (idx !== -1) MOCK_RELAWAN.splice(idx, 1)
      return
    }
    await api.delete(`/relawan/${id}`)
  }
}
