import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import appIconOne from '../../assets/mobile-app/app-icon-1.png'
import appIconTwo from '../../assets/mobile-app/app-icon-2.png'
import appIconThree from '../../assets/mobile-app/app-icon-3.png'
import appIconFour from '../../assets/mobile-app/app-icon-4.png'
import appIconFive from '../../assets/mobile-app/app-icon-5.png'
import appIconSix from '../../assets/mobile-app/app-icon-6.png'
import appIconSeven from '../../assets/mobile-app/app-icon-7.png'
import appIconEight from '../../assets/mobile-app/app-icon-8.png'
import siGlow from '../../assets/mobile-app/si.png'
import './FloatingApps.css'

const APP_ICONS = [
  {
    id: 'app-two',
    className: 'floating-apps__icon--app-two',
    src: appIconTwo,
    initialColumn: 0,
    initialRow: -1,
    phoneColumn: 0,
    phoneRow: -1,
  },
  {
    id: 'app-three-top',
    className: 'floating-apps__icon--app-three-top',
    src: appIconThree,
    initialColumn: 1,
    initialRow: -1,
    phoneColumn: 1,
    phoneRow: -1,
  },
  {
    id: 'app-one',
    className: 'floating-apps__icon--app-one',
    src: appIconOne,
    initialColumn: -1,
    initialRow: -1,
    phoneColumn: -1,
    phoneRow: -1,
  },
  {
    id: 'app-four',
    className: 'floating-apps__icon--app-four',
    src: appIconFour,
    initialColumn: 0,
    initialRow: 0,
    phoneColumn: 0,
    phoneRow: 0,
  },
  {
    id: 'app-seven',
    className: 'floating-apps__icon--app-seven',
    src: appIconSeven,
    initialColumn: -1,
    initialRow: 0,
    phoneColumn: -1,
    phoneRow: 0,
  },
  {
    id: 'app-three-lower',
    className: 'floating-apps__icon--app-three-lower',
    src: appIconEight,
    phoneSrc: appIconEight,
    initialColumn: -0.5,
    initialRow: 1,
    phoneColumn: -1,
    phoneRow: 1,
  },
  {
    id: 'app-six',
    className: 'floating-apps__icon--app-six',
    src: appIconSix,
    initialColumn: 1,
    initialRow: 0,
    phoneColumn: 1,
    phoneRow: 0,
  },
  {
    id: 'app-five',
    className: 'floating-apps__icon--app-five',
    src: appIconFive,
    initialColumn: 0.5,
    initialRow: 1,
    phoneColumn: 0,
    phoneRow: 1,
  },
]

const NARROW_PHONE_QUERY = '(max-width: 605px)'
const ICON_LAYOUT_SIZE = 128.6
const REFERENCE_PHONE_SCALE = 0.43
const FIGMA_PHONE_WIDTH = 268
const FIGMA_ICON_SIZE = 57
const FIGMA_SPACING_X = 69
const FIGMA_SPACING_Y = 69
const FIGMA_FIRST_ROW_FROM_TOP = 83.5
// Phone icons are a fixed share of the phone width (62px / 286px at 576px, gap 4%), so they shrink with the phone
const NARROW_PHONE_ICON_RATIO = 62 / 286
const NARROW_PHONE_ICON_MAX = 62
const NARROW_PHONE_GAP_RATIO = 0.04
const NARROW_PHONE_GAP_MIN = 0
const OPEN_START = 0.1
const OPEN_END = 0.6
const CLOCKWISE_CURVE_RATIO = 0.16
const MAX_CLOCKWISE_CURVE = 72
// Pin only as long as the remaining phone animation, then Our Services.
const FLOATING_APPS_SCROLL_PX = 300
const ICON_OPEN_END = 540 / 2000
const PHONE_START = 1160 / 2000
const VISUAL_COMPLETE = 1460 / 2000
const PHONE_WINDOW = 1

function getElementScaleX(element) {
  if (!element) return 1
  const transform = getComputedStyle(element).transform
  if (!transform || transform === 'none') return 1
  const values = transform.startsWith('matrix3d(')
    ? transform.slice(9, -1)
    : transform.startsWith('matrix(')
      ? transform.slice(7, -1)
      : ''
  if (!values) return 1
  const scaleX = Math.abs(parseFloat(values.split(',')[0]))
  return Number.isFinite(scaleX) && scaleX > 0.001 ? scaleX : 1
}

