import axiosClient from './axiosClient'

export const founderApi = {
  overview: () => axiosClient.get('/founder/health/overview'),
  system: () => axiosClient.get('/founder/health/system'),
  config: () => axiosClient.get('/founder/health/config'),
  logs: () => axiosClient.get('/founder/logs'),
  bobAsk: (prompt: string) => axiosClient.post('/founder/bob/ask', { prompt }),
  action: (name: string) => axiosClient.post(`/founder/actions/${name}`),
}