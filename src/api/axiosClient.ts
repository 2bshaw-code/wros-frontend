import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null') as { tenantId?: string; businessId?: string } | null
  if (token) config.headers.Authorization = `Bearer ${token}`
  const tenantId = user?.tenantId || user?.businessId
  if (tenantId) config.headers['X-WROS-Tenant'] = tenantId
  return config
})

axiosClient.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    if (!window.location.pathname.endsWith('/login')) window.location.assign('/console/login')
  }
  return Promise.reject(error)
})

export default axiosClient