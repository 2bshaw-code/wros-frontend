import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const readTheme = () => localStorage.getItem('wros_theme') === 'dark'

export default function ThemeToggle({ dark: controlledDark, onToggle }: { dark?: boolean; onToggle?: () => void }) {
  const [localDark, setLocalDark] = useState(readTheme)
  const dark = controlledDark ?? localDark

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('wros_theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => {
    if (onToggle) onToggle()
    else setLocalDark((value) => !value)
  }

  return <button type="button" onClick={toggle} className="grid h-10 w-10 place-items-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm dark:border-[#3A4A50] dark:bg-[#202C33] dark:text-white" aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
}
