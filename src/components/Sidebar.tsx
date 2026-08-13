import { NavLink } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const navItems = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/crm', icon: '👥', label: 'CRM' },
  { to: '/docs', icon: '📄', label: 'Docs' },
  { to: '/legal', icon: '⚖️', label: 'Legal' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open }: SidebarProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-logo">WROS Console</div>
      <nav className="sidebar-nav">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user" title={user.email}>
            {user.name || user.email}
          </div>
        )}
        <button className="btn-logout" onClick={logout}>
          Sign out
        </button>
      </div>
    </aside>
  )
}
