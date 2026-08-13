import { useState } from 'react'
import useAuthStore from '../store/authStore'

export default function SettingsPage() {
  const theme = useAuthStore((s) => s.theme)
  const toggleTheme = useAuthStore((s) => s.toggleTheme)
  const user = useAuthStore((s) => s.user)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="settings-section">
      <h2 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Account</h2>

      <div className="settings-row" style={{ marginBottom: '1.5rem' }}>
        <div className="settings-row-info">
          <h3>{user?.name ?? '—'}</h3>
          <p>{user?.email ?? '—'}</p>
        </div>
      </div>

      <h2 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Preferences</h2>

      <div className="settings-row">
        <div className="settings-row-info">
          <h3>Dark mode</h3>
          <p>Switch between light and dark theme</p>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <span className="toggle-slider" />
        </label>
      </div>

      <div className="settings-row">
        <div className="settings-row-info">
          <h3>Email notifications</h3>
          <p>Receive updates and alerts by email</p>
        </div>
        <label className="toggle">
        <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} aria-label="Toggle email notifications" />
          <span className="toggle-slider" />
        </label>
      </div>

      <div className="settings-row">
        <div className="settings-row-info">
          <h3>Two-factor authentication</h3>
          <p>Add an extra layer of security to your account</p>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} aria-label="Toggle two-factor authentication" />
          <span className="toggle-slider" />
        </label>
      </div>

      <h2 style={{ margin: '1.5rem 0 1.25rem', fontSize: '1.1rem' }}>Danger Zone</h2>

      <div className="settings-row">
        <div className="settings-row-info">
          <h3>Delete account</h3>
          <p>Permanently delete your account and all data</p>
        </div>
        <button
          style={{
            padding: '0.45rem 0.9rem',
            background: 'rgba(239,68,68,0.12)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
