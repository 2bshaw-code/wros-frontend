import axiosClient from './axiosClient'

type QuantumPayload = Record<string, unknown>

const executeQuantum = (operation: 'forecast' | 'optimise' | 'anomaly' | 'security', payload: QuantumPayload = {}) =>
  axiosClient.post(`/quantum/${operation}`, payload)

export const useQuantumForecasting = (payload: QuantumPayload = {}) => executeQuantum('forecast', payload)
export const useQuantumOptimisation = (payload: QuantumPayload = {}) => executeQuantum('optimise', payload)
export const useQuantumAnomalies = (payload: QuantumPayload = {}) => executeQuantum('anomaly', payload)
export const useQuantumSecurity = (payload: QuantumPayload = {}) => executeQuantum('security', payload)