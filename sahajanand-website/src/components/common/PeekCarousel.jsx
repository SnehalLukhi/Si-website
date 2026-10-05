import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './PeekCarousel.css'

/* Items are rendered three times; scrolling is kept inside the middle copy so both neighbours always exist */
const COPIES = 3
const SETTLE_MS = 150
const RESUME_AFTER_MS = 3000
const MOVE_MS = 700
/* Resting space between the centre card and each side card. Cards keep their own size. */
const VISUAL_GAP_PX = 12
const SIDE_SCALE = 0.88

function easeInOut(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

function mod(value, length) {
  return ((value % length) + length) % length
}

/**
 * Touch-scrollable carousel: one centred card, with partial neighbours on both sides.
 * `ref.goTo(index)` scrolls to a real item index; `onActiveChange` reports the centred real index.
 */
function PeekCarousel({
  items,
  getKey,
  renderItem,
  autoplayMs = 0,
  label,
  onActiveChange,
  ref,
}) {
  const reduceMotion = useReducedMotion()
  const count = items.length
  const scrollerRef = useRef(null)
  const slideRefs = useRef([])
  const activeRef = useRef(count)
  const settleTimer = useRef(0)
  const resumeTimer = useRef(0)
  const frame = useRef(0)
  const animFrame = useRef(0)
  const animToken = useRef(0)
  const animatingRef = useRef(false)
  const pausedRef = useRef(false)
  const [active, setActive] = useState(count)

  const offsetFor = useCallback((index) => {
    const scroller = scrollerRef.current
    const slide = slideRefs.current[index]
    if (!scroller || !slide) return 0
    return slide.offsetLeft + slide.offsetWidth / 2 - scroller.clientWidth / 2
  }, [])

  /* Side cards ease toward the centre as they approach it, and rest a small gap away */
  const applyDepth = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0
    const center = scroller.scrollLeft + scroller.clientWidth / 2
    slideRefs.current.forEach((slide) => {
      if (!slide) return
      const width = slide.offsetWidth
      const delta = slide.offsetLeft + width / 2 - center
      const pitch = width + gap
      const progress = pitch > 0 ? Math.min(1, Math.abs(delta) / pitch) : 0
      const scale = 1 - (1 - SIDE_SCALE) * progress
      const fullTuck = gap + ((1 - SIDE_SCALE) / 2) * width - VISUAL_GAP_PX
      const tuck = (delta < 0 ? 1 : delta > 0 ? -1 : 0) * Math.max(0, fullTuck) * progress
      slide.style.transform = `translate3d(${tuck}px, 0, 0) scale(${scale})`
      slide.style.zIndex = String(Math.round(30 - progress * 20))
    })
  }, [])

  const scrollToIndex = useCallback(
    (index, smooth = true) => {
      const scroller = scrollerRef.current
      if (!scroller) return
      const destination = offsetFor(index)
      animToken.current += 1
      window.cancelAnimationFrame(animFrame.current)

      if (!smooth || reduceMotion) {
        animatingRef.current = false
        scroller.classList.remove('is-animating')
        scroller.scrollLeft = destination
        applyDepth()
        return
      }

      const origin = scroller.scrollLeft
      const started = performance.now()
      const token = ++animToken.current
      animatingRef.current = true
      scroller.classList.add('is-animating')

      const step = (now) => {
        if (token !== animToken.current) return
        const progress = Math.min(1, (now - started) / MOVE_MS)
        const done = progress >= 1
        if (done) {
          animatingRef.current = false
          scroller.classList.remove('is-animating')
        }
        scroller.scrollLeft = origin + (destination - origin) * easeInOut(progress)
        applyDepth()
        if (!done) animFrame.current = window.requestAnimationFrame(step)
      }

      animFrame.current = window.requestAnimationFrame(step)
    },
    [applyDepth, offsetFor, reduceMotion],
  )

  const updateActive = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const center = scroller.scrollLeft + scroller.clientWidth / 2
    let closest = activeRef.current
    let closestDistance = Infinity
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = index
      }
    })
    if (closest !== activeRef.current) {
      activeRef.current = closest
      setActive(closest)
    }
  }, [])

  /* Once scrolling settles outside the middle copy, jump to the identical card in the middle copy */
  const recentre = useCallback(() => {
    const scroller = scrollerRef.current
    const current = activeRef.current
    if (!scroller || (current >= count && current < count * 2)) return
    const target = count + mod(current, count)
    /* The swap must be invisible: the identical card in the middle copy takes the raised position instantly */
    scroller.classList.add('is-recentring')
    scroller.scrollLeft += offsetFor(target) - offsetFor(current)
    activeRef.current = target
    setActive(target)
    applyDepth()
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scroller.classList.remove('is-recentring'))
    })
  }, [applyDepth, count, offsetFor])

  useLayoutEffect(() => {
    scrollToIndex(count, false)
    applyDepth()
  }, [applyDepth, count, scrollToIndex])

  useEffect(() => {
    const onResize = () => scrollToIndex(activeRef.current, false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [scrollToIndex])

  useEffect(() => {
    onActiveChange?.(mod(active, count))
  }, [active, count, onActiveChange])

  useEffect(() => {
    if (!autoplayMs || reduceMotion) return undefined
    const timer = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return
      scrollToIndex(activeRef.current + 1)
    }, autoplayMs)
    return () => window.clearInterval(timer)
  }, [autoplayMs, reduceMotion, scrollToIndex])

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frame.current)
      window.cancelAnimationFrame(animFrame.current)
      window.clearTimeout(settleTimer.current)
      window.clearTimeout(resumeTimer.current)
    },
    [],
  )

  useImperativeHandle(
    ref,
    () => ({
      goTo(index) {
        const current = activeRef.current
        let diff = mod(index - current, count)
        if (diff > count / 2) diff -= count
        scrollToIndex(current + diff)
      },
    }),
    [count, scrollToIndex],
  )

  const handleScroll = () => {
    applyDepth()
    window.cancelAnimationFrame(frame.current)
    frame.current = window.requestAnimationFrame(updateActive)
    if (animatingRef.current) return
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(recentre, SETTLE_MS)
  }

  const pause = () => {
    animToken.current += 1
    window.cancelAnimationFrame(animFrame.current)
    animatingRef.current = false
    scrollerRef.current?.classList.remove('is-animating')
    window.clearTimeout(resumeTimer.current)
    pausedRef.current = true
  }

  const resumeLater = () => {
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false
    }, RESUME_AFTER_MS)
  }

  const slides = Array.from({ length: count * COPIES }, (_, index) => items[index % count])

  return (
    <div className="peek-carousel">
      <div
        ref={scrollerRef}
        className="peek-carousel__scroller"
        aria-roledescription="carousel"
        aria-label={label}
        onScroll={handleScroll}
        onPointerDown={pause}
        onPointerUp={resumeLater}
        onPointerCancel={resumeLater}
        onTouchStart={pause}
        onTouchEnd={resumeLater}
      >
        {slides.map((item, index) => {
          const isActive = index === active
          const isCopy = index < count || index >= count * 2
          return (
            <div
              key={`${getKey(item)}-${index}`}
              ref={(node) => {
                slideRefs.current[index] = node
              }}
              className={`peek-carousel__slide${
                isActive ? ' is-active' : ` is-peek ${index < active ? 'is-before' : 'is-after'}`
              }`}
              aria-hidden={isCopy || !isActive ? true : undefined}
              inert={!isActive || undefined}
            >
              {renderItem(item, { active: isActive })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PeekCarousel
