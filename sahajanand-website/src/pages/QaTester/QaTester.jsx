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
  {
    name: 'Manual Testing',
    text: 'Experienced testers explore your product the way real users do, finding issues that scripts and tools often miss.',
  },
  {
    name: 'Functional Testing',
    text: 'Every feature is checked against the requirements to confirm that it works exactly as intended.',
  },
  {
    name: 'Regression Testing',
    text: 'After every change we re-check existing features, so new updates never break what already works.',
  },
  {
    name: 'Integration Testing',
    text: 'We verify that modules, services and third-party systems work together smoothly and exchange data correctly.',
  },
  {
    name: 'API Testing',
    text: 'Requests, responses, error handling and data accuracy are validated at the API layer, before problems reach the interface.',
  },
  {
    name: 'UI Testing',
    text: 'Layouts, screens, forms and interactions are reviewed for visual accuracy and consistent behaviour.',
  },
  {
    name: 'Mobile App Testing',
    text: 'Android and iOS apps are tested on real devices, screen sizes and OS versions for stable, smooth performance.',
  },
  {
    name: 'Web Application Testing',
    text: 'Complete user flows, forms, logins and business logic are tested to keep your web application dependable.',
  },
  {
    name: 'Cross-Browser Testing',
    text: 'We confirm that your website looks and works the same on Chrome, Firefox, Safari, Edge and other browsers.',
  },
  {
    name: 'Performance Testing',
    text: 'We measure speed, load handling and responsiveness, and point out bottlenecks before your users find them.',
  },
  {
    name: 'Usability Testing',
    text: 'We evaluate how easy and clear the product is to use, and report where users may get confused or stuck.',
  },
  {
    name: 'Bug Identification & Reporting',
    text: 'Each defect is documented with clear steps, evidence and severity, so developers can reproduce and fix it quickly.',
  },
]

const TESTING_APPROACH = [
  {
    name: 'Requirement Analysis',
    text: 'We study the requirements and expected behaviour to understand what needs to be tested and where the risks are.',
  },
  {
    name: 'Test Planning',
    text: 'Scope, test types, environments, timelines and priorities are agreed before testing begins.',
  },
  {
    name: 'Test Case Creation',
    text: 'Detailed test cases cover normal flows, edge cases and error conditions for complete coverage.',
  },
  {
    name: 'Test Execution',
    text: 'Test cases are run on real devices and browsers, and every result is recorded.',
  },
  {
    name: 'Bug Reporting',
    text: 'Defects are logged with clear steps, screenshots and severity for fast developer action.',
  },
  {
    name: 'Retesting',
    text: 'Every fixed issue is tested again to confirm that it is truly resolved.',
  },
  {
    name: 'Regression Testing',
    text: 'Related features are re-checked to make sure the fixes have not caused new problems.',
  },
  {
    name: 'Final Quality Validation',
    text: 'A last full review confirms that the product meets the agreed quality standards and is ready for release.',
  },
]

const BUSINESS_VALUE = [
  'Fewer production issues, because defects are caught before your customers see them.',
  'More stable applications that behave consistently across devices and browsers.',
  'Early bug detection, when problems are cheapest and fastest to fix.',
  'A better user experience, with smoother, more dependable products.',
  'Lower maintenance costs, since fewer emergency fixes are needed after launch.',
  'Reliable releases that your team can ship with confidence.',
  'Consistent product quality as new features and updates are added.',
]

const WHY_US = [
  'A structured testing process: clear planning, documentation and sign-off at every stage.',
  'Experienced QA professionals who understand both products and users.',
  'Detailed test coverage across features, edge cases and user flows.',
  'Real-device and real-browser testing, not only simulators.',
  'Clear bug reporting, with exact steps and evidence for every defect.',
  'Close collaboration with developers for quick fixes and fewer misunderstandings.',
  'Reliable release validation, so every version is checked before it goes live.',
  'A quality-focused mindset that supports the whole development process.',
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
              At Sahajanand Infotech, we help businesses deliver{' '}
              <strong>reliable, stable and high-quality digital products</strong>{' '}
              through structured software testing and quality assurance. From
              websites and mobile apps to dashboards and business applications,
              we check every important flow before it reaches your users.
            </p>
            <p>
              Our testers combine careful planning, detailed test coverage and
              clear reporting, so your team can release with confidence and
              spend less time fixing problems after launch.
            </p>

            <h2>Our QA &amp; Testing Services</h2>
            <ul>
              {QA_SERVICES.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>Our Testing Approach</h2>
            <p>
              Quality is built step by step. We follow a clear process that
              takes your product from first requirements to final validation.
            </p>
            <ul>
              {TESTING_APPROACH.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>How Professional QA Helps Your Business</h2>
            <p>
              Testing is not an extra cost. It protects your users, your brand
              and your budget.
            </p>
            <ul>
              {BUSINESS_VALUE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Why Sahajanand Infotech?</h2>
            <p>
              We treat quality as a shared responsibility. Our QA team works
              alongside your developers from the first requirement to the final
              release.
            </p>
            <ul>
              {WHY_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Deliver Better Software With Reliable QA</h2>
            <p>
              Planning a new product, or worried about the quality of an
              existing one? Tell us about your testing and quality requirements.
              We will review your needs and suggest a testing approach that fits
              your product and release schedule. Use the form to start the
              conversation.
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