function smoothstep(progress) {
  const t = Math.min(Math.max(progress, 0), 1)
  return t * t * (3 - 2 * t)
}

// Mostly smoothstep with a linear share so it tracks scroll more directly.
function phoneEase(progress) {
  const t = Math.min(Math.max(progress, 0), 1)
  return 0.3 * t + 0.7 * smoothstep(t)
}

// Quintic smoothstep: zero 1st/2nd derivatives at ends — no scroll-open jerk.
function smootherstep(progress) {
  const t = Math.min(Math.max(progress, 0), 1)
  return t * t * t * (t * (t * 6 - 15) + 10)
}

// Near-linear open: follows scroll evenly instead of rushing through the middle.
function openEase(progress) {
  const t = Math.min(Math.max(progress, 0), 1)
  const smooth = t * t * (3 - 2 * t)
  return 0.84 * t + 0.16 * smooth
}

function getEnterEnd() {
  const viewportH = typeof window === 'undefined' ? 1 : window.innerHeight || 1
  return viewportH / (viewportH + FLOATING_APPS_SCROLL_PX)
}

// Small enter hold so the stacked cluster is visible before it opens.
const ENTER_OPEN_DELAY_RATIO = 0.45

function getEnterOpenDelay() {
  return getEnterEnd() * ENTER_OPEN_DELAY_RATIO
}

function getPinProgress(scroll) {
  const s = Math.min(Math.max(scroll, 0), 1)
  const enterEnd = getEnterEnd()
  if (s <= enterEnd) return 0
  const span = 1 - enterEnd
  return span <= 0 ? 1 : (s - enterEnd) / span
}

function getPhoneWindowProgress(sPin) {
  const p = Math.min(Math.max(sPin, 0), 1)
  if (PHONE_WINDOW <= 0) return 1
  if (p <= 0) return 0
  if (p >= PHONE_WINDOW) return 1
  return p / PHONE_WINDOW
}

function getPhoneEntryProgress(progress) {
  if (progress <= OPEN_END) return 0
  return phoneEase((progress - OPEN_END) / (1 - OPEN_END))
}

function getAnimatedOffset(
  value,
  axis,
  initialOffset,
  phoneOffset,
  phoneLift = 0,
) {
  const progress = Math.min(Math.max(value, 0), 1)

  if (progress <= OPEN_START) return initialOffset[axis]

  if (progress <= OPEN_END) {
    // Progress is already ease-mapped for the open window.
    const easedProgress = (progress - OPEN_START) / (OPEN_END - OPEN_START)
    const travelX = -initialOffset.x
    const travelY = -initialOffset.y
    const travelDistance = Math.hypot(travelX, travelY)
    const curveAmount = Math.min(
      travelDistance * CLOCKWISE_CURVE_RATIO,
      MAX_CLOCKWISE_CURVE,
    )
    const clockwiseX = travelDistance === 0 ? 0 : -travelY / travelDistance
    const clockwiseY = travelDistance === 0 ? 0 : travelX / travelDistance
    const arc =
      curveAmount * Math.sin(Math.PI * easedProgress)
    const clockwiseOffset = axis === 'x' ? clockwiseX * arc : clockwiseY * arc

    return initialOffset[axis] * (1 - easedProgress) + clockwiseOffset
  }

  // Continue from the circle into the phone's current position, then settle
  // on the resting slot as the phone finishes rising. Blend starts and ends
  // at zero velocity so the handoff does not jerk.
  const phoneProgress = getPhoneEntryProgress(progress)
  // const lift = axis === 'y' ? phoneLift : 0
  return phoneOffset[axis] * phoneProgress
}

