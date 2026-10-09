import { useEffect } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Reveal } from '../../components/motion/Reveal'
import '../../components/common/Button.css'
import photo1 from '../../assets/images/photos/image1.png'
import photo2 from '../../assets/images/photos/image2.png'
import photo3 from '../../assets/images/photos/image3.png'
import photo4 from '../../assets/images/photos/image4.png'
import photo5 from '../../assets/images/photos/image5.png'
import photo6 from '../../assets/images/photos/image6.png'
import photo7 from '../../assets/images/photos/image7.png'
import photo8 from '../../assets/images/photos/image8.png'
import info1 from '../../assets/images/info-1.png'
import info2 from '../../assets/images/info-2.png'
import info3 from '../../assets/images/info-3.png'
import info4 from '../../assets/images/info-4.png'
import './LifePage.css'

/* Simple outline icons (24 x 24, drawn with the current text colour) */
const ICONS = {
  collaboration: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 19.5c.4-3.3 3-5.2 6.2-5.2s5.8 1.9 6.2 5.2" />
      <path d="M16 5.6a3.1 3.1 0 0 1 0 5.8M18 14.6c1.7.7 2.9 2.2 3.2 4.4" />
    </>
  ),
  learning: (
    <>
      <path d="M3 8.5 12 4l9 4.5-9 4.5z" />
      <path d="M7 11v4.2c0 1.2 2.2 2.8 5 2.8s5-1.6 5-2.8V11M21 8.5v5" />
    </>
  ),
  celebration: (
    <>
      <path d="M12 3l1.9 4.6 4.9.4-3.7 3.2 1.1 4.8L12 13.4 7.8 16l1.1-4.8L5.2 8l4.9-.4z" />
      <path d="M5 20h14" />
    </>
  ),
  growth: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="M7 15.5l4-4.5 3 2.8 5.5-6.3M15.5 7.5h4v4" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg
      className="lif__icon"
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

/* Our Moments: every photo comes with its own short caption (kept general, no invented events or dates) */
const MOMENTS = [
  {
    src: photo2,
    alt: 'The team celebrating together at the office',
    title: 'Celebrating Together',
    text: 'Creating memorable moments and celebrating the people behind our progress.',
  },
  {
    src: photo6,
    alt: 'The team gathered at the office',
    title: 'Team Collaboration',
    text: 'Working together, sharing ideas and solving challenges as one team.',
  },
  {
    src: photo7,
    alt: 'The team enjoying a trip together',
    title: 'Adventures Together',
    text: 'Exploring new places and sharing experiences beyond the office.',
  },
  {
    src: photo4,
    alt: 'The team marking a special occasion at the office',
    title: 'Milestone Moments',
    text: 'Taking time to mark special occasions as a team.',
  },
  {
    src: photo1,
    alt: 'The team outdoors',
    title: 'Together Outdoors',
    text: 'Moments away from the desk that bring the team closer.',
  },
  {
    src: photo3,
    alt: 'The team cheering together',
    title: 'Team Spirit',
    text: 'Energy, enthusiasm and a shared drive to do great work.',
  },
  {
    src: photo5,
    alt: 'The team on an outing',
    title: 'Team Outings',
    text: 'Relaxed time together that builds trust and friendships.',
  },
  {
    src: photo8,
    alt: 'The team at the office',
    title: 'Our Office Family',
    text: 'The people who make every day at Sahajanand Infotech better.',
  },
]

const SYNERGY = [
  { src: info3, alt: 'The team together at the office', title: 'One Team, One Goal', text: 'Shared goals bring everyone together.' },
  { src: info1, alt: 'The team together on the lawn', title: 'Growing Together', text: 'We learn and improve side by side.' },
  { src: info2, alt: 'The team celebrating together', title: 'Shared Celebrations', text: 'Good moments are better together.' },
  { src: info4, alt: 'The team outdoors', title: 'Friendships at Work', text: 'Trust grows through shared experiences.' },
]

const CULTURE = [
  { icon: 'collaboration', title: 'Collaboration', text: 'We work together, share knowledge and support each other.' },
  { icon: 'learning', title: 'Learning', text: 'We continuously explore new ideas, skills and technologies.' },
  { icon: 'celebration', title: 'Celebration', text: 'We take time to celebrate milestones, achievements and special moments.' },
  { icon: 'growth', title: 'Growth', text: 'We create opportunities for people to grow personally and professionally.' },
]

