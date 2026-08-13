import api from './api'

export const invoiceService = {
  generate: (data) => api.post('/invoices/generate', data),
  send: (invoiceId) => api.post('/invoices/send', { invoice_id: invoiceId }),
  getById: (invoiceId) => api.get(`/invoices/${invoiceId}`),
  getByCustomer: (customerId) => api.get(`/invoices/customer/${customerId}`),
}