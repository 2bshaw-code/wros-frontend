import axios from 'axios'
import { useAppStore } from '../store/useAppStore'

const fallbackApiUrl = 'https://api.wros.co.uk/api'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? fallbackApiUrl,
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
