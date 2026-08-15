import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Bot, Building2, LogOut, Settings, Workflow } from 'lucide-react'
import { useAuthStore } from '../state/authStore'
import ThemeToggle from '../components/ThemeToggle.tsx'

const links = [
  ['/console/owner', 'Merchants', Building2],
  ['/console/owner/onboarding', 'Onboarding', Workflow],
  ['/console/owner/analytics', 'Analytics', BarChart3],
  ['/console/owner/automation', 'Automation', Bot],
  ['/console/owner/settings', 'Settings', Settings],
] as const

export default function OwnerLayout() {
  const { user, logout } = useAuthStore()
  return <div className="min-h-screen bg-[#F4F7F5] text-[#17211B] dark:bg-[#111B21] dark:text-white"><header className="border-b border-[#DDE5E0] bg-white dark:border-[#263238] dark:bg-[#202C33]"><div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8"><div><p className="font-bold">WROS Owner Console</p><p className="text-xs text-gray-500 dark:text-gray-300">Cross-merchant operations</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-xs font-bold text-[#0C8A48]">{user?.role || 'owner'}</span><ThemeToggle/><a href="/" className="rounded-lg border px-3 py-2 text-sm font-semibold dark:border-[#3A4A50]">Return to Website</a><button type="button" onClick={logout} className="grid h-10 w-10 place-items-center rounded-lg text-red-600" aria-label="Logout"><LogOut size={18}/></button></div></div><nav className="flex gap-1 overflow-x-auto px-5 pb-3 md:px-8">{links.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/console/owner'} className={({isActive})=>`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${isActive?'bg-[#0FA958] text-white':'text-gray-600 dark:text-gray-300'}`}><Icon size={17}/>{label}</NavLink>)}</nav></header><main className="p-5 md:p-8"><Outlet/></main></div>
}
