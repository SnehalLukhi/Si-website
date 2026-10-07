import { useEffect } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Button from '../../components/common/Button'
import { Reveal } from '../../components/motion/Reveal'
import '../../components/common/Button.css'
import heroPhoto from '../../assets/images/info-3.png'
import whoPhotoMain from '../../assets/images/photos/image2.png'
import whoPhotoSecond from '../../assets/images/info-1.png'
import visionPhoto from '../../assets/images/photos/image3.png'
import './CompanyOverview.css'

/* Simple outline icons (24 x 24, drawn with the current text colour) */
const ICONS = {
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M10.5 12.2 8.7 14l1.8 1.8M13.5 12.2l1.8 1.8-1.8 1.8" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  design: (
    <>
      <path d="M4 20l4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" />
      <path d="M13.5 7.5l3 3" />
    </>
  ),
  qa: (
    <>
      <path d="M12 3l7.5 3v5.4c0 4.4-3 8-7.5 9.6-4.5-1.6-7.5-5.2-7.5-9.6V6z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
  software: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="6.6" />
      <path d="M12 2.8v2.5M12 18.7v2.5M2.8 12h2.5M18.7 12h2.5M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 19.5c.4-3.3 3-5.2 6.2-5.2s5.8 1.9 6.2 5.2" />
      <path d="M16 5.6a3.1 3.1 0 0 1 0 5.8M18 14.6c1.7.7 2.9 2.2 3.2 4.4" />
    </>
  ),
  tech: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
    </>
  ),
  quality: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9.6 9l1.7 1.7L14.6 7.4M8.5 14l-1.6 7 5.1-2.6 5.1 2.6-1.6-7" />
    </>
  ),
  client: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12l7-7M16.5 3.5v3.5h3.5" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg
      className="cov__icon"
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

const EXPERTISE = [
  {
    icon: 'web',
    title: 'Web Development',
    text: 'Modern, responsive websites with seamless UI and reliable performance.',
  },
  {
    icon: 'mobile',
    title: 'Mobile App Development',
    text: 'Fast, scalable and user-friendly apps built around your business needs.',
  },
  {
    icon: 'design',
    title: 'UI/UX Design',
    text: 'Clean, intuitive interfaces that delight users and support your goals.',
  },
  {
    icon: 'qa',
    title: 'QA & Testing',
    text: 'Careful testing that keeps your product stable, smooth and dependable.',
  },
  {
    icon: 'software',
    title: 'Custom Software Solutions',
    text: 'Tailored software designed around your unique workflows and requirements.',
  },
]

const REASONS = [
  {
    icon: 'team',
    title: 'Experienced Team',
    text: 'Skilled professionals who bring strong industry experience to every project.',
  },
  {
    icon: 'tech',
    title: 'Modern Technology',
    text: 'We build with current, proven technologies and tools.',
  },
  {
    icon: 'quality',
    title: 'Quality Development',
    text: 'Clean, reliable code and careful testing at every step.',
  },
  {
    icon: 'client',
    title: 'Client-Focused Approach',
    text: 'Your goals and feedback guide every decision we make.',
  },
  {
    icon: 'clock',
    title: 'On-Time Delivery',
    text: 'Clear timelines and consistent progress updates from start to launch.',
  },
]

/* The same figures and labels as the statistics on the Home page */
const STATS = [
  { value: '280', label: 'Fully launched apps' },
  { value: '1.8B+', label: 'Downloads worldwide' },
  { value: '160+', label: 'Countries reached' },
]

