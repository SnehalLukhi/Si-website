import { useEffect, useRef, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/ui-xi.png'
import iconFigma from '../../assets/images/icons/figma.png'
import iconFramer from '../../assets/images/icons/framer.png'
import iconPhotoshop from '../../assets/images/icons/ps.png'
import iconIllustrator from '../../assets/images/icons/ai.png'
import './UiUx.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/motion/serviceScrollAnimations.css'
import { useServiceScrollAnimations } from '../../components/motion/useServiceScrollAnimations'
import { useServiceInquiry } from '../../hooks/useServiceInquiry'
import ServiceFormStatus from '../../components/common/ServiceFormStatus'

const UI_SERVICES = [
  {
    name: 'UX Research & User Analysis',
    text: 'We study your audience, competitors and existing data to find out what people really need before any design begins.',
  },
  {
    name: 'Information Architecture',
    text: 'Content, features and navigation are organised into a clear structure, so users always know where they are and where to go next.',
  },
  {
    name: 'User Journey & Experience Design',
    text: 'We map every step a user takes, from first visit to final goal, and remove the points where they hesitate or drop off.',
  },
  {
    name: 'Wireframing',
    text: 'Low-fidelity layouts let us agree on structure, priorities and flow quickly, long before visual details are added.',
  },
  {
    name: 'UI Design',
    text: 'Clean, modern interfaces with carefully chosen typography, colour and spacing that reflect your brand and stay easy to read.',
  },
  {
    name: 'Interactive Prototyping',
    text: 'Clickable prototypes show how the product will behave, so ideas can be tried and approved before development starts.',
  },
  {
    name: 'Mobile App UI/UX',
    text: 'Touch-friendly Android and iOS experiences designed around small screens, quick tasks and familiar platform patterns.',
  },
  {
    name: 'Website UI/UX',
    text: 'Responsive websites that guide visitors clearly, load comfortably on every device and turn interest into action.',
  },
  {
    name: 'Dashboard & SaaS Design',
    text: 'Data-heavy screens, admin panels and SaaS products made simple to scan, navigate and use every day.',
  },
  {
    name: 'Design Systems',
    text: 'Reusable components, styles and guidelines that keep every screen consistent and speed up future design and development.',
  },
  {
    name: 'Usability Testing',
    text: 'We watch real users work through your product and use what we learn to refine the experience with evidence, not guesswork.',
  },
  {
    name: 'UX Audit & Improvement',
    text: 'A structured review of your existing product that highlights usability problems and gives clear, prioritised fixes.',
  },
]

const DESIGN_APPROACH = [
  {
    name: 'Understand the business goals',
    text: 'We begin by learning what your product must achieve, so every design decision supports a real business outcome.',
  },
  {
    name: 'Understand the real users',
    text: 'We identify who will use the product, what they need and what slows them down today.',
  },
  {
    name: 'Plan the user journeys',
    text: 'Key tasks are mapped from start to finish, giving each screen a clear purpose.',
  },
  {
    name: 'Create the wireframes',
    text: 'Simple layouts set the structure and content priorities before any styling is applied.',
  },
  {
    name: 'Design the visual interface',
    text: 'Colour, typography, imagery and components are shaped into a polished interface that matches your brand.',
  },
  {
    name: 'Build interactive prototypes',
    text: 'Realistic, clickable prototypes let you and your users experience the product before it is built.',
  },
  {
    name: 'Test and improve the experience',
    text: 'Feedback and test results guide the final refinements, so the product is ready for launch.',
  },
]

const TOOLS = [
  'Figma',
  'Adobe XD',
  'Sketch',
  'Photoshop',
  'Illustrator',
  'InVision',
  'Zeplin',
]

const BUSINESS_VALUE = [
  'Better usability, so people complete their tasks without confusion.',
  'Higher engagement, because clear and pleasant products keep users coming back.',
  'Less friction, with fewer steps, errors and abandoned journeys.',
  'More trust, built through a professional and dependable interface.',
  'Improved conversions, as clear paths and calls to action guide users to act.',
  'A consistent brand experience across your website, app and dashboard.',
  'Digital products that stay organised and easy to extend as your business grows.',
]

const WHY_US = [
  'User-centered design: every screen starts from what your users need.',
  'Business-focused decisions: design choices are tied to your goals and results.',
  'Clean, modern interfaces that are simple to understand and pleasant to use.',
  'Responsive experiences that work smoothly on mobile, tablet and desktop.',
  'Consistent design systems that keep your product uniform as it grows.',
  'Close collaboration with development teams for accurate, smooth hand-off.',
  'Scalable, future-ready design that supports new features without a redesign.',
]

const EXPERTISE = [
  {
    title: 'Design Tools',
    tone: 'lavender',
    items: [
      { name: 'Figma', icon: iconFigma, iconMod: 'figma' },
      { name: 'Framer', icon: iconFramer },
      { name: 'Photoshop', icon: iconPhotoshop, iconMod: 'ps' },
      { name: 'Illustrator', icon: iconIllustrator, iconMod: 'ai' },
    ],
  },
]

function UiUx() {
  const rootRef = useRef(null)
  useServiceScrollAnimations(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleSubmit, status, submitting } = useServiceInquiry('UI/UX Design')

  return (
    <div className="uiux" ref={rootRef}>
      <Header homePath="/" compactLogoLight />

      <section className="uiux__hero" aria-label="UI/UX Design">
        <img
          className="uiux__hero-image"
          src={heroImage}
          alt="UI/UX Design"
        />
        <div className="uiux__hero-overlay" aria-hidden="true" />
        <div className="uiux__hero-copy">
          <h1 className="uiux__hero-title service-title-reveal service-title-reveal--grow">
            <span className="service-title-reveal__text">UI/UX Design</span>
          </h1>
          <nav className="uiux__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="uiux__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">UI/UX Design</span>
          </nav>
        </div>
      </section>

      <div className="uiux__main">
        <div className="uiux__grid">
          <div className="uiux__content">
            <p>
              At Sahajanand Infotech, we create{' '}
              <strong>user-centered digital experiences</strong> for websites,
              mobile apps, dashboards, SaaS products and business applications.
              Every interface we design is built to be clear, intuitive and
              visually refined, so people can reach their goals without effort.
            </p>
            <p>
              By combining research, thoughtful structure and modern visual
              design, we turn your ideas into products that users enjoy and
              your business can rely on.
            </p>

            <h2>Our UI/UX Services</h2>
            <ul>
              {UI_SERVICES.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>Our Design Approach</h2>
            <p>
              Good design is a process, not a guess. We follow a clear, step by
              step approach that keeps your goals and your users at the centre.
            </p>
            <ul>
              {DESIGN_APPROACH.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>Design Tools We Work With</h2>
            <p>
              We use industry-standard tools for design, prototyping and
              developer hand-off, so our work is easy to review, share and build.
            </p>
            <ul>
              {TOOLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>How Good UI/UX Helps Your Business</h2>
            <p>
              A well-designed product is more than good looks. It directly
              affects how people use, trust and recommend your business.
            </p>
            <ul>
              {BUSINESS_VALUE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Why Sahajanand Infotech?</h2>
            <p>
              We treat design as part of your business strategy. Our designers
              work closely with you from the first idea to the final hand-off.
            </p>
            <ul>
              {WHY_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Let’s Create Better Digital Experiences</h2>
            <p>
              Have a website, mobile app, dashboard or digital product idea?
              Tell us about it. We will listen, understand your goals and help
              you shape an experience that your users will love. Use the form to
              start the conversation.
            </p>
          </div>

          <aside className="uiux__form-wrap">
            <form className="uiux__form" onSubmit={handleSubmit}>
              <h2 className="uiux__form-title">Let’s Get In Touch</h2>
              <span className="uiux__form-rules" aria-hidden="true">
                <span />
                <span />
              </span>
              <label className="uiux__field">
                <span className="uiux__sr">Name</span>
                <input type="text" name="name" placeholder="Name" autoComplete="name" />
              </label>
              <label className="uiux__field">
                <span className="uiux__sr">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" />
              </label>
              <label className="uiux__field">
                <span className="uiux__sr">Subject</span>
                <input type="text" name="subject" placeholder="Subject" />
              </label>
              <label className="uiux__field">
                <span className="uiux__sr">Message</span>
                <textarea name="message" placeholder="Message" rows="6" />
              </label>
              <button className="uiux__submit" type="submit" disabled={submitting}>
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

      <section className="uiux__skills" aria-label="Our expertise and skillset">
        <h2>Our Expertise & Skillset</h2>
        <p>A Complete Overview of Our Technical & Creative Capabilities</p>
        <span className="uiux__form-rules" aria-hidden="true">
          <span />
          <span />
        </span>
        {EXPERTISE.map((group) => (
          <div
            key={group.title}
            className={`uiux__skill-row uiux__skill-row--${group.tone}`}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={`uiux__skill-icon${
                      item.iconMod ? ` uiux__skill-icon--${item.iconMod}` : ''
                    }`}
                    aria-hidden="true"
                  >
                    <img src={item.icon} alt="" />
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

export default UiUx
