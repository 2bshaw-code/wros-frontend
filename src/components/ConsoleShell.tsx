import type { PropsWithChildren } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, LayoutDashboard, LogOut, Moon, Settings, ShieldCheck, Sun, Users } from 'lucide-react'
import { useConsoleStore } from '../store/consoleStore'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/crm', label: 'CRM', icon: Users },
  { to: '/docs', label: 'Docs', icon: BookOpen },
  { to: '/legal', label: 'Legal', icon: ShieldCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function ConsoleShell({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const { user, darkMode, toggleTheme, logout } = useConsoleStore()
  const signOut = () => { logout(); navigate('/login') }

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1C1E21] transition-colors dark:bg-[#111B21] dark:text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#E4E6EB] bg-white dark:border-[#263238] dark:bg-[#202C33] md:block">
        <div className="flex h-20 items-center gap-3 border-b border-[#E4E6EB] px-6 dark:border-[#263238]">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0FA958] font-bold text-white">W</div>
          <div><p className="font-bold">WROS</p><p className="text-xs text-gray-500 dark:text-gray-400">Retail OS</p></div>
        </div>
        <nav className="space-y-1 p-4" aria-label="Console navigation">
          {links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive ? 'bg-[#0FA958] text-white' : 'text-gray-700 hover:bg-[#F5F6F7] dark:text-gray-200 dark:hover:bg-[#2A3942]'}`}><Icon size={18} />{label}</NavLink>)}
        </nav>
      </aside>
      <main className="md:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-[#E4E6EB] bg-white px-5 dark:border-[#263238] dark:bg-[#202C33] md:px-8">
          <div><p className="text-sm font-semibold">Merchant console</p><p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'WROS operator'}</p></div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#2A3942]" aria-label="Toggle theme">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button type="button" onClick={signOut} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#2A3942]"><LogOut size={17} />Logout</button>
          </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-[#E4E6EB] bg-white px-3 py-2 md:hidden dark:border-[#263238] dark:bg-[#202C33]" aria-label="Mobile console navigation">
          {links.map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium ${isActive ? 'bg-[#0FA958] text-white' : 'text-gray-600 dark:text-gray-200'}`}>{label}</NavLink>)}
        </nav>
        <section className="p-5 md:p-8">{children}</section>
      </main>
    </div>
  )
}