import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client'
import { useAppStore, type UserProfile } from '../store/useAppStore'

interface AuthResponse {
  token?: string
  accessToken?: string
  user?: UserProfile
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAppStore((state) => state.setAuth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      })

      const token = data.token ?? data.accessToken
      if (!token) {
        throw new Error('Token was not returned by the API.')
      }

      const fallbackUser = { name: email.split('@')[0] ?? 'User', email }
      setAuth(token, data.user ?? fallbackUser)
      navigate(from ?? '/dashboard', { replace: true })
    } catch {
      setError('Unable to log in. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <p>Access your WROS Console account.</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Login'}
        </button>

        <p className="auth-footer">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}
