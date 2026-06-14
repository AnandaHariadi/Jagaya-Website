import api from './api'
import { authService } from './authService'

/**
 * Forum service - manages community forum/aspirasi data via the API.
 */
export const forumService = {
  async getAll() {
    const res = await api.get('/forum')
    return res.data.data
  },

  async create(aspirasi) {
    const res = await api.post('/forum', aspirasi)
    return res.data.data
  },

  async toggleLike(aspirasiId) {
    const sessionId = authService.getSessionId()
    const res = await api.post(`/forum/${aspirasiId}/like`, { session_id: sessionId })
    return res.data
  }
}
