import api from './api'

export const billingService = {
  listPlans: () => api.get('/billing/plans'),
  createCustomer: (data) => api.post('/billing/create-customer', data),
  createSubscription: (data) => api.post('/billing/create-subscription', data),
  updateBusiness: (data) => api.put('/billing/update-business', data),
  generateInvoice: (businessId, period) => api.post('/billing/generate-invoice', { businessId, period }),
  listInvoices: (businessId) => api.get('/billing/invoices', { params: { businessId } }),
  issueLicense: (businessId) => api.post('/billing/license/issue', { businessId })
}