function AnimatedIcon({
  icon,
  progress,
  initialOffset,
  phoneOffset,
  phoneScale,
  phoneLift,
  stackIndex,
  setRef,
}) {
  const x = useTransform(progress, (value) =>
    icon.phoneOnly
      ? phoneOffset.x
      : getAnimatedOffset(value, 'x', initialOffset, phoneOffset),
  )
  const y = useTransform([progress, phoneLift], ([value, lift]) =>
    icon.phoneOnly
      ? phoneOffset.y
      : getAnimatedOffset(value, 'y', initialOffset, phoneOffset, lift),
  )
  const scale = useTransform(progress, (value) => {
    if (icon.phoneOnly) return phoneScale
    const t = getPhoneEntryProgress(value)
    return 1 + (phoneScale - 1) * t
  })
  // Crossfade across the phone-entry window — no hard cut at OPEN_END.
  const dotOpacity = useTransform(
    progress,
    [0, OPEN_END, OPEN_END + 0.22, 1],
    icon.phoneOnly ? [0, 0, 0, 0] : [1, 1, 0, 0],
  )
  const phoneOnlyOpacity = useTransform(
    progress,
    [0, OPEN_END, OPEN_END + 0.22, 1],
    [0, 0, 1, 1],
  )
  const appImageOpacity = useTransform(
    progress,
    [0, OPEN_END, OPEN_END + 0.22, 1],
    [1, 1, 0, 0],
  )
  const phoneImageOpacity = useTransform(
    progress,
    [0, OPEN_END, OPEN_END + 0.22, 1],
    [0, 0, 1, 1],
  )
  const isFrontCard = stackIndex === APP_ICONS.length - 1
  const stackedOpacity = useTransform(
    progress,
    [0, OPEN_START, OPEN_START + 0.08, 1],
    isFrontCard ? [1, 1, 1, 1] : [0, 0, 1, 1],
  )

  return (
    <motion.span
      ref={setRef}
      className={`floating-apps__icon ${icon.className}`}
      style={{
        x,
        y,
        scale,
        zIndex: 2 + stackIndex,
        opacity: icon.phoneOnly ? phoneOnlyOpacity : stackedOpacity,
        '--icon-dot-opacity': isFrontCard ? dotOpacity : stackedOpacity,
      }}
    >
      {icon.phoneSrc ? (
        <>
          <motion.img
            className="floating-apps__icon-image"
            src={icon.src}
            alt=""
            style={{ opacity: appImageOpacity }}
          />
          <motion.img
            className="floating-apps__icon-image floating-apps__icon-image--phone"
            src={icon.phoneSrc}
            alt=""
            style={{ opacity: phoneImageOpacity }}
          />
        </>
      ) : (
        <img className="floating-apps__icon-image" src={icon.src} alt="" />
      )}
    </motion.span>
  )
}

