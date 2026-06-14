import api from './api'

/**
 * Posko service - manages evacuation shelter data via the API.
 */
export const poskoService = {
  async getAll() {
    const res = await api.get('/posko')
    return res.data.data
  },

  async create(posko) {
    const res = await api.post('/posko', posko)
    return res.data
  }
}
