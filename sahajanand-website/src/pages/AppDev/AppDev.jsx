import { useEffect, useRef, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/appdevlopment.png'
import iconAndroid from '../../assets/images/icons/Android .png'
import iconKotlin from '../../assets/images/icons/Kotlin.png'
import iconJava from '../../assets/images/icons/java.png'
import iconFirebase from '../../assets/images/icons/Firebase.png'
import './AppDev.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/motion/serviceScrollAnimations.css'
import { useServiceScrollAnimations } from '../../components/motion/useServiceScrollAnimations'
import { useServiceInquiry } from '../../hooks/useServiceInquiry'
import ServiceFormStatus from '../../components/common/ServiceFormStatus'

const APP_SERVICES = [
  'Native Android App Development',
  'Custom Mobile App Development',
  'App UI Implementation',
  'API Integration',
  'Firebase Integration',
  'Play Store Deployment',
  'App Maintenance & Support',
]

const TOOLS = [
  'Android Studio',
  'Kotlin',
  'Java',
  'Android SDK',
  'Firebase',
]

const EXPERTISE = [
  {
    title: 'Development Tools',
    tone: 'lavender',
    items: [
      { name: 'Android Studio', icon: iconAndroid },
      { name: 'Kotlin', icon: iconKotlin },
      { name: 'Java', icon: iconJava },
      { name: 'Firebase', icon: iconFirebase },
    ],
  },
]

function AppDev() {
  const rootRef = useRef(null)
  useServiceScrollAnimations(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleSubmit, status, submitting } = useServiceInquiry('App Development')

  return (
    <div className="appdev" ref={rootRef}>
      <Header homePath="/" compactLogoLight />

      <section className="appdev__hero" aria-label="App Development">
        <img
          className="appdev__hero-image"
          src={heroImage}
          alt="App Development"
        />
        <div className="appdev__hero-overlay" aria-hidden="true" />
        <div className="appdev__hero-copy">
          <h1 className="appdev__hero-title service-title-reveal service-title-reveal--grow">
            <span className="service-title-reveal__text">App Development</span>
          </h1>
          <nav className="appdev__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="appdev__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">App Development</span>
          </nav>
        </div>
      </section>

      <div className="appdev__main">
        <div className="appdev__grid">
          <div className="appdev__content">
            <p>
              We deliver exceptional{' '}
              <strong>app development solutions</strong> that blend clean code,
              smooth functionality, and reliable performance. Our approach
              focuses on building fast, scalable mobile apps that feel native,
              stay stable, and keep your users engaged.
            </p>
            <p>
              Your users’ experience matters the most.{' '}
              <strong>
                We build mobile apps that meet 100% of your project’s
                requirements.
              </strong>{' '}
              That’s how we stand apart – by creating robust, maintainable
              applications that prioritize speed, usability, and impact.
            </p>

            <h2>Our App Development Services</h2>
            <ul>
              {APP_SERVICES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Tools & Technologies We Use</h2>
            <ul>
              {TOOLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Grow Your Business With Our App Development Expertise</h2>
            <ul>
              <li>Fast, scalable mobile applications</li>
              <li>Clean, maintainable Android-focused code</li>
              <li>Performance-focused development approach</li>
            </ul>
            <p>
              We help you launch apps that leave a strong impression and
              deliver flawless functionality. Hire our dedicated app developers
              to work exclusively on your project and bring your ideas to life
              with exceptional development precision.
            </p>

            <h2>Perks You Get:</h2>
            <ul>
              <li>Dedicated developers focused entirely on your project.</li>
              <li>Flexible pricing — hourly or monthly.</li>
              <li>Daily development updates and progress reports.</li>
            </ul>

            <h2>Why Choose Sahajanand Infotech for App Development?</h2>
            <p>
              Our team of expert app developers has built modern,
              high-performing digital products for Android apps, dashboards,
              SaaS platforms, and enterprise applications.
            </p>
            <ul>
              <li>Affordable and premium-quality app development solutions.</li>
              <li>Complete development process — from planning to store release.</li>
              <li>Tailored technical strategy for your business goals.</li>
              <li>Highly skilled developers with years of experience.</li>
              <li>Apps optimized for speed, stability, and user engagement.</li>
              <li>Future-ready and scalable mobile architectures.</li>
            </ul>

            <h2>Let’s Discuss Your Requirement</h2>
            <p>
              Share your app development needs with us. We’ll help you refine
              your ideas and create a reliable, high-performing mobile app that
              aligns with your brand and goals.
            </p>
          </div>

          <aside className="appdev__form-wrap">
            <form className="appdev__form" onSubmit={handleSubmit}>
              <h2 className="appdev__form-title">Let’s Get In Touch</h2>
              <span className="appdev__form-rules" aria-hidden="true">
                <span />
                <span />
              </span>
              <label className="appdev__field">
                <span className="appdev__sr">Name</span>
                <input type="text" name="name" placeholder="Name" autoComplete="name" />
              </label>
              <label className="appdev__field">
                <span className="appdev__sr">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" />
              </label>
              <label className="appdev__field">
                <span className="appdev__sr">Subject</span>
                <input type="text" name="subject" placeholder="Subject" />
              </label>
              <label className="appdev__field">
                <span className="appdev__sr">Message</span>
                <textarea name="message" placeholder="Message" rows="6" />
              </label>
              <button className="appdev__submit" type="submit" disabled={submitting}>
                Send Your Message
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 11.5 21 3l-7.5 18-2.7-6.8L3 11.5zm8.2 1.2 1.6 4.1 4.4-10.6-6 6.5z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <ServiceFormStatus status={status} />
            </form>
          </aside>
        </div>
      </div>

      <section className="appdev__skills" aria-label="Our expertise and skillset">
        <h2>Our Expertise & Skillset</h2>
        <p>A Complete Overview of Our Technical & Creative Capabilities</p>
        <span className="appdev__form-rules" aria-hidden="true">
          <span />
          <span />
        </span>
        {EXPERTISE.map((group) => (
          <div
            key={group.title}
            className={`appdev__skill-row appdev__skill-row--${group.tone}`}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={`appdev__skill-icon${
                      item.iconMod ? ` appdev__skill-icon--${item.iconMod}` : ''
                    }`}
                    aria-hidden="true"
                  >
                    {typeof item.icon === 'string' ? (
                      <img src={item.icon} alt="" />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Footer />

    </div>
  )
}

export default AppDev
