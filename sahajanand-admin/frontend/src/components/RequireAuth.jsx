import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../services/auth'

// Every admin page sits behind this: no valid login -> straight to the login page
export default function RequireAuth() {
  const authed = useAuth()
  const location = useLocation()

  return authed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  )
}
