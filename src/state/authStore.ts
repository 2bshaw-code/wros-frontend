import { create } from 'zustand'
import type { ConsoleUser } from '../types/console'
import api from '../api/axiosClient'

interface AuthState {
  token: string | null
  user: ConsoleUser | null
  loading: boolean
  login: (token: string, user?: ConsoleUser | null) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null') as ConsoleUser | null,
  loading: false,
  login: (token, user = null) => {
    localStorage.setItem('token', token)
    if (user) localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },
  loadUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    set({ loading: true })
    try {
      const response = await api.get<{ data: ConsoleUser }>('/auth/me')
      localStorage.setItem('user', JSON.stringify(response.data.data))
      set({ user: response.data.data })
    } catch {
      set({ token: null, user: null })
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      set({ loading: false })
    }
  },
}))