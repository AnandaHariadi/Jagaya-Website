import api from './api'
import { authService } from './authService'

/**
 * Mock dashboard stats for demo mode.
 */
const MOCK_STATS = {
  totalPengungsi: 12450,
  totalRelawan: 1200,
  totalPosko: 45,
  totalDonasi: 245000000000,
  donasiTersalur: 89,
}

/**
 * Dashboard service - fetches aggregated statistics for the dashboard.
 * Falls back to mock data in demo mode.
 */
export const dashboardService = {
  async getStats() {
    if (authService.isDemoMode()) {
      return { ...MOCK_STATS }
    }
    const res = await api.get('/dashboard/stats')
    return res.data.data
  }
}
