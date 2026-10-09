import logo from '../../assets/images/logo.svg'

// Shared frame for the login, forgot-password and reset-password pages
export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <img className="auth-logo" src={logo} alt="Sahajanand Infotech" />

      <div className="auth-card">
        <h1>{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}

        {children}
      </div>
    </div>
  )
}
