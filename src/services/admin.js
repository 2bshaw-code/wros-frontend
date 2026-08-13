import api from './api'

export const adminService = {
  getOverview: () => api.get('/admin/overview'),
  getProducts: (page = 1, limit = 20) => api.get('/admin/products', { params: { page, limit } }),
  getOrders: (page = 1, limit = 20) => api.get('/admin/orders', { params: { page, limit } }),
  getCustomers: (page = 1, limit = 20) => api.get('/admin/customers', { params: { page, limit } })
}
