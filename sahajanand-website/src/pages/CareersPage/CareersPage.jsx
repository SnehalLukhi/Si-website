import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Reveal } from '../../components/motion/Reveal'
import '../../components/common/Button.css'
import heroPhoto from '../../assets/images/photos/image6.png'
import lifeMain from '../../assets/images/photos/image3.png'
import lifeLawn from '../../assets/images/info-1.png'
import lifeHill from '../../assets/images/photos/image7.png'
import lifeFlags from '../../assets/images/info-2.png'
import lifeOutdoor from '../../assets/images/info-4.png'
import lifeOffice from '../../assets/images/photos/image8.png'
import './CareersPage.css'

const API_URL = import.meta.env.VITE_API_URL ?? ''

/* Simple outline icons (24 x 24, drawn with the current text colour) */
const ICONS = {
  learn: (
    <>
      <path d="M3 8.5 12 4l9 4.5-9 4.5z" />
      <path d="M7 11v4.2c0 1.2 2.2 2.8 5 2.8s5-1.6 5-2.8V11M21 8.5v5" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 19.5c.4-3.3 3-5.2 6.2-5.2s5.8 1.9 6.2 5.2" />
      <path d="M16 5.6a3.1 3.1 0 0 1 0 5.8M18 14.6c1.7.7 2.9 2.2 3.2 4.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  growth: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="M7 15.5l4-4.5 3 2.8 5.5-6.3M15.5 7.5h4v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2.2" />
      <path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M3 13h18" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
}

function Icon({ name, className = 'car__icon' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

const BENEFITS = [
  {
    icon: 'learn',
    title: 'Growth & Learning',
    text: 'Learn new technologies, improve your skills and grow with challenging projects.',
  },
  {
    icon: 'team',
    title: 'Collaborative Culture',
    text: 'Work with a supportive team where ideas, knowledge and feedback are valued.',
  },
  {
    icon: 'target',
    title: 'Meaningful Work',
    text: 'Build real digital solutions that create value for businesses and users.',
  },
  {
    icon: 'growth',
    title: 'Career Growth',
    text: 'Take ownership, develop your expertise and build a long-term career with us.',
  },
]

const LIFE_PHOTOS = [
  { id: 'main', src: lifeMain, alt: 'The Sahajanand Infotech team celebrating together' },
  { id: 'lawn', src: lifeLawn, alt: 'The Sahajanand Infotech team on an outing' },
  { id: 'hill', src: lifeHill, alt: 'The team enjoying a trip together' },
  { id: 'flags', src: lifeFlags, alt: 'The team celebrating together' },
  { id: 'outdoor', src: lifeOutdoor, alt: 'The team outdoors' },
  { id: 'office', src: lifeOffice, alt: 'The team at the office' },
]

/* Two sideways-scrolling photo rows (same arrangement as "A Little Corner of Sahajanand") */
function LifeMarqueeRow({ photos, reverse = false }) {
  const loop = [...photos, ...photos]
  return (
    <div className={`car__life-row${reverse ? ' car__life-row--ltr' : ''}`}>
      <div className="car__life-track">
        {[0, 1].map((copy) => (
          <div className="car__life-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {loop.map((photo, i) => (
              <div className="car__life-tile" key={`${photo.id}-${i}`}>
                <img
                  src={photo.src}
                  alt={copy === 0 && i < photos.length ? photo.alt : ''}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const CULTURE = [
  { title: 'Learn', text: 'Keep learning, exploring and improving.' },
  { title: 'Collaborate', text: 'Work together, share ideas and support each other.' },
  { title: 'Create', text: 'Turn ideas into useful and meaningful digital solutions.' },
  { title: 'Grow', text: 'Grow your skills, responsibilities and career.' },
]

const HIRING = [
  { title: 'Apply', text: 'Submit your application for a suitable position.' },
  { title: 'Review', text: 'Our team reviews your profile and experience.' },
  { title: 'Interview', text: 'Meet the team and discuss your skills and goals.' },
  { title: 'Selection', text: 'Move forward and start your journey with us.' },
]

const RISE_PX = 28
const STAGGER_S = 0.1

/* Bottom-up fade, once, with a small stagger between neighbours */
function Rise({ as, className, delay = 0, children, ...rest }) {
  return (
    <Reveal as={as} className={className} y={RISE_PX} duration={0.8} delay={delay} {...rest}>
      {children}
    </Reveal>
  )
}

function JobCard({ job, index }) {
  const details = [
    { icon: 'pin', value: job.location?.trim() },
    { icon: 'clock', value: job.type?.trim() },
    { icon: 'briefcase', value: job.experience?.trim() },
  ].filter((item) => item.value)

  return (
    <Rise as="li" className="car__job" delay={(index % 3) * STAGGER_S}>
      {job.category?.trim() && <span className="car__job-tag">{job.category.trim()}</span>}
      <h3 className="car__job-title">{job.title}</h3>
      <ul className="car__job-meta">
        {details.map((item) => (
          <li key={item.icon}>
            <Icon name={item.icon} className="car__job-meta-icon" />
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
      <a className="car__job-link" href="/careers/full">
        View Position
        <Icon name="arrow" className="car__job-link-icon" />
      </a>
    </Rise>
  )
}

function CareersPage() {
  const reduceMotion = useReducedMotion()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* The open positions come from the existing jobs API (the jobs added in the admin panel).
     A job card opens the full jobs page (/careers/full). */
  useEffect(() => {
    let cancelled = false

    const loadJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/jobs`)
        const data = await response.json()

        if (!response.ok || !data.success) throw new Error(data.message || 'Failed to fetch jobs')
        if (!cancelled) setJobs(Array.isArray(data.jobs) ? data.jobs : [])
      } catch (error) {
        console.error('Failed to fetch careers jobs:', error)
        if (!cancelled) setFailed(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadJobs()

    return () => {
      cancelled = true
    }
  }, [])

  const scrollToPositions = (event) => {
    event.preventDefault()
    document
      .getElementById('open-positions')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="car">
      <Header homePath="/" />

      {/* 1. Hero */}
      <section className="car__hero" aria-labelledby="car-hero-title">
        <div className="car__container car__hero-inner">
          <div className="car__hero-copy">
            <Rise as="p" className="car__label">
              Careers
            </Rise>
            <Rise as="h1" className="car__hero-title" id="car-hero-title" delay={STAGGER_S}>
              Build Your Future With Us
            </Rise>
            <Rise as="p" className="car__hero-text" delay={STAGGER_S * 2}>
              Join a passionate team that builds meaningful digital solutions, learns continuously,
              and grows together.
            </Rise>
            <Rise className="car__hero-actions" delay={STAGGER_S * 3}>
              <a className="button car__button" href="#open-positions" onClick={scrollToPositions}>
                View Open Positions
              </a>
            </Rise>
            <Rise as="nav" className="car__breadcrumb" delay={STAGGER_S * 4} aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="car__breadcrumb-dot" aria-hidden="true" />
              <span aria-current="page">Careers</span>
            </Rise>
          </div>
          <Rise className="car__hero-media" delay={STAGGER_S * 2}>
            <img src={heroPhoto} alt="The Sahajanand Infotech team together at the office" />
          </Rise>
        </div>
      </section>

      {/* 2. Why work with us */}
      <section className="car__section" aria-labelledby="car-why-title">
        <div className="car__container">
          <div className="car__intro">
            <Rise as="p" className="car__label">
              Why Join Us
            </Rise>
            <Rise as="h2" className="car__heading" id="car-why-title" delay={STAGGER_S}>
              Why Work With Us?
            </Rise>
            <Rise as="p" className="car__text" delay={STAGGER_S * 2}>
              We believe great products are built by great people. At Sahajanand Infotech, we create
              an environment where people can learn, contribute, collaborate and grow.
            </Rise>
          </div>
          <ul className="car__benefits">
            {BENEFITS.map((item, index) => (
              <Rise as="li" className="car__benefit" key={item.title} delay={(index % 4) * STAGGER_S}>
                <span className="car__benefit-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="car__benefit-icon">
                  <Icon name={item.icon} />
                </span>
                <h3 className="car__card-title">{item.title}</h3>
                <p className="car__card-text">{item.text}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Life at Sahajanand Infotech */}
      <section className="car__section car__section--soft" aria-labelledby="car-life-title">
        <div className="car__container">
          <div className="car__intro">
            <Rise as="p" className="car__label">
              Our People
            </Rise>
            <Rise as="h2" className="car__heading" id="car-life-title" delay={STAGGER_S}>
              Life at Sahajanand Infotech
            </Rise>
            <Rise as="p" className="car__text" delay={STAGGER_S * 2}>
              More than a workplace, we are a team of people who collaborate, learn, create and grow
              together.
            </Rise>
          </div>
          <div className="car__life">
            <LifeMarqueeRow photos={LIFE_PHOTOS.slice(0, 3)} />
            <LifeMarqueeRow photos={LIFE_PHOTOS.slice(3)} reverse />
          </div>
        </div>
      </section>

      {/* 4. Our culture */}
      <section className="car__section" aria-labelledby="car-culture-title">
        <div className="car__container">
          <div className="car__intro">
            <Rise as="p" className="car__label">
              What We Value
            </Rise>
            <Rise as="h2" className="car__heading" id="car-culture-title" delay={STAGGER_S}>
              Our Culture
            </Rise>
          </div>
          <ul className="car__culture">
            {CULTURE.map((item, index) => (
              <Rise as="li" className="car__culture-item" key={item.title} delay={index * STAGGER_S}>
                <span className="car__culture-number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="car__culture-title">{item.title}</h3>
                <p className="car__culture-text">{item.text}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Open positions (the jobs added in the admin panel) */}
      <section
        className="car__section car__section--soft car__positions"
        id="open-positions"
        aria-labelledby="car-positions-title"
      >
        <div className="car__container">
          <div className="car__intro">
            <Rise as="p" className="car__label">
              Join the Team
            </Rise>
            <Rise as="h2" className="car__heading" id="car-positions-title" delay={STAGGER_S}>
              Open Positions
            </Rise>
            <Rise as="p" className="car__text" delay={STAGGER_S * 2}>
              Explore opportunities and find the role where you can make your next career move.
            </Rise>
          </div>

          {loading ? (
            <p className="car__state">Loading open positions...</p>
          ) : failed ? (
            <p className="car__state">We could not load the open positions right now. Please try again shortly.</p>
          ) : jobs.length === 0 ? (
            <p className="car__state">There are no open positions at the moment. Please check back soon.</p>
          ) : (
            <ul className="car__jobs">
              {jobs.map((job, index) => (
                <JobCard job={job} index={index} key={job._id} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 6. How we hire */}
      <section className="car__section" aria-labelledby="car-hire-title">
        <div className="car__container">
          <div className="car__intro">
            <Rise as="p" className="car__label">
              Our Process
            </Rise>
            <Rise as="h2" className="car__heading" id="car-hire-title" delay={STAGGER_S}>
              How We Hire
            </Rise>
          </div>
          <ol className="car__hiring">
            {HIRING.map((step, index) => (
              <Rise as="li" className="car__step" key={step.title} delay={index * 0.08}>
                <span className="car__step-number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="car__step-title">{step.title}</h3>
                <p className="car__step-text">{step.text}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="car__section car__section--cta" aria-labelledby="car-cta-title">
        <div className="car__container">
          <Rise className="car__cta">
            <h2 className="car__cta-title" id="car-cta-title">
              Ready to Grow With Us?
            </h2>
            <p className="car__cta-text">
              Explore our open positions and take the next step in your career.
            </p>
            <a className="button car__button" href="#open-positions" onClick={scrollToPositions}>
              View Open Positions
            </a>
          </Rise>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CareersPage
