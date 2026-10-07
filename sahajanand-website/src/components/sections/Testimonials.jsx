import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ViewportReveal } from '../motion/Reveal'
import PeekCarousel from '../common/PeekCarousel'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import test1 from '../../assets/images/test-1.png'
import test2 from '../../assets/images/test-2.png'
import test3 from '../../assets/images/test-3.png'
import test4 from '../../assets/images/test-4.png'
import test5 from '../../assets/images/test-5.png'
import test6 from '../../assets/images/test-6.png'
import test7 from '../../assets/images/test-7.png'
import './Testimonials.css'

/* Product-based reviews: each one is about one of the apps on the Our Products page, but the product name is never shown */
const TESTIMONIALS = [
  {
    id: 'messenger',
    name: 'James Wilson',
    image: test1,
    text: 'I use it every day to chat with my family back home. Conversations load fast and I never miss a message from my team.',
  },
  {
    id: 'alarm-clock',
    name: 'Olivia Carter',
    image: test2,
    text: 'I set my morning alarm and a few reminders for meetings, and I have not overslept once since I started using it.',
  },
  {
    id: 'cleaner',
    name: 'Daniel Brooks',
    image: test3,
    text: 'My inbox was full of old promotional texts. I cleared them out in a few taps and now I can find the messages that matter.',
  },
  {
    id: 'gallery',
    name: 'Emily Anderson',
    image: test4,
    text: 'After a holiday I had hundreds of photos and videos. I sorted them into albums and now I find any picture in seconds.',
  },
  {
    id: 'notes',
    name: 'Michael Taylor',
    image: test5,
    text: 'I write my shopping lists and work to-dos here. Creating a new note is quick and I can go back and edit it any time.',
  },
  {
    id: 'pdf-editor',
    name: 'Sophia Miller',
    image: test6,
    text: 'I had to sign and merge a few contracts on my phone. It took minutes, and I did not need to open my laptop.',
  },
  {
    id: 'calculator',
    name: 'Ethan Johnson',
    image: test7,
    text: 'Fast and accurate calculator with a clear layout. The history feature saves me time on everyday calculations.',
  },
]

/* Same movement pattern as the Our Services carousel: three cards on desktop with the middle one in front,
   and the shared peek carousel (neighbours beside the current card) on tablet and phone. */
const AUTOPLAY_MS = 2000
const MOVE_MS = 700
const GAP_PX = 25
const DESKTOP_VISIBLE = 3
const PEEK_QUERY = '(max-width: 991px)'

function TestimonialContent({ item }) {
  return (
    <>
      <div className="testimonials__person">
        <img className="testimonials__avatar" src={item.image} alt="" loading="lazy" />
        <strong className="testimonials__name">{item.name}</strong>
      </div>
      <p className="testimonials__text">{item.text}</p>
      <span className="testimonials__stars" role="img" aria-label="5 out of 5 stars">
        ★★★★★
      </span>
    </>
  )
}

function Testimonials() {
  const reduceMotion = useReducedMotion()
  const isPeek = useMediaQuery(PEEK_QUERY)
  const count = TESTIMONIALS.length

  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [peekActive, setPeekActive] = useState(0)

  /* The first three cards are repeated after the last one, so the loop restarts without a visible jump */
  const trackItems = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, DESKTOP_VISIBLE)]
  const cardStep = `((100% - ${(DESKTOP_VISIBLE - 1) * GAP_PX}px) / ${DESKTOP_VISIBLE} + ${GAP_PX}px)`

  /* Switching between the desktop track and the peek carousel starts again from the first card */
  useEffect(() => {
    setAnimate(false)
    setIndex(0)
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setAnimate(true))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [isPeek])

  /* Desktop: the whole row slides by one card every 2 seconds (the peek carousel has its own autoplay) */
  useEffect(() => {
    if (isPeek || reduceMotion) return undefined

    const timer = window.setInterval(() => {
      if (document.hidden) return
      setAnimate(true)
      setIndex((current) => current + 1)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [isPeek, reduceMotion])

  /* After sliding onto the repeated cards, silently return to the identical first cards */
  useEffect(() => {
    if (isPeek || index < count) return undefined

    let frame = 0
    const timer = window.setTimeout(() => {
      setAnimate(false)
      setIndex(index - count)
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => setAnimate(true))
      })
    }, MOVE_MS + 30)

    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(frame)
    }
  }, [index, count, isPeek])

  /* The middle card of the three is the one in front */
  const highlightedItem = index + 1
  const activeDot = isPeek ? peekActive : highlightedItem % count

  return (
    <section className="testimonials" id="testimonials" aria-label="Testimonials">
      <div className="testimonials__inner">
        <header className="testimonials__header">
          <ViewportReveal as="p" className="testimonials__eyebrow" scale={1} y={28} duration={1}>
            Testimonials
          </ViewportReveal>
          <ViewportReveal
            as="h2"
            className="testimonials__heading"
            scale={1}
            y={28}
            duration={1}
            delay={0.18}
          >
            What our clients say <br />
            about working with us.
          </ViewportReveal>
        </header>

        <div
          className="testimonials__slider"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          {isPeek ? (
            <PeekCarousel
              items={TESTIMONIALS}
              getKey={(item) => item.id}
              label="Client testimonials"
              autoplayMs={AUTOPLAY_MS}
              onActiveChange={setPeekActive}
              renderItem={(item, { active }) => (
                <div className={`testimonials__card${active ? ' is-active' : ''}`}>
                  <TestimonialContent item={item} />
                </div>
              )}
            />
          ) : (
            <div className="testimonials__viewport">
              <ul
                className={`testimonials__track${animate ? '' : ' is-instant'}`}
                style={{
                  gap: `${GAP_PX}px`,
                  transform: `translate3d(calc(-${index} * ${cardStep}), 0, 0)`,
                  transition: animate
                    ? `transform ${MOVE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                    : 'none',
                  '--testimonials-move': `${MOVE_MS}ms`,
                }}
              >
                {trackItems.map((item, itemIndex) => {
                  const isClone = itemIndex >= count

                  return (
                    <li
                      key={`${item.id}-${isClone ? 'clone' : 'main'}`}
                      className={`testimonials__card${
                        itemIndex === highlightedItem ? ' is-active' : ' is-side'
                      }`}
                      style={{
                        flex: `0 0 calc((100% - ${(DESKTOP_VISIBLE - 1) * GAP_PX}px) / ${DESKTOP_VISIBLE})`,
                      }}
                      aria-hidden={isClone ? true : undefined}
                    >
                      <TestimonialContent item={item} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <div className="testimonials__dots" aria-hidden="true">
            {TESTIMONIALS.map((item, dotIndex) => (
              <span
                key={item.id}
                className={`testimonials__dot${dotIndex === activeDot ? ' is-active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
