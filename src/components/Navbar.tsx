import { Moon, Sun } from 'lucide-react'
import { useConsoleStore } from '../store/consoleStore'
import logo from '/wros-logo.svg'

export default function Navbar() {
  const { user, darkMode, toggleTheme } = useConsoleStore()
  return <header className="flex h-20 items-center justify-between border-b border-[#EDEDED] bg-white px-5 dark:border-[#263238] dark:bg-[#202C33] md:px-8"><div className="flex items-center gap-3"><img src={logo} alt="WROS" className="h-12 w-12 object-contain md:hidden" /><div><p className="font-semibold">WROS Console</p><p className="text-xs text-gray-500 dark:text-gray-300">{user?.email || 'Authenticated workspace'}</p></div></div><button type="button" onClick={toggleTheme} className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-[#F5F6F7] dark:text-gray-200 dark:hover:bg-[#2A3942]" aria-label="Toggle theme">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button></header>
}