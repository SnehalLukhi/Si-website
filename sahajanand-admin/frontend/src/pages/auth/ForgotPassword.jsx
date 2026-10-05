import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from './AuthShell'
import { requestPasswordReset } from '../../services/auth'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitting) return

    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your admin email.' })
      return
    }

    setSubmitting(true)
    setStatus(null)

    try {
      const { ok, data } = await requestPasswordReset(email.trim())

      setStatus({
        type: ok ? 'success' : 'error',
        message: data?.message || 'Unable to process the request. Please try again.',
      })
    } catch (err) {
      console.error('Password reset request failed:', err)
      setStatus({ type: 'error', message: 'Unable to reach the server. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your admin email and we will send you a link to reset your password."
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
          />
        </div>

        {status && (
          <p
            className={`auth-message auth-message--${status.type}`}
            role={status.type === 'error' ? 'alert' : 'status'}
          >
            {status.message}
          </p>
        )}

        <button type="submit" className="save-btn auth-submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </AuthShell>
  )
}
