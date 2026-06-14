import api from './api'

/**
 * Relawan service - manages volunteer data via the API.
 */
export const relawanService = {
  async getAll() {
    const res = await api.get('/relawan')
    return res.data.data
  },

  async create(relawan) {
    const res = await api.post('/relawan', relawan)
    return res.data.data
  },

  async delete(id) {
    await api.delete(`/relawan/${id}`)
  }
}
