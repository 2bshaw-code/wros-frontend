import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client'
import { useAppStore, type UserProfile } from '../store/useAppStore'

interface RegisterResponse {
  token?: string
  accessToken?: string
  user?: UserProfile
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const setAuth = useAppStore((state) => state.setAuth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data } = await apiClient.post<RegisterResponse>('/auth/register', {
        name,
        email,
        password,
      })

      const token = data.token ?? data.accessToken
      if (!token) {
        throw new Error('Token was not returned by the API.')
      }

      setAuth(token, data.user ?? { name, email })
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Unable to register. Please verify your details and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Register for WROS Console access.</p>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Register'}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
