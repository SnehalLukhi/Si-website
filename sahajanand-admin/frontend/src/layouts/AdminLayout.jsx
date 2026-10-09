import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppsIcon, BlogIcon, BotIcon, BriefcaseIcon, LogoutIcon, MailIcon } from '../components/Icons'
import { clearToken } from '../services/auth'
import { fetchCounts, onCountsChanged } from '../services/counts'
import logo from '../assets/images/logo.svg'

const NAV_ITEMS = [
  { to: '/careers', label: 'Jobs', Icon: BriefcaseIcon },
  { to: '/products', label: 'Products', Icon: AppsIcon },
  { to: '/blogs', label: 'Blogs', Icon: BlogIcon },
  { to: '/ai-lab', label: 'AI Lab', Icon: BotIcon },
  { to: '/job-applications', label: 'Job Applications', Icon: BriefcaseIcon, countKey: 'jobApplications' },
  { to: '/contact-inquiries', label: 'Contact Us Inquiries', Icon: MailIcon, countKey: 'contactInquiries' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [counts, setCounts] = useState(null)

  // Counts come from the database; they reload when the page changes and after a delete
  useEffect(() => {
    let cancelled = false
    const load = () =>
      fetchCounts().then((next) => {
        if (!cancelled && next) setCounts(next)
      })

    load()

    const stop = onCountsChanged(load)

    return () => {
      cancelled = true
      stop()
    }
  }, [pathname])

  // Leave the dashboard first (replacing this history entry), then drop the login
  const handleLogout = () => {
    navigate('/login', { replace: true })
    clearToken()
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img className="admin-brand-logo" src={logo} alt="Sahajanand Infotech" />
        </div>

        <nav className="admin-nav">
          <div className="nav-label">MANAGEMENT</div>

          {NAV_ITEMS.map(({ to, label, Icon, countKey }) => (
            <NavLink key={to} to={to}>
              <Icon className="nav-icon" />
              {label}
              {countKey && counts && <span className="nav-count">{counts[countKey]}</span>}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="admin-logout" onClick={handleLogout}>
          <LogoutIcon className="logout-icon" />
          Logout
        </button>

        <div className="admin-sidebar-footer">
          <span className="online-dot" />
          <div>
            <strong>Sahajanand Infotech</strong>
            <span>Website content manager</span>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