const PEOPLE = [
  { src: photo5, alt: 'The Sahajanand Infotech team outdoors' },
  { src: photo8, alt: 'The Sahajanand Infotech team at the office' },
  { src: photo1, alt: 'The Sahajanand Infotech team in a garden' },
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

/* Photo with its title and description in one card */
function StoryCard({ item, className = '', delay = 0 }) {
  return (
    <Rise as="figure" className={`lif__story ${className}`.trim()} delay={delay}>
      <div className="lif__story-media">
        <img src={item.src} alt={item.alt} loading="lazy" />
      </div>
      <figcaption className="lif__story-caption">
        <strong className="lif__story-title">{item.title}</strong>
        <span className="lif__story-text">{item.text}</span>
      </figcaption>
    </Rise>
  )
}

function LifePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="lif">
      <Header homePath="/" />

      {/* 1. Hero */}
      <section className="lif__hero" aria-labelledby="lif-hero-title">
        <div className="lif__container lif__hero-inner">
          <div className="lif__hero-copy">
            <Rise as="p" className="lif__label">
              Life at Sahajanand Infotech
            </Rise>
            <Rise as="h1" className="lif__hero-title" id="lif-hero-title" delay={STAGGER_S}>
              Where People, Ideas &amp; Technology Come Together
            </Rise>
            <Rise as="p" className="lif__hero-text" delay={STAGGER_S * 2}>
              At Sahajanand Infotech, we believe great work happens when talented people come
              together, share ideas, celebrate achievements and grow as a team.
            </Rise>
            <Rise as="nav" className="lif__breadcrumb" delay={STAGGER_S * 3} aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="lif__breadcrumb-dot" aria-hidden="true" />
              <span aria-current="page">Life at Sahajanand Infotech</span>
            </Rise>
          </div>
          <Rise className="lif__hero-media" delay={STAGGER_S * 2}>
            <img src={photo3} alt="The Sahajanand Infotech team celebrating together" />
          </Rise>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="lif__section" aria-labelledby="lif-intro-title">
        <div className="lif__container lif__split">
          <div className="lif__split-copy">
            <Rise as="p" className="lif__label">
              Our Story
            </Rise>
            <Rise as="h2" className="lif__heading" id="lif-intro-title" delay={STAGGER_S}>
              Life at Sahajanand Infotech
            </Rise>
            <Rise as="p" className="lif__text" delay={STAGGER_S * 2}>
              Life at Sahajanand Infotech is about more than just work. It is about learning
              together, collaborating on meaningful ideas, celebrating milestones and creating an
              environment where everyone can grow.
            </Rise>
          </div>
          <Rise className="lif__intro-media" delay={STAGGER_S * 2}>
            <img src={info3} alt="The Sahajanand Infotech team together at the office" />
          </Rise>
        </div>
      </section>

      {/* 3. Our moments */}
      <section className="lif__section lif__section--soft" aria-labelledby="lif-moments-title">
        <div className="lif__container">
          <div className="lif__intro">
            <Rise as="p" className="lif__label">
              Gallery
            </Rise>
            <Rise as="h2" className="lif__heading" id="lif-moments-title" delay={STAGGER_S}>
              Our Moments
            </Rise>
            <Rise as="p" className="lif__text" delay={STAGGER_S * 2}>
              From team celebrations to everyday collaboration, every moment contributes to the
              culture we build together.
            </Rise>
          </div>
          <div className="lif__gallery">
            {MOMENTS.map((item, index) => (
              <StoryCard item={item} key={item.title} delay={(index % 3) * STAGGER_S} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team synergy */}
      <section className="lif__section" aria-labelledby="lif-synergy-title">
        <div className="lif__container">
          <div className="lif__intro">
            <Rise as="p" className="lif__label">
              Togetherness
            </Rise>
            <Rise as="h2" className="lif__heading" id="lif-synergy-title" delay={STAGGER_S}>
              Building Team Synergy
            </Rise>
            <Rise as="p" className="lif__text" delay={STAGGER_S * 2}>
              We believe strong teams are built through collaboration, trust and shared experiences.
              Every project, conversation and celebration gives us an opportunity to learn from each
              other and grow together.
            </Rise>
          </div>
          <div className="lif__synergy">
            {SYNERGY.map((item, index) => (
              <StoryCard
                item={item}
                key={item.title}
                className={`lif__story--synergy-${index + 1}`}
                delay={(index % 2) * STAGGER_S}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our culture */}
      <section className="lif__section lif__section--soft" aria-labelledby="lif-culture-title">
        <div className="lif__container">
          <div className="lif__intro">
            <Rise as="p" className="lif__label">
              What We Value
            </Rise>
            <Rise as="h2" className="lif__heading" id="lif-culture-title" delay={STAGGER_S}>
              What Makes Our Culture Special?
            </Rise>
          </div>
          <ul className="lif__culture">
            {CULTURE.map((item, index) => (
              <Rise as="li" className="lif__feature" key={item.title} delay={(index % 4) * STAGGER_S}>
                <span className="lif__feature-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="lif__feature-icon">
                  <Icon name={item.icon} />
                </span>
                <h3 className="lif__feature-title">{item.title}</h3>
                <p className="lif__feature-text">{item.text}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. People behind the work */}
      <section className="lif__section" aria-labelledby="lif-people-title">
        <div className="lif__container">
          <div className="lif__intro">
            <Rise as="p" className="lif__label">
              Our People
            </Rise>
            <Rise as="h2" className="lif__heading" id="lif-people-title" delay={STAGGER_S}>
              People Behind the Work
            </Rise>
            <Rise as="p" className="lif__text" delay={STAGGER_S * 2}>
              Every solution we build is powered by people who bring creativity, expertise and
              passion to what they do.
            </Rise>
          </div>
          <div className="lif__people">
            {PEOPLE.map((photo, index) => (
              <Rise className="lif__people-tile" key={photo.src} delay={index * STAGGER_S}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section className="lif__section lif__section--cta" aria-labelledby="lif-cta-title">
        <div className="lif__container">
          <Rise className="lif__cta">
            <h2 className="lif__cta-title" id="lif-cta-title">
              Great Work Starts With Great People
            </h2>
            <p className="lif__cta-text">
              We are always looking for passionate people who want to learn, create and grow with us.
            </p>
            <a className="button lif__button" href="/careers">
              Explore Careers
            </a>
          </Rise>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LifePage
