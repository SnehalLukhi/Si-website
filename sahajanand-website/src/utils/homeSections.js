import { handleBlogLinkClick } from './scrollToBlog'

// Footer quick links point at Home-page sections (/#about, /#blog ...).
// For a section the Home page does not have, the link opens the page that serves that content instead.
const SECTION_PAGES = {
  'our-product': '/our-product',
  careers: '/careers',
  contact: '/contact-us',
}

const isHomePath = () => window.location.pathname.replace(/\/$/, '') === ''

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// The header only covers content while it is fixed (desktop); on compact screens it scrolls away
function getFixedHeaderBottom() {
  const header = document.querySelector('.header')
  if (!header) return 0

  const { position } = window.getComputedStyle(header)

  return position === 'fixed' || position === 'sticky'
    ? header.getBoundingClientRect().bottom
    : 0
}

export function scrollToSection(section) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const top = section.getBoundingClientRect().top + window.scrollY - getFixedHeaderBottom()

  window.scrollTo({
    top: Math.min(Math.max(top, 0), Math.max(maxScroll, 0)),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

// Footer quick-link click.
// On Home: scroll smoothly to the section. On any other page: do nothing here, so the link
// navigates to "/#section" and the Home page takes over when it loads (see handleHashOnArrival).
export function handleSectionLinkClick(event) {
  const modified =
    event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

  if (modified || !isHomePath()) return

  const id = new URL(event.currentTarget.href).hash.slice(1)

  if (id === 'blog') {
    handleBlogLinkClick(event)
    return
  }

  const section = document.getElementById(id)

  if (section) {
    event.preventDefault()

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`)
    }

    scrollToSection(section)
  } else if (SECTION_PAGES[id]) {
    event.preventDefault()
    window.location.assign(SECTION_PAGES[id])
  }
}

// Home page, after it loads with a "#section" in the address (e.g. arriving from another page's footer).
// The blog hash has its own handling; returns a cleanup function.
export function handleHashOnArrival() {
  const id = window.location.hash.slice(1)

  if (!id || id === 'blog') return () => {}

  const section = document.getElementById(id)

  if (!section) {
    if (SECTION_PAGES[id]) window.location.replace(SECTION_PAGES[id])

    return () => {}
  }

  const frameId = window.requestAnimationFrame(() => scrollToSection(section))

  return () => window.cancelAnimationFrame(frameId)
}
