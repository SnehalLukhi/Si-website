import { useEffect, useRef, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/tester.png'
import iconJira from '../../assets/images/icons/image.png'
import iconPostman from '../../assets/images/icons/postman.png'
import iconSelenium from '../../assets/images/icons/se.png'
import iconJMeter from '../../assets/images/icons/jmaster.png'
import './QaTester.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/motion/serviceScrollAnimations.css'
import { useServiceScrollAnimations } from '../../components/motion/useServiceScrollAnimations'
import { useServiceInquiry } from '../../hooks/useServiceInquiry'
import ServiceFormStatus from '../../components/common/ServiceFormStatus'

const QA_SERVICES = [
  'Manual Testing',
  'Automation Testing',
  'API Testing',
  'Mobile App Testing',
  'Regression & Smoke Testing',
  'Performance Testing',
  'Usability & Compatibility Testing',
]

const TOOLS = [
  'Selenium',
  'Cypress',
  'Postman',
  'Appium',
  'JMeter',
  'TestNG',
  'Jira',
]

const EXPERTISE = [
  {
    title: 'QA Tools',
    tone: 'lavender',
    items: [
      { name: 'Jira', icon: iconJira },
      { name: 'Postman', icon: iconPostman },
      { name: 'Selenium', icon: iconSelenium },
      {
        name: 'Cypress',
        icon: (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#17202C" />
            <path
              fill="#fff"
              d="M12 6.2 16.8 18h-2.1l-.9-2.3H10.2L9.3 18H7.2L12 6.2zm-.9 7.4h1.8L12 9.8z"
            />
          </svg>
        ),
      },
      { name: 'JMeter', icon: iconJMeter, iconMod: 'jmeter' },
    ],
  },
]

function QaTester() {
  const rootRef = useRef(null)
  useServiceScrollAnimations(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleSubmit, status, submitting } = useServiceInquiry('QA Tester')

  return (
    <div className="qa" ref={rootRef}>
      <Header homePath="/" compactLogoLight />

      <section className="qa__hero" aria-label="QA Tester">
        <img
          className="qa__hero-image"
          src={heroImage}
          alt="QA Tester"
        />
        <div className="qa__hero-overlay" aria-hidden="true" />
        <div className="qa__hero-copy">
          <h1 className="qa__hero-title service-title-reveal service-title-reveal--grow">
            <span className="service-title-reveal__text">QA Tester</span>
          </h1>
          <nav className="qa__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="qa__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">QA Tester</span>
          </nav>
        </div>
      </section>

      <div className="qa__main">
        <div className="qa__grid">
          <div className="qa__content">
            <p>
              We deliver exceptional{' '}
              <strong>QA testing solutions</strong> that blend precision,
              coverage, and speed to keep your digital products reliable. Our
              approach focuses on finding defects early and validating every
              critical flow so quality stays consistent from build to release.
            </p>
            <p>
              Your product quality matters the most.{' '}
              <strong>
                We test experiences that meet 100% of your project’s
                requirements.
              </strong>{' '}
              That’s how we stand apart – by creating thorough, risk-based
              testing that prioritizes accuracy, stability, and impact.
            </p>

            <h2>Our QA Testing Services</h2>
            <ul>
              {QA_SERVICES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Tools & Technologies We Use</h2>
            <ul>
              {TOOLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Grow Your Business With Our QA Expertise</h2>
            <ul>
              <li>End-to-end functional test coverage</li>
              <li>Automation that speeds up every release</li>
              <li>Defect prevention, not just defect reporting</li>
            </ul>
            <p>
              We help you ship software that leaves a strong impression and
              performs flawlessly in production. Hire our dedicated QA testers
              to work exclusively on your project and protect your product with
              exceptional testing precision.
            </p>

            <h2>Perks You Get:</h2>
            <ul>
              <li>Dedicated testers focused entirely on your project.</li>
              <li>Flexible pricing — hourly or monthly.</li>
              <li>Daily testing updates and progress reports.</li>
            </ul>

            <h2>Why Choose Sahajanand Infotech for QA Testing?</h2>
            <p>
              Our team of expert QA testers has delivered stable,
              high-performing digital products for mobile apps, websites,
              dashboards, SaaS platforms, and enterprise applications.
            </p>
            <ul>
              <li>Affordable and premium-quality QA solutions.</li>
              <li>Complete QA process — from test planning to sign-off.</li>
              <li>Tailored testing strategy for your business goals.</li>
              <li>Highly skilled testers with years of experience.</li>
              <li>Test coverage optimized for risk and user impact.</li>
              <li>Future-ready automation and scalable QA frameworks.</li>
            </ul>

            <h2>Let’s Discuss Your Requirement</h2>
            <p>
              Share your testing needs with us. We’ll help you refine your
              quality goals and create a reliable QA process that aligns with
              your product and release cycle.
            </p>
          </div>

          <aside className="qa__form-wrap">
            <form className="qa__form" onSubmit={handleSubmit}>
              <h2 className="qa__form-title">Let’s Get In Touch</h2>
              <span className="qa__form-rules" aria-hidden="true">
                <span />
                <span />
              </span>
              <label className="qa__field">
                <span className="qa__sr">Name</span>
                <input type="text" name="name" placeholder="Name" autoComplete="name" />
              </label>
              <label className="qa__field">
                <span className="qa__sr">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" />
              </label>
              <label className="qa__field">
                <span className="qa__sr">Subject</span>
                <input type="text" name="subject" placeholder="Subject" />
              </label>
              <label className="qa__field">
                <span className="qa__sr">Message</span>
                <textarea name="message" placeholder="Message" rows="6" />
              </label>
              <button className="qa__submit" type="submit" disabled={submitting}>
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

      <section className="qa__skills" aria-label="Our expertise and skillset">
        <h2>Our Expertise & Skillset</h2>
        <p>A Complete Overview of Our Technical & Creative Capabilities</p>
        <span className="qa__form-rules" aria-hidden="true">
          <span />
          <span />
        </span>
        {EXPERTISE.map((group) => (
          <div
            key={group.title}
            className={`qa__skill-row qa__skill-row--${group.tone}`}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={`qa__skill-icon${
                      item.iconMod ? ` qa__skill-icon--${item.iconMod}` : ''
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

export default QaTester
