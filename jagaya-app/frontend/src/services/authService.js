import api from './api'

/**
 * Auth service - handles login, register, and session management.
 */
export const authService = {
  async login(email, password, role) {
    // Mock login for demo accounts
    if (role === 'petugas' && email === 'demo@petugas.com' && password === 'demo123') {
      const user = { id: 1, nama: 'Admin Posko (Demo)', role: 'petugas', email }
      localStorage.setItem('authToken', 'demo-token-petugas')
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userName', user.nama)
      localStorage.setItem('userId', user.id)
      return { token: 'demo-token-petugas', user }
    }
    
    if (role === 'masyarakat' && email === 'demo@warga.com' && password === 'demo123') {
      const user = { id: 2, nama: 'Warga Demak (Demo)', role: 'masyarakat', email }
      localStorage.setItem('authToken', 'demo-token-warga')
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userName', user.nama)
      localStorage.setItem('userId', user.id)
      return { token: 'demo-token-warga', user }
    }

    try {
      const res = await api.post('/auth/login', { email, password, role })
      const { token, user } = res.data

      // Store auth data
      localStorage.setItem('authToken', token)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userName', user.nama)
      localStorage.setItem('userId', user.id)

      return res.data
    } catch (error) {
      // Provide clearer error messages
      if (!error.response) {
        // Network error — no backend available
        throw new Error('Server tidak tersedia. Gunakan akun demo untuk mencoba sistem.')
      }
      throw error
    }
  },

  async register(nama, email, password) {
    const res = await api.post('/auth/register', { nama, email, password })
    const { token, user } = res.data

    // Store auth data
    localStorage.setItem('authToken', token)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', user.role)
    localStorage.setItem('userName', user.nama)
    localStorage.setItem('userId', user.id)

    return res.data
  },

  async getProfile() {
    const res = await api.get('/auth/me')
    return res.data.user
  },

  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.href = '/login'
  },

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true' && !!localStorage.getItem('authToken')
  },

  getUserRole() {
    return localStorage.getItem('userRole') || 'petugas'
  },

  getUserName() {
    return localStorage.getItem('userName') || ''
  },

  getSessionId() {
    let sid = localStorage.getItem('forumSessionId')
    if (!sid) {
      sid = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9)
      localStorage.setItem('forumSessionId', sid)
    }
    return sid
  },

  /**
   * Check if the app is running in demo mode (no real backend).
   * Returns true when the stored auth token is a demo token.
   */
  isDemoMode() {
    const token = localStorage.getItem('authToken')
    return token && token.startsWith('demo-token')
  }
}
