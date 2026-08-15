import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BobChat } from './BobChat.jsx'
import { useAuthStore } from '../state/authStore'

const OPEN_BOB_EVENT = 'wros:open-bob'

export const openBobModal = () => window.dispatchEvent(new Event(OPEN_BOB_EVENT))

export default function BobLauncher() {
  const [bobOpen, setBobOpen] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { pathname } = useLocation()

  useEffect(() => {
    const open = () => setBobOpen(true)
    window.addEventListener(OPEN_BOB_EVENT, open)
    return () => window.removeEventListener(OPEN_BOB_EVENT, open)
  }, [])

  if (!isAuthenticated || (!pathname.startsWith('/console') && !pathname.startsWith('/founder'))) return null

  return (
    <>
      {bobOpen && <BobChat onClose={() => setBobOpen(false)} />}
      <button type="button" onClick={openBobModal} className="bob-fab bg-[#0FA958] text-white" aria-label="Open BOB assistant">
        <img src="/console/bob-logo.svg" alt="B" className="h-6 w-6" />
      </button>
    </>
  )
}
