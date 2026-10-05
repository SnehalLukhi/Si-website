import { useEffect, useState } from 'react'
import logoMark from '../../assets/images/logo.png'
import logoMarkLight from '../../assets/images/logo1.png'
import { handleBlogLinkClick } from '../../utils/scrollToBlog'
import './Header.css'

const NAV_ITEMS = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Products', href: '/our-product' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact-us' },
]

const API_URL = 'http://localhost:5000'

const STICKY_THRESHOLD = 24

function Header({ homePath = '', sticky = true, compactLogoLight = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [careerJobs, setCareerJobs] = useState([])

  /* Careers dropdown lists the jobs created in the admin; links use the job's database _id */
  useEffect(() => {
    let cancelled = false

    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/jobs`)
        const data = await response.json()

        if (!response.ok || !data.success || cancelled) return

        setCareerJobs(
          (Array.isArray(data.jobs) ? data.jobs : []).map((job) => ({
            id: job._id,
            label: job.title,
            href: `/careers/job/${job._id}`,
          })),
        )
      } catch (error) {
        console.error('Failed to fetch careers dropdown jobs:', error)
      }
    }

    fetchJobs()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('resize', closeMenu)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!sticky) return undefined

    const updateHeaderScrollVar = () => {
      if (window.matchMedia('(max-width: 991px)').matches) {
        setIsPinned(false)
        document.documentElement.style.setProperty('--header-s', '0')
        return
      }

      const pinned = window.scrollY > STICKY_THRESHOLD
      setIsPinned(pinned)
      document.documentElement.style.setProperty('--header-s', pinned ? '1' : '0')
    }

    updateHeaderScrollVar()
    window.addEventListener('scroll', updateHeaderScrollVar, { passive: true })
    window.addEventListener('resize', updateHeaderScrollVar)

    return () => {
      window.removeEventListener('scroll', updateHeaderScrollVar)
      window.removeEventListener('resize', updateHeaderScrollVar)
      document.documentElement.style.removeProperty('--header-s')
    }
  }, [sticky])

  useEffect(() => {
    const closeMenuOnNarrow = () => {
      if (window.matchMedia('(max-width: 991px)').matches) {
        setMenuOpen(false)
      }
    }

    closeMenuOnNarrow()
    window.addEventListener('resize', closeMenuOnNarrow)
    return () => window.removeEventListener('resize', closeMenuOnNarrow)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="header__shell is-sticky">
      <header
        className={`header header--sticky is-sticky${
          sticky && isPinned ? ' is-pinned' : ''
        }${menuOpen ? ' is-open' : ''}`}
      >
        <a
          className="header__brand"
          href={homePath || '#home'}
          aria-label="Sahajanand Infotech"
        >
          {compactLogoLight ? (
            <picture className="header__logo-picture">
              <source media="(max-width: 991px)" srcSet={logoMarkLight} />
              <img className="header__logo" src={logoMark} alt="" />
            </picture>
          ) : (
            <img className="header__logo" src={logoMark} alt="" />
          )}
          <span className="header__brand-text">
            <span className="header__name">Sahajanand</span>
            <span className="header__tagline">
              <span className="header__rule" aria-hidden="true" />
              Infotech
              <span className="header__rule" aria-hidden="true" />
            </span>
          </span>
        </a>

        <button
          className={`header__backdrop${menuOpen ? ' is-visible' : ''}`}
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />

        <nav
          className="header__nav"
          id="primary-navigation-sticky"
          aria-label="Primary"
        >
          <div className="header__drawer-head">
            <a
              className="header__drawer-brand"
              href={homePath || '#home'}
              aria-label="Sahajanand Infotech"
              onClick={() => setMenuOpen(false)}
            >
              <img className="header__drawer-logo" src={logoMark} alt="" />
            </a>
            <button
              className="header__drawer-close"
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span className="header__drawer-close-icon" aria-hidden="true" />
            </button>
          </div>
          <ul className="header__list">
            {NAV_ITEMS.map((item) => {
              const dropdownItems =
                item.label === 'Careers' && careerJobs.length > 0
                  ? careerJobs
                  : undefined
              return (
                <li
                  key={item.href}
                  className={dropdownItems ? 'header__item--dropdown' : undefined}
                >
                  <a
                    className="header__link"
                    href={
                      item.href.startsWith('#')
                        ? `${homePath}${item.href}`
                        : item.href
                    }
                    aria-haspopup={dropdownItems ? 'true' : undefined}
                    onClick={(event) => {
                      setMenuOpen(false)
                      if (item.href === '/#blog') handleBlogLinkClick(event)
                    }}
                  >
                    {item.label}
                    {dropdownItems && (
                      <svg className="header__caret" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 4.5 6 8l3.5-3.5" />
                      </svg>
                    )}
                  </a>
                  {dropdownItems && (
                    <div className="header__dropdown">
                      <ul className="header__dropdown-list">
                        {dropdownItems.map((entry) => (
                          <li key={entry.id}>
                            <a className="header__dropdown-link" href={entry.href}>
                              {entry.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          className="header__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation-sticky"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
        </button>
      </header>
    </div>
  )
}

export default Header
