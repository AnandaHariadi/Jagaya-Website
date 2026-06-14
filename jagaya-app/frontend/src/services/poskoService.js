import api from './api'
import { authService } from './authService'

/**
 * Mock posko data for demo mode (realistic Demak coordinates).
 */
const MOCK_POSKO = [
  { id: 1, nama: 'Posko Karanganyar', lat: -6.8953, lng: 110.6386, kapasitas: 500, terisi: 478, status: 'Kritis', tren: '+12/hari', lokasi: 'Karanganyar', koordinator: 'Budi Santoso', pengungsi: 478, lastUpdate: '5 mnt lalu' },
  { id: 2, nama: 'Posko Sayung', lat: -6.9153, lng: 110.5886, kapasitas: 350, terisi: 320, status: 'Siaga', tren: '+8/hari', lokasi: 'Sayung', koordinator: 'Siti Aminah', pengungsi: 320, lastUpdate: '12 mnt lalu' },
  { id: 3, nama: 'Posko Bonang', lat: -6.8753, lng: 110.6086, kapasitas: 400, terisi: 384, status: 'Kritis', tren: '+15/hari', lokasi: 'Bonang', koordinator: 'Ahmad Fauzi', pengungsi: 384, lastUpdate: '3 mnt lalu' },
  { id: 4, nama: 'Posko Mijen', lat: -6.8553, lng: 110.6586, kapasitas: 300, terisi: 210, status: 'Normal', tren: '+5/hari', lokasi: 'Mijen', koordinator: 'Dewi Lestari', pengungsi: 210, lastUpdate: '20 mnt lalu' },
  { id: 5, nama: 'Posko Demak Kota', lat: -6.8920, lng: 110.6394, kapasitas: 600, terisi: 542, status: 'Kritis', tren: '+18/hari', lokasi: 'Demak Kota', koordinator: 'Hendra Wijaya', pengungsi: 542, lastUpdate: '1 mnt lalu' },
  { id: 6, nama: 'Posko Wonosalam', lat: -6.8680, lng: 110.6200, kapasitas: 250, terisi: 175, status: 'Normal', tren: '+3/hari', lokasi: 'Wonosalam', koordinator: 'Rina Sari', pengungsi: 175, lastUpdate: '30 mnt lalu' },
  { id: 7, nama: 'Posko Gajah', lat: -6.8450, lng: 110.6700, kapasitas: 200, terisi: 178, status: 'Siaga', tren: '+7/hari', lokasi: 'Gajah', koordinator: 'Eko Prasetyo', pengungsi: 178, lastUpdate: '8 mnt lalu' },
  { id: 8, nama: 'Posko Karangtengah', lat: -6.9050, lng: 110.6100, kapasitas: 350, terisi: 298, status: 'Siaga', tren: '+10/hari', lokasi: 'Karangtengah', koordinator: 'Nur Hidayat', pengungsi: 298, lastUpdate: '15 mnt lalu' },
]

/**
 * Posko service - manages evacuation shelter data via the API.
 * Falls back to mock data in demo mode.
 */
export const poskoService = {
  async getAll() {
    if (authService.isDemoMode()) {
      return [...MOCK_POSKO]
    }
    const res = await api.get('/posko')
    return res.data.data
  },

  async create(posko) {
    if (authService.isDemoMode()) {
      const newPosko = {
        ...posko,
        id: Date.now(),
        terisi: 0,
        status: 'Normal',
        tren: '+0/hari',
        lastUpdate: 'Baru saja',
      }
      MOCK_POSKO.unshift(newPosko)
      return newPosko
    }
    const res = await api.post('/posko', posko)
    return res.data
  }
}
