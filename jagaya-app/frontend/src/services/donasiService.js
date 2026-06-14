import api from './api'
import { authService } from './authService'

/**
 * Mock donation data for demo mode.
 */
const MOCK_DONASI = [
  { id: 1, id_transaksi: 'TRX-2026-0891', nama_donatur: 'PT. Telkom Indonesia', nominal: 'Rp 50.000.000', waktu: 'Hari ini, 14:22', terverifikasi: true },
  { id: 2, id_transaksi: 'TRX-2026-0890', nama_donatur: 'Yayasan Peduli Bangsa', nominal: 'Rp 25.000.000', waktu: 'Hari ini, 11:05', terverifikasi: true },
  { id: 3, id_transaksi: 'TRX-2026-0889', nama_donatur: 'Hj. Siti Khadijah', nominal: 'Rp 10.000.000', waktu: 'Hari ini, 09:30', terverifikasi: true },
  { id: 4, id_transaksi: 'TRX-2026-0888', nama_donatur: 'Komunitas Alumni UNDIP', nominal: 'Rp 15.500.000', waktu: 'Kemarin, 16:45', terverifikasi: true },
  { id: 5, id_transaksi: 'TRX-2026-0887', nama_donatur: 'Bank BRI Cabang Demak', nominal: 'Rp 100.000.000', waktu: 'Kemarin, 14:10', terverifikasi: true },
  { id: 6, id_transaksi: 'TRX-2026-0886', nama_donatur: 'Anonim', nominal: 'Rp 5.000.000', waktu: 'Kemarin, 10:22', terverifikasi: false },
  { id: 7, id_transaksi: 'TRX-2026-0885', nama_donatur: 'CV. Maju Bersama', nominal: 'Rp 8.750.000', waktu: '2 hari lalu', terverifikasi: true },
  { id: 8, id_transaksi: 'TRX-2026-0884', nama_donatur: 'dr. Ahmad Hidayat', nominal: 'Rp 3.000.000', waktu: '2 hari lalu', terverifikasi: true },
]

/**
 * Donasi service - manages donation data via the API.
 * Falls back to mock data in demo mode.
 */
export const donasiService = {
  async getAll() {
    if (authService.isDemoMode()) {
      return [...MOCK_DONASI]
    }
    const res = await api.get('/donasi')
    return res.data.data
  }
}
