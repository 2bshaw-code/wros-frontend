import { useEffect } from 'react'
import { stabilizeInitialRoute, writeStabilityLog } from './linkStability'

export default function HydrationStabilizer() {
  useEffect(() => {
    sessionStorage.removeItem('wros_lsl_route_cache')
    sessionStorage.removeItem('wros_lsl_pending_route')
    const route = stabilizeInitialRoute(window.location.pathname)
    const lastRoute = sessionStorage.getItem('wros_lsl_hydrated_route')
    if (lastRoute !== route) {
      sessionStorage.setItem('wros_lsl_hydrated_route', route)
      writeStabilityLog('hydration-ready', 'Router and Vite base paths validated during hydration', route)
    }
  }, [])
  return null
}