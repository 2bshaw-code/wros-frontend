import { useLocation, useNavigate, type NavigateOptions } from 'react-router-dom'
import { normalizePath, writeStabilityLog } from './linkStability'

export const useStableNavigate = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (target: string, options?: NavigateOptions) => {
    const normalized = normalizePath(target, location.pathname)
    if (normalized !== target) writeStabilityLog('navigation-normalized', 'Navigation target was normalized', target)
    return navigate(normalized, options)
  }
}