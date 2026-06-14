import api from './api'

/**
 * Logistik service - manages inventory and distribution data via the API.
 */
export const logistikService = {
  async getInventaris() {
    const res = await api.get('/logistik/inventaris')
    return res.data.data
  },

  async getDistribusi() {
    const res = await api.get('/logistik/distribusi')
    return res.data.data
  },

  async createDistribusi(distribusi) {
    const res = await api.post('/logistik/distribusi', distribusi)
    return res.data.data
  }
}
