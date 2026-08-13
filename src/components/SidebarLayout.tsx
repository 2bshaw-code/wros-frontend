import { NavLink, Outlet } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'CRM', to: '/crm' },
  { label: 'Docs', to: '/docs' },
  { label: 'Legal', to: '/legal' },
  { label: 'Settings', to: '/settings' },
]

export default function SidebarLayout() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h1 className="brand">WROS Console</h1>
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
