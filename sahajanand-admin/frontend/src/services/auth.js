import { useSyncExternalStore } from 'react'
import { API_URL } from './api'

const TOKEN_KEY = 'sahajanand-admin-token'
const CHANGE_EVENT = 'sahajanand-admin-auth-changed'

const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT))

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
  notify()
}

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // storage unavailable: nothing to clear
  }

  notify()
}

// The server is the real gatekeeper; this only avoids showing admin screens with a missing or expired token
const readExpiry = (token) => {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')

    return JSON.parse(atob(payload)).exp * 1000
  } catch {
    return 0
  }
}

export const isAuthenticated = () => {
  const token = getToken()

  return Boolean(token) && readExpiry(token) > Date.now()
}

// Re-render when the token changes here, in another tab, or when a page is restored from the back/forward cache
const subscribe = (callback) => {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  window.addEventListener('pageshow', callback)

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
    window.removeEventListener('pageshow', callback)
  }
}

export const useAuth = () => useSyncExternalStore(subscribe, isAuthenticated)

// fetch() for admin-only requests: sends the login token. If the server no longer accepts it the
// session is cleared (the app then returns to the login page) and the stale request never resolves.
export const authFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${getToken()}` },
  })

  if (response.status === 401) {
    clearToken()

    return new Promise(() => {})
  }

  return response
}

const post = async (path, body) => {
  const response = await fetch(`${API_URL}/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => null)

  return { ok: response.ok && Boolean(data?.success), data }
}

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json().catch(() => null)
  const ok = response.ok && Boolean(data?.success)

  if (ok) {
    setToken(data.token)
    return { ok: true }
  }

  // Other projects on this machine also use port 5000 and have their own /api/auth/login.
  // Every response from this project's backend carries X-Service, so a rejection without it is not ours.
  if (response.headers.get('X-Service') !== 'sahajanand-admin') {
    return {
      ok: false,
      message: `The server at ${API_URL} is not the Sahajanand backend (another project may be using this port, or the Sahajanand backend needs a restart). Stop the other server, then start the Sahajanand backend.`,
    }
  }

  return { ok: false, message: data?.message || 'Unable to log in right now' }
}

export const requestPasswordReset = (email) => post('forgot-password', { email })

export const resetPassword = (token, password) => post('reset-password', { token, password })
