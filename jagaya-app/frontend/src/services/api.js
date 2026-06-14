import axios from 'axios'

/**
 * Axios instance configured for the Jagaya API (Laragon backend).
 * Uses proxy in dev mode, or VITE_API_URL in production (Vercel).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handle 401 (only from real server responses)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 from actual server responses, NOT network errors
    if (error.response && error.response.status === 401) {
      // Token expired or invalid - clear auth and redirect
      localStorage.removeItem('authToken')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
