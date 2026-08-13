import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

export interface UserProfile {
  name: string
  email: string
}

interface AppState {
  token: string | null
  user: UserProfile | null
  theme: ThemeMode
  setAuth: (token: string, user: UserProfile | null) => void
  updateProfile: (user: UserProfile) => void
  logout: () => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      theme: 'light',
      setAuth: (token, user) => set({ token, user }),
      updateProfile: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'wros-console-store',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
      }),
    },
  ),
)
