import axiosClient from './axiosClient'

export type FoundItPlatform = { id: number; name: string; base_url: string; scrape_method: string; active: boolean; config: Record<string, unknown> }
export type FoundItMerchant = { id: number; name: string; platform: string; url: string; contact_info: Record<string, unknown>; location?: string; last_seen: string }
export type FoundItListing = { id: number; merchant_id: number; merchant_name: string; platform: string; title: string; description?: string; category?: string; images: string[]; url: string; collection_location?: string; scraped_at: string; status: string }
export type FoundItRun = { id: number; platform_name?: string; status: string; listings_seen: number; listings_saved: number; error?: string; started_at: string; finished_at?: string }
type ApiEnvelope<T> = { success: true; data: T }

export const foundItApi = {
  status: () => axiosClient.get('/foundit/status'),
  platforms: () => axiosClient.get<ApiEnvelope<FoundItPlatform[]>>('/foundit/platforms'),
  merchants: () => axiosClient.get<ApiEnvelope<FoundItMerchant[]>>('/foundit/merchants'),
  listings: () => axiosClient.get<ApiEnvelope<FoundItListing[]>>('/foundit/listings'),
  runs: () => axiosClient.get<ApiEnvelope<FoundItRun[]>>('/foundit/runs'),
  migrate: () => axiosClient.post('/foundit/migrate'),
  run: (platformId?: number) => axiosClient.post('/foundit/scrape/run', { platformId }),
  addPlatform: (payload: Record<string, unknown>) => axiosClient.post('/foundit/platforms/add', payload),
  updatePlatform: (id: number, payload: Record<string, unknown>) => axiosClient.patch(`/foundit/platforms/${id}`, payload),
  addMerchant: (payload: Record<string, unknown>) => axiosClient.post('/foundit/merchants', payload),
  exportMerchant: (id: number) => axiosClient.post(`/foundit/merchants/${id}/export`),
  addListing: (payload: Record<string, unknown>) => axiosClient.post('/foundit/listings', payload),
  updateListing: (id: number, payload: Record<string, unknown>) => axiosClient.patch(`/foundit/listings/${id}`, payload),
  exportListing: (id: number) => axiosClient.post(`/foundit/listings/${id}/export`),
}