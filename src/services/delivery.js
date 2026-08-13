import api from './api'

export const deliveryService = {
  getEntitlements: () => api.get('/delivery'),
  getOperators: () => api.get('/delivery/operators'),
  addOperator: (data) => api.post('/delivery/operators', data),
  getZones: () => api.get('/delivery/zones'),
  addZone: (data) => api.post('/delivery/zones', data),
  assignRider: (data) => api.post('/delivery/assign', data),
  updateStatus: (data) => api.post('/delivery/update-status', data),
  getTimeline: (orderId) => api.get(`/delivery/timeline/${orderId}`),
  markPickup: (data) => api.post('/delivery/pickup', data),
  getAnalytics: () => api.get('/delivery/analytics'),
}