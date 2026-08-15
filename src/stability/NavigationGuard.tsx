import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isStablePath, normalizePath, writeStabilityLog } from './linkStability'

export default function NavigationGuard() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') return
    if (isStablePath(location.pathname)) return
    const repaired = normalizePath(location.pathname, location.pathname)
    writeStabilityLog('invalid-navigation', 'Navigation guard repaired an invalid route', location.pathname)
    navigate(repaired, { replace: true })
  }, [location.pathname, navigate])
  return null
}