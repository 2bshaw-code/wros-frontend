import axios from 'axios'
import type { ApiEnvelope, Customer } from '../types/console'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (user) {
    const parsed = JSON.parse(user) as { tenantId?: string; businessId?: string }
    const tenantId = parsed.tenantId || parsed.businessId
    if (tenantId) config.headers['X-WROS-Tenant'] = tenantId
  }
  return config
})

export const fetchCustomers = async () => {
  const response = await api.get<ApiEnvelope<Customer[]>>('/customers', { params: { page: 1, limit: 25 } })
  return response.data.data || []
}