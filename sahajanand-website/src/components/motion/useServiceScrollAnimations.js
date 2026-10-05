import { useLayoutEffect } from 'react'

const STEP_S = 0.08
const MAX_DELAY_S = 0.6
const GROUP_SELECTOR =
  '[class*="__hero-copy"], [class*="__content"], [class*="__skills"], [class*="__form-wrap"]'

/* Targets are resolved by class suffix so one hook serves every service page (qa__, uiux__, webdev__, ...) */
const TARGETS = [
  { selector: '[class*="__hero-title"]', variant: 'up' },
  { selector: 'nav[aria-label="Breadcrumb"]', variant: 'up', delay: 0.12 },
  { selector: '[class*="__content"] > p', variant: 'up' },
  { selector: '[class*="__content"] > h2', variant: 'up' },
  { selector: '[class*="__content"] > ul > li', variant: 'up' },
  { selector: '[class*="__form-wrap"]', variant: 'left' },
  { selector: '[class*="__skills"] > h2', variant: 'up' },
  { selector: '[class*="__skills"] > p', variant: 'up' },
  { selector: '[class*="__skills"] > [class*="__form-rules"]', variant: 'up' },
  { selector: '[class*="__skill-row"] > h3', variant: 'up' },
  { selector: '[class*="__skill-row"] li', variant: 'up' },
]

/* Scroll-triggered reveal: bottom -> top for text and cards, right -> left for the form.
   Classes are added only while an element is waiting/animating and removed afterwards,
   so the page's own CSS (hover transitions, layout) is untouched once the reveal is done. */
export function useServiceScrollAnimations(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    root.classList.add('sa-page')
    const items = new Map()
    TARGETS.forEach(({ selector, variant, delay = 0 }) => {
      root.querySelectorAll(selector).forEach((node) => {
        if (!items.has(node)) items.set(node, { variant, delay })
      })
    })

    const cleanup = (node) => {
      node.classList.remove('sa-item', 'sa-up', 'sa-left', 'sa-in')
      node.style.transitionDelay = ''
    }

    const observer = new IntersectionObserver(
      (entries) => {
        /* Stagger is counted per section, so one big batch does not flatten every delay to the cap */
        const counters = new Map()
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry) => {
            const node = entry.target
            observer.unobserve(node)
            const { delay } = items.get(node)
            const group = node.closest(GROUP_SELECTOR) || node
            const index = counters.get(group) || 0
            counters.set(group, index + 1)
            const total = Math.min(delay + index * STEP_S, MAX_DELAY_S)
            node.style.transitionDelay = `${total}s`
            node.classList.add('sa-in')
            node.addEventListener(
              'transitionend',
              (event) => {
                if (event.target === node) cleanup(node)
              },
              { once: false },
            )
          })
      },
      { threshold: 0, rootMargin: '0px 0px -48px 0px' },
    )

    items.forEach(({ variant }, node) => {
      node.classList.add('sa-item', `sa-${variant}`)
      observer.observe(node)
    })

    return () => {
      observer.disconnect()
      root.classList.remove('sa-page')
      items.forEach((_, node) => cleanup(node))
    }
  }, [rootRef])
}
