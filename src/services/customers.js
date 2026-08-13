import api from './api'

export const customerService = {
  getAll: (page = 1, limit = 20, search = '') =>
    api.get('/customers', {
      params: { page, limit, search }
    }),

  getById: (id) =>
    api.get(`/customers/${id}`),

  create: (data) =>
    api.post('/customers', data),

  update: (id, data) =>
    api.put(`/customers/${id}`, data)
}
