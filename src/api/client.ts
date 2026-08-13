import axios from 'axios'
import { useAppStore } from '../store/useAppStore'

const apiBaseUrl = import.meta.env.VITE_API_URL

if (!apiBaseUrl) {
  throw new Error('VITE_API_URL must be configured.')
}

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = useAppStore.getState().token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAppStore.getState().logout()
    }
    return Promise.reject(error)
  },
)
