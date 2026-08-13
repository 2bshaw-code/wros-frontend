import api from './api'

export const whatsappService = {
  getConversation: (customerId) => api.get(`/whatsapp/messages/${customerId}`),
  send: (customerId, text, templateId = null) => api.post('/whatsapp/send', { customerId, text, templateId }),
  createTemplate: (data) => api.post('/whatsapp/templates', data),
  listTemplates: () => api.get('/whatsapp/templates'),
  scheduleBroadcast: (templateId, segment, scheduledAt = null) =>
    api.post('/whatsapp/broadcasts', { templateId, segment, scheduledAt }),
  aiReply: (text, customerName) => api.post('/whatsapp/ai-reply', { text, customerName })
}
