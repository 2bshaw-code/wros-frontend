import { useAuthStore } from '../state/authStore'
import ThemeToggle from './ThemeToggle.tsx'
import logo from '/wros-logo.svg'

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const role = user?.operatorRole || user?.role || 'merchant'
  return <header className="flex min-h-20 items-center justify-between gap-4 border-b border-[#EDEDED] bg-white px-5 py-3 dark:border-[#263238] dark:bg-[#202C33] md:px-8"><div className="flex items-center gap-3"><img src={logo} alt="WROS" className="h-12 w-12 object-contain md:hidden" /><div><p className="font-semibold">WROS Merchant Console</p><p className="text-xs text-gray-500 dark:text-gray-300">{user?.email || 'Authenticated workspace'}</p></div></div><div className="flex items-center gap-2"><span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-xs font-bold text-[#0C8A48]">{role}</span><ThemeToggle/><a href="/" className="hidden rounded-lg border px-3 py-2 text-sm font-semibold dark:border-[#3A4A50] sm:block">Return to Website</a></div></header>
}