const PROCESS = [
  { title: 'Requirement', text: 'We listen and define clear goals.' },
  { title: 'Planning', text: 'Scope, roadmap and timelines.' },
  { title: 'UI/UX', text: 'Intuitive, user-focused design.' },
  { title: 'Development', text: 'Clean, scalable engineering.' },
  { title: 'QA', text: 'Thorough testing for reliability.' },
  { title: 'Delivery', text: 'Launch and ongoing support.' },
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

function CompanyOverview() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cov">
      <Header homePath="/" compactLogoLight />

      {/* 1. Hero */}
      <section className="cov__hero" aria-labelledby="cov-hero-title">
        <div className="cov__container cov__hero-inner">
          <div className="cov__hero-copy">
            <Rise as="p" className="cov__label">
              About Sahajanand Infotech
            </Rise>
            <Rise as="h1" className="cov__hero-title" id="cov-hero-title" delay={STAGGER_S}>
              Building Digital Solutions That Make an Impact
            </Rise>
            <Rise as="p" className="cov__hero-text" delay={STAGGER_S * 2}>
              SAHAJANAND INFO is a young, dynamic technology company focused on building reliable
              and innovative digital solutions for modern businesses.
            </Rise>
            <Rise as="nav" className="cov__breadcrumb" delay={STAGGER_S * 3} aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cov__breadcrumb-dot" aria-hidden="true" />
              <span aria-current="page">Company Overview</span>
            </Rise>
          </div>
          <Rise className="cov__hero-media" delay={STAGGER_S * 2}>
            <img src={heroPhoto} alt="The Sahajanand Infotech team" />
          </Rise>
        </div>
      </section>

      {/* 2. Who we are */}
      <section className="cov__section" aria-labelledby="cov-who-title">
        <div className="cov__container cov__split">
          <div className="cov__split-copy">
            <Rise as="p" className="cov__label">
              Our Story
            </Rise>
            <Rise as="h2" className="cov__heading" id="cov-who-title" delay={STAGGER_S}>
              Who We Are
            </Rise>
            <Rise as="p" className="cov__text" delay={STAGGER_S * 2}>
              SAHAJANAND INFO is a young, dynamic technology company focused on building reliable
              and innovative digital solutions. We combine technical expertise, creative thinking,
              and a client-focused approach to turn ideas into meaningful digital products.
            </Rise>
          </div>
          <Rise className="cov__collage" delay={STAGGER_S * 2}>
            <img className="cov__collage-main" src={whoPhotoMain} alt="Sahajanand Infotech team celebrating together" />
            <img className="cov__collage-second" src={whoPhotoSecond} alt="The Sahajanand Infotech team outdoors" />
            <span className="cov__collage-accent" aria-hidden="true" />
          </Rise>
        </div>
      </section>

      {/* 3. Mission */}
      <section className="cov__section cov__section--tight" aria-labelledby="cov-mission-title">
        <div className="cov__container">
          <Rise className="cov__mission">
            <span className="cov__mission-icon">
              <Icon name="target" />
            </span>
            <div className="cov__mission-copy">
              <p className="cov__label">What Drives Us</p>
              <h2 className="cov__heading cov__heading--left" id="cov-mission-title">
                Our Mission
              </h2>
              <p className="cov__text">
                Our mission is to deliver high-quality technology solutions that solve real business
                challenges, create better user experiences, and help our clients grow in an
                ever-changing digital world.
              </p>
            </div>
          </Rise>
        </div>
      </section>

      {/* 4. Expertise */}
      <section className="cov__section" aria-labelledby="cov-expertise-title">
        <div className="cov__container">
          <div className="cov__intro">
            <Rise as="p" className="cov__label">
              What We Do
            </Rise>
            <Rise as="h2" className="cov__heading" id="cov-expertise-title" delay={STAGGER_S}>
              Our Expertise
            </Rise>
            <Rise as="p" className="cov__text cov__text--center" delay={STAGGER_S * 2}>
              We combine technology, creativity and engineering expertise to build digital solutions
              that deliver real value.
            </Rise>
          </div>
          <ul className="cov__expertise">
            {EXPERTISE.map((item, index) => (
              <Rise as="li" className="cov__card" key={item.title} delay={(index % 3) * STAGGER_S}>
                <span className="cov__card-icon">
                  <Icon name={item.icon} />
                </span>
                <h3 className="cov__card-title">{item.title}</h3>
                <p className="cov__card-text">{item.text}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Vision */}
      <section className="cov__section cov__section--soft" aria-labelledby="cov-vision-title">
        <div className="cov__container cov__split cov__split--reverse">
          <Rise className="cov__vision-media">
            <img src={visionPhoto} alt="The Sahajanand Infotech team" />
          </Rise>
          <div className="cov__split-copy cov__vision-copy">
            <Rise as="p" className="cov__label">
              Where We Are Going
            </Rise>
            <Rise as="h2" className="cov__heading cov__heading--left cov__heading--large" id="cov-vision-title" delay={STAGGER_S}>
              Our Vision
            </Rise>
            <Rise as="p" className="cov__text cov__text--large" delay={STAGGER_S * 2}>
              To become a trusted technology partner for businesses worldwide by creating innovative,
              scalable, and user-focused digital solutions that deliver long-term value.
            </Rise>
          </div>
        </div>
      </section>

      {/* 6. Why choose us */}
      <section className="cov__section" aria-labelledby="cov-why-title">
        <div className="cov__container">
          <div className="cov__intro">
            <Rise as="p" className="cov__label">
              Our Strengths
            </Rise>
            <Rise as="h2" className="cov__heading" id="cov-why-title" delay={STAGGER_S}>
              Why Choose Sahajanand Infotech?
            </Rise>
          </div>
          <ul className="cov__reasons">
            {REASONS.map((item, index) => (
              <Rise as="li" className="cov__reason" key={item.title} delay={(index % 3) * STAGGER_S}>
                <span className="cov__reason-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="cov__reason-icon">
                  <Icon name={item.icon} />
                </span>
                <h3 className="cov__card-title">{item.title}</h3>
                <p className="cov__card-text">{item.text}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Stats (the figures already shown on the Home page) */}
      <section className="cov__stats" aria-label="Company statistics">
        <div className="cov__container">
          <ul className="cov__stats-list">
            {STATS.map((stat, index) => (
              <Rise as="li" className="cov__stat" key={stat.label} delay={index * STAGGER_S}>
                <strong className="cov__stat-value">{stat.value}</strong>
                <span className="cov__stat-label">{stat.label}</span>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Process */}
      <section className="cov__section" aria-labelledby="cov-process-title">
        <div className="cov__container">
          <div className="cov__intro">
            <Rise as="p" className="cov__label">
              How We Work
            </Rise>
            <Rise as="h2" className="cov__heading" id="cov-process-title" delay={STAGGER_S}>
              Our Process
            </Rise>
            <Rise as="p" className="cov__text cov__text--center" delay={STAGGER_S * 2}>
              From understanding your requirements to delivering a reliable digital solution, our
              process is focused on quality, clarity and continuous improvement.
            </Rise>
          </div>
          <ol className="cov__process">
            {PROCESS.map((step, index) => (
              <Rise as="li" className="cov__step" key={step.title} delay={index * 0.07}>
                <span className="cov__step-number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="cov__step-title">{step.title}</h3>
                <p className="cov__step-text">{step.text}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="cov__section cov__section--cta" aria-labelledby="cov-cta-title">
        <div className="cov__container">
          <Rise className="cov__cta">
            <h2 className="cov__cta-title" id="cov-cta-title">
              Have an Idea? Let&apos;s Build Something Great Together.
            </h2>
            <p className="cov__cta-text">
              Let&apos;s turn your ideas into reliable, scalable and user-focused digital solutions.
            </p>
            <Button href="/contact-us">Contact Us</Button>
          </Rise>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CompanyOverview
