import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

export default function SettingsPage() {
  const navigate = useNavigate()
  const user = useAppStore((state) => state.user)
  const updateProfile = useAppStore((state) => state.updateProfile)
  const logout = useAppStore((state) => state.logout)
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [savedMessage, setSavedMessage] = useState('')

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateProfile({ name, email })
    setSavedMessage('Profile updated locally.')
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <section>
      <h2>Settings</h2>
      <p className="page-intro">Manage your profile and session preferences.</p>

      <form className="settings-card" onSubmit={handleSave}>
        <label htmlFor="settings-name">Name</label>
        <input
          id="settings-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="settings-email">Email</label>
        <input
          id="settings-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <button type="submit">Save Profile</button>
        {savedMessage ? <p>{savedMessage}</p> : null}
      </form>

      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  )
}
