import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const VIEWPORT = {
  once: true,
  amount: 'some',
  margin: '0px 0px -32px 0px',
}

function motionTarget(as, reduceMotion) {
  return reduceMotion ? as : motion[as]
}

function hiddenState({ y = 28, x = 0, scale }) {
  const hidden = { opacity: 0 }
  const shown = { opacity: 1 }

  if (y) {
    hidden.y = y
    shown.y = 0
  }
  if (x) {
    hidden.x = x
    shown.x = 0
  }
  if (scale != null && scale !== 1) {
    hidden.scale = scale
    shown.scale = 1
  }

  return { hidden, shown }
}

export function Reveal({
  as = 'div',
  className,
  children,
  y = 28,
  x = 0,
  scale,
  delay = 0,
  duration = 0.85,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const Tag = motionTarget(as, reduceMotion)

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const { hidden, shown } = hiddenState({ y, x, scale })

  return (
    <Tag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Plays once when `threshold` of the element is inside the viewport (IntersectionObserver) */
export function ViewportReveal({
  as = 'div',
  className,
  children,
  scale = 0.92,
  y = 0,
  duration = 0.9,
  delay = 0,
  threshold = 0.2,
  fade = true,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || reduceMotion) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, threshold])

  const Tag = motionTarget(as, reduceMotion)

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const hidden = { opacity: fade ? 0 : 1, scale, y }
  const shown = { opacity: 1, scale: 1, y: 0 }

  return (
    <Tag
      ref={ref}
      className={className}
      initial={hidden}
      animate={isVisible ? shown : hidden}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealGroup({
  as = 'div',
  className,
  children,
  stagger = 0.12,
  delayChildren = 0.04,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const Tag = motionTarget(as, reduceMotion)

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({
  as = 'div',
  className,
  children,
  y = 28,
  x = 0,
  scale,
  duration = 0.85,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const Tag = motionTarget(as, reduceMotion)

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const { hidden, shown } = hiddenState({ y, x, scale })

  return (
    <Tag
      className={className}
      variants={{
        hidden,
        visible: {
          ...shown,
          transition: { duration, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
