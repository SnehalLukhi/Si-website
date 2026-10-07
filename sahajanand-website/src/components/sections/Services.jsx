import { useEffect, useRef, useState } from 'react'
import { ViewportReveal } from '../motion/Reveal'
import PeekCarousel from '../common/PeekCarousel'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import './Services.css'

const PEEK_QUERY = '(max-width: 991px)'

/* Exported so the header Careers > Services dropdown lists exactly these services and links */
export const SERVICES = [
  {
    id: 'uiux',
    href: '/services/ui-ux',
    title: 'UI/UX Design',
    description:
      'Clean, modern, and user-focused designs that drive engagement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 21l3.5-1 11-11a2.12 2.12 0 0 0-3-3L3.5 17 3 21z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 6.5l3 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14 20h7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M18 14v3.5a1.5 1.5 0 0 0 3 0V16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'qa',
    href: '/services/qa-tester',
    title: 'QA Tester',
    description:
      'Delivering bug-free, high-performance products with precision QA.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M8.5 12.2l2.3 2.3 4.7-4.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'web',
    href: '/services/web-development',
    title: 'Web Development',
    description:
      'Custom web development with seamless UI, smooth functionality, and reliable performance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 7L3.5 12 8 17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 7l4.5 5L16 17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 5.5L10.5 18.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'apps',
    href: '/services/app-development',
    title: 'Apps Development',
    description:
      'We build fast, scalable, and user-friendly mobile apps tailored to your business needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="7"
          y="3.5"
          width="10"
          height="17"
          rx="2.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10.5 6.25h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17.25" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'marketing',
    href: '/services/marketing',
    title: 'Marketing',
    description:
      'Smart strategies that boost your brand visibility and engagement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 18V6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4 18h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M7.5 14.5l3.2-3.8 2.8 2.2 4-5.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2 7.5h2.8V10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const AUTOPLAY_MS = 6500
const SMART_SPEED_MS = 3000
const DRAG_SETTLE_MS = 550
const GAP_PX = 25
const DESKTOP_VISIBLE = 3

function getVisibleCount() {
  if (window.matchMedia('(max-width: 566px)').matches) return 1
  if (window.matchMedia('(max-width: 991px)').matches) return 2
  return DESKTOP_VISIBLE
}

function ServiceCardContent({ service, onLinkClick }) {
  return (
    <>
      {service.href ? (
        <a
          className="services__card-hit"
          href={service.href}
          aria-label={service.title}
          onClick={onLinkClick}
        />
      ) : null}
      <span className="services__icon" aria-hidden="true">
        {service.icon}
      </span>
      <h3 className="services__card-title">{service.title}</h3>
      <p className="services__card-text">{service.description}</p>
      {service.href ? (
        <a
          className="services__card-cta"
          href={service.href}
          aria-label={`Explore ${service.title}`}
          onClick={onLinkClick}
        >
          Explore
          <span className="services__card-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </>
  )
}

function Services() {
  const isPeek = useMediaQuery(PEEK_QUERY)
  const peekRef = useRef(null)
  const [peekActive, setPeekActive] = useState(0)
  const [visible, setVisible] = useState(getVisibleCount)
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [moveMs, setMoveMs] = useState(SMART_SPEED_MS)
  const snapTimeout = useRef(0)
  const autoplayRef = useRef(0)
  const viewportRef = useRef(null)
  const indexRef = useRef(0)
  const skipClickRef = useRef(false)
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    locked: false,
    axis: null,
  })

  indexRef.current = index
  const loopOffset = SERVICES.length
  const pageCount = SERVICES.length

  const goToIndex = (nextIndex, withAnimation = true, duration = SMART_SPEED_MS) => {
    setMoveMs(duration)
    setAnimate(withAnimation)
    setIndex(nextIndex)
  }

  const startAutoplay = () => {
    window.clearInterval(autoplayRef.current)
    autoplayRef.current = window.setInterval(() => {
      setMoveMs(SMART_SPEED_MS)
      setAnimate(true)
      setIndex((current) => current + 1)
    }, AUTOPLAY_MS)
  }

  useEffect(() => {
    const oneCard = window.matchMedia('(max-width: 566px)')
    const twoCards = window.matchMedia('(max-width: 991px)')
    const onChange = () => {
      setVisible(getVisibleCount())
      setIndex(0)
      setAnimate(false)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setAnimate(true))
      })
    }

    oneCard.addEventListener('change', onChange)
    twoCards.addEventListener('change', onChange)
    return () => {
      oneCard.removeEventListener('change', onChange)
      twoCards.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    if (isPeek) return undefined
    startAutoplay()
    return () => window.clearInterval(autoplayRef.current)
  }, [visible, isPeek])

  useEffect(() => {
    if (index < loopOffset) return undefined
    if (dragRef.current.locked) return undefined

    window.clearTimeout(snapTimeout.current)
    snapTimeout.current = window.setTimeout(() => {
      goToIndex(index - loopOffset, false)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setAnimate(true))
      })
    }, moveMs)

    return () => window.clearTimeout(snapTimeout.current)
  }, [index, moveMs])

  const trackItems = [...SERVICES, ...SERVICES.slice(0, visible)]
  const activeControl = index >= loopOffset ? index - loopOffset : index
  const cardStep = `((100% - ${(visible - 1) * GAP_PX}px) / ${visible} + ${GAP_PX}px)`
  /* Highlighted card: the middle of three on desktop, the single card on mobile */
  const highlightedItem =
    visible === DESKTOP_VISIBLE ? index + 1 : visible === 1 ? index : -1

  const handleControlClick = (control) => {
    if (isPeek) {
      peekRef.current?.goTo(control)
      return
    }
    goToIndex(control, true)
    startAutoplay()
  }

  const skipClickAfterDrag = (event) => {
    if (skipClickRef.current) {
      event.preventDefault()
      skipClickRef.current = false
    }
  }

  const dotsActive = isPeek ? peekActive : activeControl

  const stepOneCard = (direction) => {
    const current = indexRef.current
    if (direction > 0) {
      goToIndex(Math.min(current + 1, loopOffset), true, DRAG_SETTLE_MS)
      return
    }
    if (current === 0) {
      goToIndex(loopOffset, false)
      window.requestAnimationFrame(() => {
        goToIndex(loopOffset - 1, true, DRAG_SETTLE_MS)
      })
      return
    }
    goToIndex(current - 1, true, DRAG_SETTLE_MS)
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    window.clearInterval(autoplayRef.current)
    window.clearTimeout(snapTimeout.current)

    if (indexRef.current >= loopOffset) {
      goToIndex(indexRef.current - loopOffset, false)
    }

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      locked: false,
      axis: null,
    }
    setIsDragging(true)
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag.active || event.pointerId !== drag.pointerId) return

    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    const now = performance.now()
    const dt = Math.max(1, now - drag.lastTime)
    drag.velocity = (event.clientX - drag.lastX) / dt
    drag.lastX = event.clientX
    drag.lastTime = now

    if (!drag.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.active = false
        setIsDragging(false)
        startAutoplay()
        return
      }

      drag.locked = true
      drag.axis = 'x'
      event.currentTarget.setPointerCapture?.(event.pointerId)
    }

    if (drag.axis === 'x') {
      event.preventDefault()
    }
  }

  const handlePointerUp = (event) => {
    const drag = dragRef.current
    if (!drag.active || event.pointerId !== drag.pointerId) return

    if (!drag.locked) {
      drag.active = false
      setIsDragging(false)
      startAutoplay()
      return
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId)

    const dx = event.clientX - drag.startX
    const velocity = drag.velocity
    skipClickRef.current = true
    drag.active = false
    drag.locked = false
    drag.axis = null
    setIsDragging(false)

    const goNext = dx < -40 || velocity < -0.35
    const goPrev = dx > 40 || velocity > 0.35

    if (goNext) {
      stepOneCard(1)
    } else if (goPrev) {
      stepOneCard(-1)
    }

    startAutoplay()
  }

  return (
    <section className="services" id="services" aria-label="Our services">
      <div className="services__inner">
        <header className="services__header">
          <ViewportReveal
            as="p"
            className="services__eyebrow"
            scale={1}
            y={28}
            duration={1}
          >
            Our Services
          </ViewportReveal>
          <ViewportReveal
            as="h2"
            className="services__heading"
            scale={1}
            y={28}
            duration={1}
            delay={0.18}
          >
            Smart, scalable services{' '}
            <br />
            designed to elevate your brand.
          </ViewportReveal>
        </header>

        <ViewportReveal
          className="services__slider"
          aria-roledescription="carousel"
          scale={1}
          y={120}
          duration={0.65}
          delay={0.1}
          threshold={0.1}
          fade={false}
        >
          {isPeek ? (
            <PeekCarousel
              ref={peekRef}
              items={SERVICES}
              getKey={(service) => service.id}
              label="Our services"
              autoplayMs={AUTOPLAY_MS}
              onActiveChange={setPeekActive}
              renderItem={(service, { active }) => (
                <div className={`services__card${active ? ' is-active' : ''}`}>
                  <ServiceCardContent service={service} />
                </div>
              )}
            />
          ) : (
            <div
              ref={viewportRef}
              className={`services__viewport${isDragging ? ' is-dragging' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <ul
                className={`services__track${animate ? '' : ' is-instant'}`}
                style={{
                  gap: `${GAP_PX}px`,
                  transform: `translate3d(calc(-${index} * ${cardStep}), 0, 0)`,
                  transition: animate
                    ? `transform ${moveMs}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                    : 'none',
                  '--services-move': `${moveMs}ms`,
                }}
              >
                {trackItems.map((service, itemIndex) => (
                  <li
                    key={`${service.id}-${itemIndex}`}
                    className={`services__card${
                      itemIndex === highlightedItem
                        ? ' is-active'
                        : visible === DESKTOP_VISIBLE
                          ? ' is-side'
                          : ''
                    }`}
                    style={{
                      flex: `0 0 calc((100% - ${(visible - 1) * GAP_PX}px) / ${visible})`,
                    }}
                  >
                    <ServiceCardContent service={service} onLinkClick={skipClickAfterDrag} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="services__dots" role="tablist" aria-label="Services slides">
            {Array.from({ length: pageCount }, (_, control) => (
              <button
                key={`dot-${control}`}
                type="button"
                className={`services__dot${control === dotsActive ? ' is-active' : ''}`}
                aria-label={`Show service ${control + 1}`}
                aria-selected={control === dotsActive}
                onClick={() => handleControlClick(control)}
              />
            ))}
          </div>
        </ViewportReveal>
      </div>
    </section>
  )
}

export default Services
