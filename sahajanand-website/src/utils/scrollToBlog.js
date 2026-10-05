const BLOG_ID = 'blog'
const BLOG_HASH = `#${BLOG_ID}`
const HEADER_GAP_PX = 16
const FIXED_HEADER_CONTENT_GAP_PX = 28
const MIN_DURATION_MS = 600
const MAX_DURATION_MS = 1000
const DURATION_PER_PX = 0.35
const ARRIVAL_LEAD_PX = 120
const ARRIVAL_DURATION_MS = 450

let frameId = 0
let stopListening = () => {}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const easeOutCubic = (t) => 1 - (1 - t) ** 3

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getFixedHeaderBottom() {
  const header = document.querySelector('.header')
  if (!header) return null

  // The header only covers content while it is fixed (desktop); on compact screens it scrolls away
  const { position } = window.getComputedStyle(header)
  if (position !== 'fixed' && position !== 'sticky') return null

  return header.getBoundingClientRect().bottom
}

function getBlogScrollTop(section) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const headerBottom = getFixedHeaderBottom()
  // Under the fixed header, the section's top padding would read as a large empty band, so align its content instead
  const target =
    headerBottom === null ? section : section.querySelector('.blog__inner') ?? section
  const offset =
    headerBottom === null ? HEADER_GAP_PX : headerBottom + FIXED_HEADER_CONTENT_GAP_PX
  const top = target.getBoundingClientRect().top + window.scrollY - offset
  return Math.min(Math.max(top, 0), Math.max(maxScroll, 0))
}

function cancelScroll() {
  window.cancelAnimationFrame(frameId)
  stopListening()
}

function animateScroll(section, duration, easing) {
  cancelScroll()

  const startY = window.scrollY
  const startTime = performance.now()

  // Let the user take over mid-animation instead of fighting their input
  const interrupt = () => cancelScroll()
  const events = ['wheel', 'touchstart', 'keydown']
  events.forEach((name) => window.addEventListener(name, interrupt, { passive: true }))
  stopListening = () => {
    events.forEach((name) => window.removeEventListener(name, interrupt))
    stopListening = () => {}
  }

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    // Target is re-read every frame so late layout shifts (images, fonts) can't make it overshoot
    const targetY = getBlogScrollTop(section)
    window.scrollTo(0, startY + (targetY - startY) * easing(progress))

    if (progress < 1) {
      frameId = window.requestAnimationFrame(step)
    } else {
      stopListening()
    }
  }

  frameId = window.requestAnimationFrame(step)
}

export function scrollToBlog({ arrival = false } = {}) {
  const section = document.getElementById(BLOG_ID)
  if (!section) return false

  if (prefersReducedMotion()) {
    cancelScroll()
    window.scrollTo(0, getBlogScrollTop(section))
    return true
  }

  if (arrival) {
    window.scrollTo(0, Math.max(getBlogScrollTop(section) - ARRIVAL_LEAD_PX, 0))
    animateScroll(section, ARRIVAL_DURATION_MS, easeOutCubic)
    return true
  }

  const distance = Math.abs(getBlogScrollTop(section) - window.scrollY)
  const duration = Math.min(
    Math.max(distance * DURATION_PER_PX, MIN_DURATION_MS),
    MAX_DURATION_MS,
  )
  animateScroll(section, duration, easeInOutCubic)
  return true
}

export function isBlogHash() {
  return window.location.hash === BLOG_HASH
}

export function handleBlogLinkClick(event) {
  const onHome = window.location.pathname.replace(/\/$/, '') === ''
  const modified =
    event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  if (!onHome || modified || !document.getElementById(BLOG_ID)) return

  event.preventDefault()
  if (!isBlogHash()) {
    window.history.pushState(null, '', BLOG_HASH)
  }
  scrollToBlog()
}
