import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const tenantId = JSON.parse(user).tenantId || JSON.parse(user).businessId
        if (tenantId) config.headers['X-WROS-Tenant'] = tenantId
      } catch {
        // Invalid local session data is handled by the normal authentication flow.
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshRequest

const clearSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/console/login'
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const isAuthRequest = ['/auth/login', '/auth/register', '/auth/refresh'].includes(originalRequest?.url)

    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthRequest) {
      originalRequest._retry = true
      try {
        refreshRequest ||= api.post('/auth/refresh', {}, { _retry: true })
        const response = await refreshRequest
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`
        return api(originalRequest)
      } catch (refreshError) {
        clearSession()
        return Promise.reject(refreshError)
      } finally {
        refreshRequest = undefined
      }
    }

    if (error.response?.status === 401 && !isAuthRequest) {
      clearSession()
    }
    return Promise.reject(error)
  }
)

export const askBob = async (prompt, userId) => {
  try {
    const response = await api.post('/ai/ask', { prompt, userId })
    return response.data.data.reply
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message || 'Unable to reach BOB')
  }
}

export const uploadBobImage = async (file, onUploadProgress) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await api.post('/ai/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => onUploadProgress?.(event.total ? Math.round((event.loaded / event.total) * 100) : 0),
    })
    return response.data.url
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message || 'Image upload failed')
  }
}

export const getBobSpeech = async (text) => {
  try {
    const response = await api.post('/ai/tts', { text })
    return response.data.data.audioUrl
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message || 'Unable to generate BOB voice')
  }
}

export default api
