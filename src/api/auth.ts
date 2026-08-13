import axiosClient from './axiosClient'
import type { ConsoleUser } from '../types/console'

export interface AuthResponse { token: string; user: ConsoleUser }

export const login = (email: string, password: string) => axiosClient.post<{ data: AuthResponse }>('/auth/login', { email, password })
export const register = (email: string, password: string) => axiosClient.post<{ data: AuthResponse }>('/auth/register', { email, password })
export const getCurrentUser = () => axiosClient.get<{ data: ConsoleUser }>('/auth/me')