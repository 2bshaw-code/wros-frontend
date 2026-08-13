import api from './api'

export const productService = {
  getAll: (page = 1, limit = 20, category = '', minPrice = 0, maxPrice = 999999) =>
    api.get('/products', {
      params: { page, limit, category, minPrice, maxPrice }
    }),
  
  getById: (id) =>
    api.get(`/products/${id}`),
  
  create: (data) =>
    api.post('/products', data),
  
  update: (id, data) =>
    api.put(`/products/${id}`, data),
  
  delete: (id) =>
    api.delete(`/products/${id}`),
  
  search: (query) =>
    api.get('/products', { params: { search: query } })
}
