import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthShell from './AuthShell'
import { login, useAuth } from '../../services/auth'

// Only send people back to an admin page of this app
const safeDestination = (from) =>
  typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') && !from.startsWith('/login')
    ? from
    : '/careers'

export default function Login() {
  const authed = useAuth()
  const location = useLocation()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Logged in (just now, or already): go to the page they asked for, otherwise the dashboard
  if (authed) {
    return <Navigate to={safeDestination(location.state?.from)} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitting) return

    // Read what is actually in the boxes: browser autofill and password managers can fill them
    // without React being told, so the form's own values are the reliable source.
    const values = new FormData(event.currentTarget)
    const email = String(values.get('email') || '').trim()
    const password = String(values.get('password') || '')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const result = await login(email, password)

      if (!result.ok) setError(result.message)
    } catch (err) {
      console.error('Login failed:', err)
      setError('Unable to reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Admin Login" subtitle="Sign in to manage the Sahajanand website.">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="auth-message auth-message--error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="save-btn auth-submit" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </button>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </AuthShell>
  )
}
