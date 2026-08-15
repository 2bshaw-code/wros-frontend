import type { LinkProps } from 'react-router-dom'
import { Link, NavLink, type NavLinkProps, useLocation } from 'react-router-dom'
import { normalizePath, writeStabilityLog } from './linkStability'

export default function StableLink({ to, ...props }: LinkProps) {
  const location = useLocation()
  const normalized = normalizePath(String(to), location.pathname)
  return <Link to={normalized} {...props} />
}

export function StableNavLink({ to, ...props }: NavLinkProps) {
  const location = useLocation()
  const normalized = normalizePath(String(to), location.pathname)
  return <NavLink to={normalized} {...props} />
}

export { writeStabilityLog }