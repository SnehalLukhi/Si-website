import { useEffect, useState } from 'react'
import './ContactWidget.css'

/* Contact details already used on the Contact Us page and in the footer */
const WHATSAPP_URL = 'https://wa.me/918140039454'
const EMAIL_URL = 'mailto:career@sahajanandinfotech.com'
const PHONE_URL = 'tel:+918140039454'
const MEETING_URL = '/contact-us'
const STORAGE_KEY = 'sahajanand-contact-widget-open'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9zM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5zm3 6h3v3H8v-3z"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.94 9.94 0 1 0 12.04 2zm0 1.8a8.14 8.14 0 1 1-4.2 15.1l-.3-.18-3.08.89.9-3-.2-.31A8.14 8.14 0 0 1 12.04 3.8zM8.6 7.4c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.07 3.3 5.1 4.5 2.52 1 3.03.8 3.58.75.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.65-1.62-.9-2.2-.23-.57-.47-.5-.65-.5h-.55z"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.5l8 5.3 8-5.3V6H4zm16 3-8 5.3L4 9v9h16V9z"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1L6.6 10.8z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.42 6.29 6.29-6.3 6.3 1.42 1.4 6.29-6.29 6.3 6.3 1.4-1.42-6.29-6.29 6.3-6.3z"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 5v2h10V8H7zm0 4v2h7v-2H7z"
      />
    </svg>
  )
}

const ACTIONS = [
  { id: 'meeting', label: 'Book a Meeting', href: MEETING_URL, Icon: CalendarIcon },
  { id: 'whatsapp', label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsAppIcon, external: true },
  { id: 'email', label: 'Email Us', href: EMAIL_URL, Icon: MailIcon },
  { id: 'call', label: 'Call Us', href: PHONE_URL, Icon: PhoneIcon },
]

function readOpen() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== '0'
  } catch {
    return true
  }
}

function rememberOpen(open) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, open ? '1' : '0')
  } catch {
    /* storage unavailable: the widget simply opens again on the next page */
  }
}

/* Floating contact widget, fixed at the bottom-right corner. The X folds it into a small round button
   that opens it again. */
function ContactWidget() {
  const [open, setOpen] = useState(readOpen)

  const setWidgetOpen = (next) => {
    setOpen(next)
    rememberOpen(next)
  }

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        rememberOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="contact-widget" role="group" aria-label="Contact us">
      {open ? (
        <ul className="contact-widget__list">
          {ACTIONS.map(({ id, label, href, Icon, external }) => (
            <li key={id}>
              <a
                className={`contact-widget__action contact-widget__action--${id}`}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-widget__icon">
                  <Icon />
                </span>
                <span className="contact-widget__label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {open ? (
        <button
          className="contact-widget__toggle contact-widget__toggle--close"
          type="button"
          aria-label="Close contact options"
          onClick={() => setWidgetOpen(false)}
        >
          <CloseIcon />
        </button>
      ) : (
        <button
          className="contact-widget__toggle contact-widget__toggle--open"
          type="button"
          aria-label="Open contact options"
          aria-expanded="false"
          onClick={() => setWidgetOpen(true)}
        >
          <ChatIcon />
        </button>
      )}
    </div>
  )
}

export default ContactWidget
