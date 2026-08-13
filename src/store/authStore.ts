import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiClient from '../api/client'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  token: string | null
  user: User | null
  theme: 'light' | 'dark'
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  toggleTheme: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      theme: 'light',
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await apiClient.post<{ token: string; user: User }>('/auth/login', {
          email,
          password,
        })
        localStorage.setItem('wros_token', data.token)
        set({ token: data.token, user: data.user, isAuthenticated: true })
      },

      register: async (name, email, password) => {
        const { data } = await apiClient.post<{ token: string; user: User }>('/auth/register', {
          name,
          email,
          password,
        })
        localStorage.setItem('wros_token', data.token)
        set({ token: data.token, user: data.user, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem('wros_token')
        set({ token: null, user: null, isAuthenticated: false })
      },

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'wros-auth' },
  ),
)

export default useAuthStore