function FloatingApps() {
  const sectionRef = useRef(null)
  const clusterRef = useRef(null)
  const appsRef = useRef(null)
  const glowRef = useRef(null)
  const phoneSlotRef = useRef(null)
  const phoneRef = useRef(null)
  const iconRefs = useRef({})
  const [offsets, setOffsets] = useState({})
  const [phoneIconScale, setPhoneIconScale] = useState(REFERENCE_PHONE_SCALE)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })
  // Open while the section enters the viewport so the stacked → ring
  // reveal is visible on the way in. Pin-phase phone timing is unchanged.
  const iconScrollProgress = useTransform(scrollYProgress, (scroll) => {
    const s = Math.min(Math.max(scroll, 0), 1)
    const enterEnd = getEnterEnd()
    const openDelay = getEnterOpenDelay()

    if (s <= openDelay) return OPEN_START

    if (s < enterEnd) {
      const span = enterEnd - openDelay
      const t = span <= 0 ? 1 : (s - openDelay) / span
      return OPEN_START + (OPEN_END - OPEN_START) * openEase(t)
    }

    const phoneT = getPhoneWindowProgress(getPinProgress(s))
    return OPEN_END + (1 - OPEN_END) * phoneT
  })
  const phoneProgress = useTransform(scrollYProgress, (scroll) =>
    getPhoneWindowProgress(getPinProgress(scroll)),
  )
  const easedPhoneProgress = useTransform(phoneProgress, (value) =>
    phoneEase(value),
  )
  const phoneOpacity = useTransform(
    phoneProgress,
    [0, 0.18, 1],
    [0, 1, 1],
  )
  const phoneY = useTransform(easedPhoneProgress, [0, 1], [360, 0])
  const phoneScale = useTransform(easedPhoneProgress, [0, 1], [0.82, 1])
  const glowScale = useTransform(iconScrollProgress, [0, 0.6, 1], [1, 1.65, 1.65])

  const handleTitleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const reachedStart = event.clientX <= bounds.left + 1
    const reveal = reachedStart
      ? 1
      : Math.min(
          1,
          Math.max(0, (event.clientX - bounds.left) / bounds.width),
        )

    event.currentTarget.style.setProperty(
      '--title-reveal',
      `${reveal * 100}%`,
    )
  }

  const handleTitleMouseLeave = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()

    if (event.clientX <= bounds.left + 1) {
      event.currentTarget.style.setProperty('--title-reveal', '100%')
    }
  }

  useLayoutEffect(() => {
    const glow = glowRef.current
    const cluster = clusterRef.current
    const appsLayer = appsRef.current
    const phoneSlot = phoneSlotRef.current
    const phone = phoneRef.current
    if (!glow || !cluster || !appsLayer || !phoneSlot || !phone) return undefined

    const measureOffsets = () => {
      const centerX = glow.offsetLeft + glow.offsetWidth / 2
      const centerY = glow.offsetTop + glow.offsetHeight / 2
      const clusterRect = cluster.getBoundingClientRect()
      const slotRect = phoneSlot.getBoundingClientRect()
      const measuredIcon = iconRefs.current[APP_ICONS[0].id]
      const layoutIconSize = measuredIcon?.offsetWidth || ICON_LAYOUT_SIZE
      const appsScale = getElementScaleX(appsLayer)
      const originX = appsLayer.offsetWidth / 2
      const originY = appsLayer.offsetHeight / 2
      const phoneWidth = phone.offsetWidth
      const isNarrowPhone = window.matchMedia(NARROW_PHONE_QUERY).matches
      const visualPhoneIcon = isNarrowPhone
        ? Math.min(NARROW_PHONE_ICON_MAX, phoneWidth * NARROW_PHONE_ICON_RATIO)
        : (phoneWidth * FIGMA_ICON_SIZE) / FIGMA_PHONE_WIDTH
      const visualPhoneGap = isNarrowPhone
        ? Math.max(NARROW_PHONE_GAP_MIN, phoneWidth * NARROW_PHONE_GAP_RATIO)
        : (phoneWidth * (FIGMA_SPACING_X - FIGMA_ICON_SIZE)) / FIGMA_PHONE_WIDTH
      const nextPhoneScale = isNarrowPhone
        ? visualPhoneIcon / (layoutIconSize * appsScale)
        : Math.min(1, visualPhoneIcon / (layoutIconSize * appsScale))
      const spacingX = visualPhoneIcon + visualPhoneGap
      const spacingY = visualPhoneIcon + visualPhoneGap
      const phoneLeft = slotRect.left - clusterRect.left + phone.offsetLeft
      const phoneTop = slotRect.top - clusterRect.top + phone.offsetTop
      const phoneTargetX = phoneLeft + phoneWidth / 2
      const phoneTargetY =
        phoneTop +
        (phoneWidth * FIGMA_FIRST_ROW_FROM_TOP) / FIGMA_PHONE_WIDTH +
        spacingY
      const nextOffsets = {}

      APP_ICONS.forEach(
        ({
          id,
          phoneColumn,
          phoneRow,
        }) => {
          const icon = iconRefs.current[id]
          if (!icon) return

          const finalCenterX = icon.offsetLeft + icon.offsetWidth / 2
          const finalCenterY = icon.offsetTop + icon.offsetHeight / 2
          const initialCenterX = centerX
          const initialCenterY = centerY

          const phoneCenterX = phoneTargetX + phoneColumn * spacingX
          const phoneCenterY = phoneTargetY + phoneRow * spacingY

          nextOffsets[id] = {
            initial: {
              x: initialCenterX - finalCenterX,
              y: initialCenterY - finalCenterY,
            },
            phone: {
              x:
                originX +
                (phoneCenterX - originX) / appsScale -
                finalCenterX,
              y:
                originY +
                (phoneCenterY - originY) / appsScale -
                finalCenterY,
            },
          }
        },
      )

      setPhoneIconScale(nextPhoneScale)
      setOffsets(nextOffsets)
    }

    measureOffsets()

    const narrowPhoneQuery = window.matchMedia(NARROW_PHONE_QUERY)
    narrowPhoneQuery.addEventListener('change', measureOffsets)

    const resizeObserver = new ResizeObserver(measureOffsets)
    resizeObserver.observe(cluster)
    resizeObserver.observe(appsLayer)
    resizeObserver.observe(glow)
    resizeObserver.observe(phoneSlot)
    resizeObserver.observe(phone)
    APP_ICONS.forEach(({ id }) => {
      const icon = iconRefs.current[id]
      if (icon) resizeObserver.observe(icon)
    })

    return () => {
      narrowPhoneQuery.removeEventListener('change', measureOffsets)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="floating-apps"
      aria-label="Sahajanand mobile applications"
      style={{
        '--floating-apps-scroll': `${FLOATING_APPS_SCROLL_PX}px`,
      }}
    >
      <div className="floating-apps__stage">
        <div
          ref={clusterRef}
          className="floating-apps__cluster"
          aria-hidden="true"
        >
          <div className="floating-apps__glow-scale">
            <motion.img
              ref={glowRef}
              className="floating-apps__glow"
              src={siGlow}
              alt=""
              style={{ scale: glowScale, transformOrigin: 'center center' }}
            />
          </div>

          <motion.div
            ref={phoneSlotRef}
            className="floating-apps__phone-slot"
            style={{ opacity: phoneOpacity }}
          >
            <span
              className="floating-apps__phone-title"
              onMouseMove={handleTitleMouseMove}
              onMouseLeave={handleTitleMouseLeave}
            >
              <span className="floating-apps__phone-title-text">
                Mobile App
              </span>
            </span>
            <motion.div
              ref={phoneRef}
              className="floating-apps__phone"
              style={{
                y: phoneY,
                scale: phoneScale,
              }}
            >
              <div className="floating-apps__status-bar">
                <span className="floating-apps__status-time">5:13</span>
                <span className="floating-apps__status-icons">
                  <svg
                    className="floating-apps__status-signal"
                    viewBox="0 0 16 10"
                    aria-hidden="true"
                  >
                    <rect x="0" y="7" width="3" height="3" rx="1" />
                    <rect x="4.3" y="5" width="3" height="5" rx="1" />
                    <rect x="8.6" y="2.5" width="3" height="7.5" rx="1" />
                    <rect x="13" y="0" width="3" height="10" rx="1" />
                  </svg>
                  <svg
                    className="floating-apps__status-wifi"
                    viewBox="0 0 15 11"
                    aria-hidden="true"
                  >
                    <path d="M.5 3.5a10.9 10.9 0 0 1 14 0L12.7 5.4a8.2 8.2 0 0 0-10.4 0L.5 3.5Zm3.1 3.2a6.1 6.1 0 0 1 7.8 0L9.5 8.6a3.4 3.4 0 0 0-4 0L3.6 6.7ZM6.4 9.8a1.55 1.55 0 0 1 2.2 0L7.5 11 6.4 9.8Z" />
                  </svg>
                  <svg
                    className="floating-apps__status-battery"
                    viewBox="0 0 22 11 "
                    aria-hidden="true"
                  >
                    <path
                      className="floating-apps__status-battery-cap"
                      d="M17 1.4h1.5c1.2 0 2 .6 2.4 1.6L22 5.5 20.9 8c-.4 1-1.2 1.6-2.4 1.6H17V1.4Z"
                    />
                    <rect width="18.5" height="11" rx="3.4" />
                    <text x="9.25" y="7.7" textAnchor="middle">
                      76
                    </text>
                  </svg>
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div ref={appsRef} className="floating-apps__icons-scale">
            {APP_ICONS.map((icon, stackIndex) => (
              <AnimatedIcon
                key={icon.id}
                icon={icon}
                progress={iconScrollProgress}
                initialOffset={offsets[icon.id]?.initial ?? { x: 0, y: 0 }}
                phoneOffset={offsets[icon.id]?.phone ?? { x: 0, y: 0 }}
                phoneScale={phoneIconScale}
                phoneLift={phoneY}
                stackIndex={stackIndex}
                setRef={(node) => {
                  iconRefs.current[icon.id] = node
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FloatingApps
