import api from './api'
import { authService } from './authService'

/**
 * Mock inventory data for demo mode.
 */
const MOCK_INVENTARIS = [
  { nama_barang: 'Beras', stok_saat_ini: 850, batas_kritis: 200 },
  { nama_barang: 'Mi Instan', stok_saat_ini: 1200, batas_kritis: 300 },
  { nama_barang: 'Air Mineral', stok_saat_ini: 2400, batas_kritis: 500 },
  { nama_barang: 'Susu Bayi', stok_saat_ini: 45, batas_kritis: 100 },
  { nama_barang: 'Obat P3K', stok_saat_ini: 320, batas_kritis: 150 },
  { nama_barang: 'Selimut', stok_saat_ini: 180, batas_kritis: 100 },
  { nama_barang: 'Masker', stok_saat_ini: 950, batas_kritis: 200 },
]

/**
 * Mock distribution data for demo mode.
 */
const MOCK_DISTRIBUSI = [
  { id: 1, id_distribusi: 'DST-2026-045', tujuan: 'Posko Karanganyar', barang: '200 Dus Air Mineral, 100 Kg Beras', status: 'Dalam Perjalanan', waktu: 'Hari ini, 13:00' },
  { id: 2, id_distribusi: 'DST-2026-044', tujuan: 'Posko Bonang', barang: '150 Dus Mi Instan, 50 Selimut', status: 'Selesai', waktu: 'Hari ini, 10:30' },
  { id: 3, id_distribusi: 'DST-2026-043', tujuan: 'Posko Sayung', barang: '300 Masker, 100 Set Obat P3K', status: 'Selesai', waktu: 'Kemarin, 15:45' },
  { id: 4, id_distribusi: 'DST-2026-042', tujuan: 'Posko Demak Kota', barang: '500 Kg Beras, 200 Dus Air', status: 'Loading', waktu: 'Kemarin, 08:20' },
  { id: 5, id_distribusi: 'DST-2026-041', tujuan: 'Posko Mijen', barang: '80 Kaleng Susu Bayi, 50 Selimut', status: 'Selesai', waktu: '2 hari lalu' },
]

let nextDistId = 6

/**
 * Logistik service - manages inventory and distribution data via the API.
 * Falls back to mock data in demo mode.
 */
export const logistikService = {
  async getInventaris() {
    if (authService.isDemoMode()) {
      return [...MOCK_INVENTARIS]
    }
    const res = await api.get('/logistik/inventaris')
    return res.data.data
  },

  async getDistribusi() {
    if (authService.isDemoMode()) {
      return [...MOCK_DISTRIBUSI]
    }
    const res = await api.get('/logistik/distribusi')
    return res.data.data
  },

  async createDistribusi(distribusi) {
    if (authService.isDemoMode()) {
      const newDeliv = {
        ...distribusi,
        id: nextDistId,
        id_distribusi: `DST-2026-${String(45 + nextDistId).padStart(3, '0')}`,
        waktu: 'Baru saja',
      }
      nextDistId++
      MOCK_DISTRIBUSI.unshift(newDeliv)
      return newDeliv
    }
    const res = await api.post('/logistik/distribusi', distribusi)
    return res.data.data
  }
}
