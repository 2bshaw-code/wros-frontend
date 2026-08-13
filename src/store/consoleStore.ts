import { create } from 'zustand'
import type { ConsoleUser } from '../types/console'

interface ConsoleState {
  user: ConsoleUser | null
  token: string | null
  darkMode: boolean
  hydrate: () => void
  setSession: (user: ConsoleUser, token: string) => void
  logout: () => void
  toggleTheme: () => void
}

const readDarkMode = () => localStorage.getItem('wros_theme') === 'dark'

export const useConsoleStore = create<ConsoleState>((set) => ({
  user: null,
  token: null,
  darkMode: false,
  hydrate: () => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const user = storedUser ? JSON.parse(storedUser) as ConsoleUser : null
    const darkMode = readDarkMode()
    document.documentElement.classList.toggle('dark', darkMode)
    set({ user, token, darkMode })
  },
  setSession: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('wros_console_session')
    set({ user: null, token: null })
  },
  toggleTheme: () => set((state) => {
    const darkMode = !state.darkMode
    localStorage.setItem('wros_theme', darkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', darkMode)
    return { darkMode }
  }),
}))