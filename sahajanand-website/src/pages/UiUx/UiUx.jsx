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
  'User Interface (UI) Design',
  'User Experience (UX) Design',
  'Wireframing & Prototyping',
  'Mobile App UI/UX Design',
  'Website Redesign & Revamp',
  'Design System & Style Guide Creation',
  'Usability Testing & UX Audit',
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
              We deliver exceptional{' '}
              <strong>UI/UX design solutions</strong> that blend creativity,
              usability, and functionality to create seamless digital
              experiences. Our approach focuses on understanding user behavior
              and crafting intuitive interfaces that enhance satisfaction and
              boost conversions.
            </p>
            <p>
              Your users matter the most.{' '}
              <strong>
                We design experiences that meet 100% of your audience’s needs.
              </strong>{' '}
              That’s how we stand apart – by creating human-centered designs
              that prioritize clarity, consistency, and impact.
            </p>

            <h2>Our UI/UX Services</h2>
            <ul>
              {UI_SERVICES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Tools & Technologies We Use</h2>
            <ul>
              {TOOLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Grow Your Business With Our UI/UX Expertise</h2>
            <ul>
              <li>Pixel-perfect modern UI designs</li>
              <li>Human-centered UX strategy</li>
              <li>Research-backed design approach</li>
            </ul>
            <p>
              We help you create interfaces that leave a strong impression and
              deliver flawless interactions. Hire our dedicated UI/UX designers
              to work exclusively on your project and bring your ideas to life
              with exceptional design precision.
            </p>

            <h2>Perks You Get:</h2>
            <ul>
              <li>Dedicated designers focused entirely on your project.</li>
              <li>Flexible pricing — hourly or monthly.</li>
              <li>Daily design updates and progress reports.</li>
            </ul>

            <h2>Why Choose Sahajanand Infotech for UI/UX Design?</h2>
            <p>
              Our team of expert UI/UX designers has crafted modern,
              high-performing digital experiences for mobile apps, websites,
              dashboards, SaaS products, and enterprise applications.
            </p>
            <ul>
              <li>Affordable and premium-quality UI/UX solutions.</li>
              <li>Complete UI/UX process — from research to prototype.</li>
              <li>Tailored design strategy for your business goals.</li>
              <li>Highly skilled designers with years of experience.</li>
              <li>Designs optimized for conversions and user engagement.</li>
              <li>Future-ready and scalable design systems.</li>
            </ul>

            <h2>Let’s Discuss Your Requirement</h2>
            <p>
              Share your design vision with us. We’ll help you refine your
              ideas and create an exceptional user experience that aligns with
              your brand and goals.
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
