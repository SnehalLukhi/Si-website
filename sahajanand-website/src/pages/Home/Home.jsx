import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Header from '../../components/layout/Header'
import Hero from '../../components/sections/Hero'
import FloatingApps from '../../components/sections/FloatingApps'
import Services from '../../components/sections/Services'
import Testimonials from '../../components/sections/Testimonials'
import Blog from '../../components/sections/Blog'
import Footer from '../../components/layout/Footer'
import { Reveal } from '../../components/motion/Reveal'
import { isBlogHash, scrollToBlog } from '../../utils/scrollToBlog'
import { handleHashOnArrival } from '../../utils/homeSections'
import sky from '../../images/claude.png'
import logo from '../../assets/images/logo.png'
import infoOne from '../../assets/images/info-1.png'
import infoTwo from '../../assets/images/info-2.png'
import infoThree from '../../assets/images/info-3.png'
import infoFour from '../../assets/images/info-4.png'
import './Home.css'

const ABOUT_SLIDE_X = -80
const ABOUT_SLIDE_RIGHT_X = 80
const ABOUT_SLIDE_EASE = [0.33, 1, 0.68, 1]

function aboutSlide(delay, duration = 1.1) {
  return { duration, delay, ease: ABOUT_SLIDE_EASE }
}

const STATS_SCALE = 0.9

function statsReveal(delay) {
  return { duration: 1, delay, ease: ABOUT_SLIDE_EASE }
}

const MOBILE_QUERY = '(max-width: 991px)'
const ABOUT_MOBILE_RISE_PX = 40
const ABOUT_MOBILE_STAGGER_S = 0.15
const ABOUT_AFTER_HERO_DELAY_S = 0.1
/* Hero intro takes ~1.3s; stop waiting if its completion never fires (e.g. page opened scrolled past it) */
const HERO_INTRO_FALLBACK_MS = 2500
/* Around 676px the lower About content is already on screen with the hero, so it is held until the logo + text have played */
const SEQUENCE_QUERY = '(min-width: 640px) and (max-width: 720px)'
/* logo + heading + paragraph: last start delay (0.1 + 2 x 0.15) + their 0.6s duration */
const ABOUT_TOP_DONE_MS = (ABOUT_AFTER_HERO_DELAY_S + 2 * ABOUT_MOBILE_STAGGER_S + 0.6) * 1000

const FUTURE_COPY_RISE_PX = 40
const FUTURE_COPY_STAGGER_S = 0.15

function futureCopyReveal(delay) {
  return { duration: 0.6, delay, ease: ABOUT_SLIDE_EASE }
}

const FUTURE_HEADING = (
  <>
    Future-ready,
    <br />
    Always Evolving
  </>
)

const FUTURE_DESCRIPTION = (
  <>
    From early-stage ideas to long-term vision, we create
    <br />
    products with a future-first mindset. Our journey is
    <br />
    not just about fast scaling — it&apos;s about smart,
    <br />
    responsible innovation.
  </>
)

