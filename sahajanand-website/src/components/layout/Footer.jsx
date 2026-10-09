import { useState } from 'react'
import logoMark from '../../assets/images/logo2.png'
import { handleSectionLinkClick } from '../../utils/homeSections'
import './Footer.css'

const QUICK_LINKS = [
  // { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Our Products', href: '/#our-product' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Careers', href: '/#careers' },
  { label: 'Contact Us', href: '/#contact' },
]

const SERVICE_LINKS = [
  { label: 'UI/UX Design', href: '/services/ui-ux' },
  { label: 'QA Tester', href: '/services/qa-tester' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'App Development', href: '/services/app-development' },
  { label: 'Marketing', href: '/services/marketing' },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/sahajanandinfotech',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sahajanandinfotech/?next=%2F',
    icon: 'instagram',
  },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Sitemap', href: '#' },
]

function SocialIcon({ type }) {
  switch (type) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.1 9.1H4.3V19.5h2.8V9.1zM5.7 4.5c-.9 0-1.6.7-1.6 1.6S4.8 7.7 5.7 7.7s1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM19.7 19.5h-2.8v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2H10.4V9.1h2.7v1.4h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4v6.1z"
          />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}

function AccordionIcon() {
  return (
    <svg className="site-footer__accordion-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const handleSubscribe = (event) => {
    event.preventDefault()
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a className="site-footer__brand-link" href="/" aria-label="Sahajanand Infotech">
              <img className="site-footer__logo" src={logoMark} alt="" />
              <span className="site-footer__brand-name">SAHAJANAND Infotech</span>
            </a>
            <p className="site-footer__description">
              SAHAJANAND INFO is a young, dynamic start-up, founded by a team of
              experienced leaders in the mobile industry. From early-stage ideas
              to long-term vision, we create products with a future-first
              mindset.
            </p>
            <div className="site-footer__social" aria-label="Social media">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  className="site-footer__social-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <SocialIcon type={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <div
            className={`site-footer__col site-footer__col--accordion${
              quickLinksOpen ? ' is-open' : ''
            }`}
          >
            <div className="site-footer__heading-row">
              <h3 className="site-footer__heading" id="footer-quick-links-heading">
                Quick Links
              </h3>
              <button
                type="button"
                className="site-footer__accordion-btn"
                aria-expanded={quickLinksOpen}
                aria-controls="footer-quick-links"
                onClick={() => setQuickLinksOpen((open) => !open)}
              >
                <span className="visually-hidden">
                  {quickLinksOpen ? 'Collapse Quick Links' : 'Expand Quick Links'}
                </span>
                <AccordionIcon />
              </button>
            </div>
            <div
              className="site-footer__accordion-panel"
              id="footer-quick-links"
              role="region"
              aria-labelledby="footer-quick-links-heading"
            >
              <div className="site-footer__accordion-panel-inner">
                <ul className="site-footer__list">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={handleSectionLinkClick}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`site-footer__col site-footer__col--accordion${
              servicesOpen ? ' is-open' : ''
            }`}
          >
            <div className="site-footer__heading-row">
              <h3 className="site-footer__heading" id="footer-services-heading">
                Our Services
              </h3>
              <button
                type="button"
                className="site-footer__accordion-btn"
                aria-expanded={servicesOpen}
                aria-controls="footer-services"
                onClick={() => setServicesOpen((open) => !open)}
              >
                <span className="visually-hidden">
                  {servicesOpen ? 'Collapse Our Services' : 'Expand Our Services'}
                </span>
                <AccordionIcon />
              </button>
            </div>
            <div
              className="site-footer__accordion-panel"
              id="footer-services"
              role="region"
              aria-labelledby="footer-services-heading"
            >
              <div className="site-footer__accordion-panel-inner">
                <ul className="site-footer__list">
                  {SERVICE_LINKS.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`site-footer__col site-footer__col--contact site-footer__col--accordion${
              contactOpen ? ' is-open' : ''
            }`}
          >
            <div className="site-footer__heading-row">
              <h3 className="site-footer__heading" id="footer-contact-heading">
                Get In Touch
              </h3>
              <button
                type="button"
                className="site-footer__accordion-btn"
                aria-expanded={contactOpen}
                aria-controls="footer-contact"
                onClick={() => setContactOpen((open) => !open)}
              >
                <span className="visually-hidden">
                  {contactOpen ? 'Collapse Get In Touch' : 'Expand Get In Touch'}
                </span>
                <AccordionIcon />
              </button>
            </div>
            <div
              className="site-footer__accordion-panel"
              id="footer-contact"
              role="region"
              aria-labelledby="footer-contact-heading"
            >
              <div className="site-footer__accordion-panel-inner">
                <ul className="site-footer__contact-list">
                  <li>
                    <span className="site-footer__contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                        />
                      </svg>
                    </span>
                    <a href="mailto:hr@sahajanandinfotech.com">hr@sahajanandinfotech.com</a>
                  </li>
                  <li>
                    <span className="site-footer__contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"
                        />
                      </svg>
                    </span>
                    <a href="tel:+918140039454">+91 8140039454</a>
                  </li>
                  <li>
                    <span className="site-footer__contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                        />
                      </svg>
                    </span>
                    <address className="site-footer__contact-address">
                      307, Dhara Arcade, Nr. Mahadev Chowk,
                      <br />
                      Maruti Nandan Society, Mota Varachha,
                      <br />
                      Surat, Gujarat 394101
                    </address>
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="site-footer__newsletter">
              <h3 className="site-footer__heading">Subscribe to Our Newsletter</h3>
              <form className="site-footer__newsletter-form" onSubmit={handleSubscribe}>
                <label className="visually-hidden" htmlFor="footer-newsletter-email">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  className="site-footer__newsletter-input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                <button
                  className="site-footer__newsletter-btn"
                  type="submit"
                  aria-label="Subscribe"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
                    />
                  </svg>
                </button>
              </form>
            </div> */}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © 2026 Sahajanand Infotech. All rights reserved.
          </p> 
          <p className='site-footer_team'> Built with ❤️ by Sahajanand Infotech. </p>
          {/* <nav className="site-footer__legal" aria-label="Legal">
            {LEGAL_LINKS.map((item, index) => (
              <span key={item.label} className="site-footer__legal-item">
                {index > 0 ? (
                  <span className="site-footer__legal-sep" aria-hidden="true">
                    |
                  </span>
                ) : null}
                <a href={item.href}>{item.label}</a>
              </span>
            ))}
          </nav> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
