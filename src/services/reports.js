import api from './api'

export const reportService = {
  getSalesTrend: (startDate = '', endDate = '') =>
    api.get('/reports/sales-trend', { params: { startDate, endDate } }),

  getTopProducts: (startDate = '', endDate = '', limit = 5) =>
    api.get('/reports/top-products', { params: { startDate, endDate, limit } }),

  getCustomerSegments: () =>
    api.get('/reports/customer-segments'),

  getInventoryMovement: (startDate = '', endDate = '') =>
    api.get('/reports/inventory-movement', { params: { startDate, endDate } }),

  getSummary: (startDate = '', endDate = '') =>
    api.get('/reports/summary', { params: { startDate, endDate } })
}
