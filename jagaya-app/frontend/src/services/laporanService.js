import api from './api'

export const laporanService = {
  async getAll(page = 1, limit = 10, search = '') {
    const res = await api.get('/laporan', {
      params: { page, limit, search }
    })
    return res.data
  },

  async create(data) {
    const res = await api.post('/laporan', data)
    return res.data
  },

  async updateStatus(id, status) {
    const res = await api.put(`/laporan/${id}`, { status })
    return res.data
  },

  async delete(id) {
    const res = await api.delete(`/laporan/${id}`)
    return res.data
  },

  async uploadPhoto(file) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  }
}
