import api from './api'

/**
 * Donasi service - manages donation data via the API.
 */
export const donasiService = {
  async getAll() {
    const res = await api.get('/donasi')
    return res.data.data
  }
}
