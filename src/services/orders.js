import api from './api'

export const orderService = {
  getAll: (page = 1, limit = 20, status = '', search = '') =>
    api.get('/orders', {
      params: { page, limit, status, search }
    }),
  
  getById: (id) =>
    api.get(`/orders/${id}`),
  
  getByCustomer: (customerId, page = 1, limit = 20) =>
    api.get('/orders', {
      params: { customerId, page, limit }
    }),
  
  create: (data) =>
    api.post('/orders', data),
  
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, { status }),

  updateStatusForMerchant: (orderId, status) =>
    api.post('/orders/update-status', { order_id: orderId, status }),

  assignDelivery: (orderId, operatorId, fleetId = '', detail = '') =>
    api.post('/orders/assign-delivery', { order_id: orderId, operator_id: operatorId, fleet_id: fleetId, detail })
}
