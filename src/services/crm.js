import api from './api'

export const crmService = {
  getCustomerProfile: (customerId) => api.get(`/crm/customers/${customerId}`),
  updateCustomerProfile: (customerId, data) => api.put(`/crm/customers/${customerId}`, data),
  getSegments: () => api.get('/crm/segments'),
}