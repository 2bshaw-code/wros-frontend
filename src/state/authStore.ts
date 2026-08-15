import { create } from 'zustand'
import type { ConsoleUser } from '../types/console'
import api from '../api/axiosClient'

interface AuthState {
  token: string | null
  user: ConsoleUser | null
  isAuthenticated: boolean
  loading: boolean
  login: (token: string, user?: ConsoleUser | null) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null') as ConsoleUser | null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  loading: false,
  login: (token, user = null) => {
    localStorage.setItem('token', token)
    if (user) localStorage.setItem('user', JSON.stringify(user))
    set({ token, user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null, isAuthenticated: false })
  },
  loadUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ isAuthenticated: false })
      return
    }
    set({ loading: true })
    try {
      const response = await api.get<{ data: ConsoleUser }>('/auth/me')
      localStorage.setItem('user', JSON.stringify(response.data.data))
      set({ user: response.data.data, isAuthenticated: true })
    } catch {
      set((state) => ({
        token: state.token || token,
        user: state.user,
        isAuthenticated: Boolean(state.token || token),
      }))
    } finally {
      set({ loading: false })
    }
  },
}))