function useMediaMatch(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

const useIsMobile = () => useMediaMatch(MOBILE_QUERY)

function AboutLogoSection({ heroIntroDone }) {
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  /* On mobile the section is in view with the hero: it holds its start pose until the hero intro ends */
  const waitForHero = isMobile && !heroIntroDone && !reduceMotion
  /* Mobile: logo, heading, paragraph rise one by one once the hero intro has finished */
  /* ~676px only: lower content waits until the logo + text have finished */
  const sequenceLower = useMediaMatch(SEQUENCE_QUERY) && isMobile && !reduceMotion
  const [topDone, setTopDone] = useState(false)

  useEffect(() => {
    if (!sequenceLower || !heroIntroDone) return undefined

    const timer = window.setTimeout(() => setTopDone(true), ABOUT_TOP_DONE_MS)
    return () => window.clearTimeout(timer)
  }, [sequenceLower, heroIntroDone])

  const holdLower = (pose) =>
    sequenceLower && !topDone ? { whileInView: pose } : {}

  const mobileRise = (index) => ({
    y: ABOUT_MOBILE_RISE_PX,
    transition: aboutSlide(ABOUT_AFTER_HERO_DELAY_S + index * ABOUT_MOBILE_STAGGER_S, 0.6),
    ...(waitForHero ? { whileInView: { opacity: 0, y: ABOUT_MOBILE_RISE_PX } } : {}),
  })

  const aboutText = (
    <>
      <h2 className="about-logo__heading">
        <span>We are</span>
        <span className="about-logo__heading-name">SAHAJANAND INFO</span>
      </h2>
      <p className="about-logo__description">
        SAHAJANAND INFO is a young, dynamic start-up, founded
        <br />
        by a team of experienced leaders in the mobile industry.
      </p>
    </>
  )

  return (
    <section
      className="about-logo"
      id="about"
      aria-label="About Sahajanand Infotech"
    >
      {isMobile ? (
        <div className="about-logo__content">
          <Reveal
            as="img"
            className="about-logo__image"
            src={logo}
            alt="Sahajanand Infotech"
            {...mobileRise(0)}
          />
          <div className="about-logo__text">
            <Reveal as="h2" className="about-logo__heading" {...mobileRise(1)}>
              <span>We are</span>
              <span className="about-logo__heading-name">SAHAJANAND INFO</span>
            </Reveal>
            <Reveal as="p" className="about-logo__description" {...mobileRise(2)}>
              SAHAJANAND INFO is a young, dynamic start-up, founded
              <br />
              by a team of experienced leaders in the mobile industry.
            </Reveal>
          </div>
        </div>
      ) : (
        <div className="about-logo__content">
          <Reveal
            as="img"
            className="about-logo__image"
            src={logo}
            alt="Sahajanand Infotech"
            x={ABOUT_SLIDE_X}
            y={0}
            transition={aboutSlide(0)}
          />
          <Reveal
            className="about-logo__text"
            x={ABOUT_SLIDE_RIGHT_X}
            y={0}
            transition={aboutSlide(0, 1.2)}
          >
            {aboutText}
          </Reveal>
        </div>
      )}
      <div className="about-logo__future">
        <div className="about-logo__future-left">
          {isMobile ? (
            <div className="about-logo__future-copy">
              <Reveal
                as="h3"
                className="about-logo__future-heading"
                y={FUTURE_COPY_RISE_PX}
                transition={futureCopyReveal(0)}
                {...holdLower({ opacity: 0, y: FUTURE_COPY_RISE_PX })}
              >
                {FUTURE_HEADING}
              </Reveal>
              <Reveal
                as="p"
                className="about-logo__future-description"
                y={FUTURE_COPY_RISE_PX}
                transition={futureCopyReveal(FUTURE_COPY_STAGGER_S)}
                {...holdLower({ opacity: 0, y: FUTURE_COPY_RISE_PX })}
              >
                {FUTURE_DESCRIPTION}
              </Reveal>
            </div>
          ) : (
            <Reveal
              className="about-logo__future-copy"
              x={ABOUT_SLIDE_X}
              y={0}
              transition={aboutSlide(0.18)}
            >
              <h3 className="about-logo__future-heading">{FUTURE_HEADING}</h3>
              <p className="about-logo__future-description">{FUTURE_DESCRIPTION}</p>
            </Reveal>
          )}
          <Reveal
            as="img"
            className="about-logo__info-one"
            src={infoOne}
            alt="Sahajanand Infotech team"
            x={ABOUT_SLIDE_X}
            y={0}
            transition={aboutSlide(0.36)}
            {...holdLower({ opacity: 0, x: ABOUT_SLIDE_X })}
          />
        </div>
        <div className="about-logo__gallery">
          <Reveal
            className="about-logo__info-two-frame"
            x={ABOUT_SLIDE_RIGHT_X}
            y={0}
            transition={aboutSlide(0.18, 1.2)}
            {...holdLower({ opacity: 0, x: ABOUT_SLIDE_RIGHT_X })}
          >
            <img
              className="about-logo__info-two"
              src={infoTwo}
              alt="Sahajanand Infotech team celebrating together"
            />
          </Reveal>
          <div className="about-logo__gallery-bottom">
            <Reveal
              className="about-logo__gallery-small"
              x={ABOUT_SLIDE_RIGHT_X}
              y={0}
              transition={aboutSlide(0.36, 1.2)}
              {...holdLower({ opacity: 0, x: ABOUT_SLIDE_RIGHT_X })}
            >
              <img
                className="about-logo__info-three"
                src={infoThree}
                alt="Sahajanand Infotech office team"
              />
            </Reveal>
            <Reveal
              className="about-logo__gallery-small"
              x={ABOUT_SLIDE_RIGHT_X}
              y={0}
              transition={aboutSlide(0.54, 1.2)}
              {...holdLower({ opacity: 0, x: ABOUT_SLIDE_RIGHT_X })}
            >
              <img
                className="about-logo__info-four"
                src={infoFour}
                alt="Sahajanand Infotech outdoor team"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="stats" aria-label="Company statistics">
      <div className="stats__list">
        <Reveal className="stats__card" y={0} scale={STATS_SCALE} transition={statsReveal(0)}>
          <strong className="stats__value">280</strong>
          <span className="stats__label">Fully launched apps</span>
        </Reveal>
        <Reveal className="stats__card" y={0} scale={STATS_SCALE} transition={statsReveal(0.2)}>
          <strong className="stats__value">1.8B+</strong>
          <span className="stats__label">Downloads worldwide</span>
        </Reveal>
        <Reveal className="stats__card" y={0} scale={STATS_SCALE} transition={statsReveal(0.4)}>
          <strong className="stats__value">160+</strong>
          <span className="stats__label">Countries reached</span>
        </Reveal>
      </div>
    </section>
  )
}

function Home() {
  const [heroIntroDone, setHeroIntroDone] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroIntroDone(true), HERO_INTRO_FALLBACK_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let frameId = 0
    let cancelHashScroll = () => {}
    if (isBlogHash()) {
      frameId = window.requestAnimationFrame(() => scrollToBlog({ arrival: true }))
    } else {
      cancelHashScroll = handleHashOnArrival()
    }

    const onHashChange = () => {
      if (isBlogHash()) scrollToBlog()
    }
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.cancelAnimationFrame(frameId)
      cancelHashScroll()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return (
    <>
      <div className="home">
        <div className="home__sky" aria-hidden="true">
          <img className="home__sky-image" src={sky} alt="" />
        </div>
        <Header />
        <Hero onIntroComplete={() => setHeroIntroDone(true)} />
      </div>
      <AboutLogoSection heroIntroDone={heroIntroDone} />
      <StatsSection />
      <FloatingApps />
      <Services />
      <Testimonials />
      <Blog />
      <Footer />
    </>
  )
}

export default Home
