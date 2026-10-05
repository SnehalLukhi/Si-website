import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AuthShell from './AuthShell'
import { resetPassword } from '../../services/auth'

const passwordProblem = (password) =>
  password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)
    ? 'Password must be at least 8 characters and include a letter and a number.'
    : ''

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const done = status?.type === 'success'

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitting) return

    const problem = passwordProblem(password)

    if (problem) {
      setStatus({ type: 'error', message: problem })
      return
    }

    if (password !== confirm) {
      setStatus({ type: 'error', message: 'The two passwords do not match.' })
      return
    }

    setSubmitting(true)
    setStatus(null)

    try {
      const { ok, data } = await resetPassword(token, password)

      setStatus({
        type: ok ? 'success' : 'error',
        message: data?.message || 'Unable to reset the password. Please try again.',
      })
    } catch (err) {
      console.error('Password reset failed:', err)
      setStatus({ type: 'error', message: 'Unable to reach the server. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!token) {
    return (
      <AuthShell title="Reset Password">
        <p className="auth-message auth-message--error" role="alert">
          This reset link is incomplete. Please request a new one.
        </p>

        <div className="auth-links">
          <Link to="/forgot-password">Request a new link</Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Reset Password" subtitle="Choose a new password for the admin account.">
      {done ? (
        <>
          <p className="auth-message auth-message--success" role="status">
            {status.message}
          </p>

          <Link to="/login" className="save-btn auth-submit auth-submit--link">
            Go to Login
          </Link>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="reset-password">New Password</label>
            <input
              id="reset-password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters, with a letter and a number"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reset-confirm">Confirm New Password</label>
            <input
              id="reset-confirm"
              type="password"
              name="confirm"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              placeholder="Re-enter the new password"
              autoComplete="new-password"
            />
          </div>

          {status && (
            <p className="auth-message auth-message--error" role="alert">
              {status.message}
            </p>
          )}

          <button type="submit" className="save-btn auth-submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Reset Password'}
          </button>

          <div className="auth-links">
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
