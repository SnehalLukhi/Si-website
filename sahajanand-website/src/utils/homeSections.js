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

function getSectionScrollTop(section) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const top = section.getBoundingClientRect().top + window.scrollY - getFixedHeaderBottom()

  return Math.min(Math.max(top, 0), Math.max(maxScroll, 0))
}

export function scrollToSection(section, behavior = prefersReducedMotion() ? 'auto' : 'smooth') {
  window.scrollTo({ top: getSectionScrollTop(section), behavior })
}

// While a page opens on "/#section" (e.g. a refresh), images and other content are still loading and the page height
// keeps changing, which would leave the section off its position. Re-align it after each such change until the
// visitor scrolls themselves (or a few seconds pass). Returns a cleanup function.
const HOLD_ALIGN_MS = 4000
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown']

function holdSectionInPlace(section) {
  const align = () => {
    const top = getSectionScrollTop(section)

    if (Math.abs(window.scrollY - top) > 1) window.scrollTo({ top, behavior: 'auto' })
  }

  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(align)
  const stop = () => {
    observer?.disconnect()
    window.removeEventListener('load', align)
    USER_SCROLL_EVENTS.forEach((name) => window.removeEventListener(name, stop))
    window.clearTimeout(timer)
  }
  const timer = window.setTimeout(stop, HOLD_ALIGN_MS)

  observer?.observe(document.documentElement)
  window.addEventListener('load', align)
  USER_SCROLL_EVENTS.forEach((name) => window.addEventListener(name, stop, { passive: true }))

  return stop
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

  // A refresh keeps the browser's own scroll position (e.g. still at the top of the hero): a "#about" left in the
  // address from an earlier click must not pull the page down to that section again.
  const navigation = window.performance?.getEntriesByType?.('navigation')?.[0]

  if (navigation?.type === 'reload') return () => {}

  const section = document.getElementById(id)

  if (!section) {
    if (SECTION_PAGES[id]) window.location.replace(SECTION_PAGES[id])

    return () => {}
  }

  let stopHolding = () => {}
  const frameId = window.requestAnimationFrame(() => {
    scrollToSection(section, 'auto')
    stopHolding = holdSectionInPlace(section)
  })

  return () => {
    window.cancelAnimationFrame(frameId)
    stopHolding()
  }
}
