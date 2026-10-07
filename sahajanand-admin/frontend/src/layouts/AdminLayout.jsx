import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AppsIcon, BlogIcon, BotIcon, BriefcaseIcon, LogoutIcon, MailIcon } from '../components/Icons'
import { clearToken } from '../services/auth'
import logo from '../aseets/images/logo.png'

const NAV_ITEMS = [
  { to: '/careers', label: 'Jobs', Icon: BriefcaseIcon },
  { to: '/products', label: 'Products', Icon: AppsIcon },
  { to: '/blogs', label: 'Blogs', Icon: BlogIcon },
  { to: '/ai-lab', label: 'AI Lab', Icon: BotIcon },
  { to: '/contact-inquiries', label: 'Contact Inquiries', Icon: MailIcon },
]

export default function AdminLayout() {
  const navigate = useNavigate()

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

          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to}>
              <Icon className="nav-icon" />
              {label}
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
