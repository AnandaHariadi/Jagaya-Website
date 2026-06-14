import api from './api'

/**
 * Dashboard service - fetches aggregated statistics for the dashboard.
 */
export const dashboardService = {
  async getStats() {
    const res = await api.get('/dashboard/stats')
    return res.data.data
  }
}
