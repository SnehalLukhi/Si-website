import { useEffect, useState } from 'react'
import logoMark from '../../assets/images/logo.svg'
import logoMarkLight from '../../assets/images/logo1.svg'
import { handleSectionLinkClick } from '../../utils/homeSections'
import { SERVICES } from '../sections/Services'
import './Header.css'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Our Services', dropdown: 'services' },
  { label: 'About Us', dropdown: 'about' },
  { label: 'Contact Us', href: '/contact-us' },
]

/* Our Services is only a dropdown. It lists every card of the home Services section (same names and links, imported
   from that section), and each one opens that service's existing page.

   About Us is only a dropdown too (it has no page of its own). Every option opens something that already exists:
   the Careers page (Jobs), and the Blog, Our Products and Company Overview pages. */
const ABOUT_COLUMNS = [
  [
    { id: 'jobs', label: 'Jobs', description: 'Explore open positions.', href: '/jobs' },
    { id: 'blog', label: 'Blog', description: 'Read our latest articles.', href: '/blog' },
    { id: 'careers', label: 'Careers', description: 'Work with our team.', href: '/careers' },
  ],
  [
    { id: 'products', label: 'Our Products', description: 'Explore our apps.', href: '/our-product' },
    { id: 'overview', label: 'Company Overview', description: 'Get to know us.', href: '/company-overview' },
    { id: 'life', label: 'Life at Sahajanand Infotech', description: 'Our culture and people.', href: '/life-at-sahajanand' },
  ],
]

const STICKY_THRESHOLD = 24

function Header({ homePath = '', sticky = true, compactLogoLight = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  /* Which dropdown is expanded in the mobile drawer: 'services', 'about' or null (desktop opens on hover) */
  const [openMenu, setOpenMenu] = useState(null)

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
    if (!menuOpen) setOpenMenu(null)
  }, [menuOpen])

  const handleHomeClick = (event) => {
    setMenuOpen(false)

    const onHome = window.location.pathname.replace(/\/$/, '') === ''
    const modified = event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

    if (!onHome || modified) return

    event.preventDefault()
    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
              if (item.dropdown) {
                const isAbout = item.dropdown === 'about'
                const expanded = openMenu === item.dropdown
                const menuId = `header-${item.dropdown}-menu`

                return (
                  <li
                    key={item.label}
                    className={`header__item--dropdown${expanded ? ' is-expanded' : ''}`}
                  >
                    <button
                      type="button"
                      className="header__link header__link--toggle"
                      aria-haspopup="true"
                      aria-expanded={expanded}
                      aria-controls={menuId}
                      onClick={() => setOpenMenu(expanded ? null : item.dropdown)}
                    >
                      {item.label}
                      <svg className="header__caret" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 4.5 6 8l3.5-3.5" />
                      </svg>
                    </button>
                    {isAbout ? (
                      <div className="header__dropdown header__dropdown--about" id={menuId}>
                        <div className="header__about-grid">
                          {ABOUT_COLUMNS.map((column, columnIndex) => (
                            <ul className="header__about-col" key={columnIndex}>
                              {column.map((entry) => (
                                <li key={entry.id}>
                                  <a
                                    className="header__about-link"
                                    href={entry.href}
                                    onClick={(event) => {
                                      setMenuOpen(false)
                                      handleSectionLinkClick(event)
                                    }}
                                  >
                                    <span className="header__about-title">{entry.label}</span>
                                    <span className="header__about-desc">{entry.description}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="header__dropdown header__dropdown--services" id={menuId}>
                        <ul className="header__dropdown-list">
                          {SERVICES.map((service) => (
                            <li key={service.id}>
                              <a
                                className="header__dropdown-link"
                                href={service.href}
                                onClick={() => setMenuOpen(false)}
                              >
                                {service.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.href}>
                  <a
                    className="header__link"
                    href={item.href}
                    onClick={item.href === '/' ? handleHomeClick : () => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
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
