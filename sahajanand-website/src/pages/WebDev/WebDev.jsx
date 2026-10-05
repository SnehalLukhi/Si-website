import { useEffect, useRef, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/devlopment.png'
import iconHtml from '../../assets/images/icons/html.png'
import iconCss from '../../assets/images/icons/css.png'
import iconJs from '../../assets/images/icons/js.png'
import iconReact from '../../assets/images/icons/react.png'
import iconShopify from '../../assets/images/icons/Shopify.png'
import iconVue from '../../assets/images/icons/VueJS.png'
import iconNode from '../../assets/images/icons/node.png'
import iconLaravel from '../../assets/images/icons/svglaravel.png'
import iconPhp from '../../assets/images/icons/svgPhp.png'
import iconMysql from '../../assets/images/icons/sql.png'
import iconMongodb from '../../assets/images/icons/mongodb.png'
import './WebDev.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/motion/serviceScrollAnimations.css'
import { useServiceScrollAnimations } from '../../components/motion/useServiceScrollAnimations'
import { useServiceInquiry } from '../../hooks/useServiceInquiry'
import ServiceFormStatus from '../../components/common/ServiceFormStatus'

const WEB_SERVICES = [
  'Custom Website Development',
  'Frontend Development',
  'Backend Development',
  'E-commerce Development',
  'CMS Development',
  'API Integration',
  'Website Maintenance & Support',
]

const TOOLS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Node.js',
  'PHP',
  'Laravel',
  'MySQL',
]

const EXPERTISE = [
  {
    title: 'Frontend',
    tone: 'lavender',
    items: [
      { name: 'HTML5', icon: iconHtml },
      { name: 'CSS3', icon: iconCss },
      { name: 'JavaScript', icon: iconJs },
      { name: 'ReactJS', icon: iconReact },
      { name: 'React Native', icon: iconReact },
      { name: 'Shopify', icon: iconShopify },
      { name: 'VueJS', icon: iconVue },
    ],
  },
  {
    title: 'Backend',
    tone: 'rose',
    items: [
      { name: 'Node.js', icon: iconNode },
      { name: 'Laravel', icon: iconLaravel },
      { name: 'PHP', icon: iconPhp, iconMod: 'php' },
    ],
  },
  {
    title: 'Database',
    tone: 'lavender',
    items: [
      { name: 'MySQL', icon: iconMysql },
      { name: 'MongoDB', icon: iconMongodb },
    ],
  },
]

function WebDev() {
  const rootRef = useRef(null)
  useServiceScrollAnimations(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleSubmit, status, submitting } = useServiceInquiry('Web Development')

  return (
    <div className="webdev" ref={rootRef}>
      <Header homePath="/" compactLogoLight />

      <section className="webdev__hero" aria-label="Web Development">
        <img
          className="webdev__hero-image"
          src={heroImage}
          alt="Web Development"
        />
        <div className="webdev__hero-overlay" aria-hidden="true" />
        <div className="webdev__hero-copy">
          <h1
            className="webdev__hero-title service-title-reveal service-title-reveal--grow"
          >
            <span className="service-title-reveal__text">Web Development</span>
          </h1>
          <nav
            className="webdev__breadcrumb"
            aria-label="Breadcrumb"
          >
            <a href="/">Home</a>
            <span className="webdev__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">Web Development</span>
          </nav>
        </div>
      </section>

      <div className="webdev__main">
        <div className="webdev__grid">
          <div className="webdev__content">
            <p>
              We deliver exceptional{' '}
              <strong>web development solutions</strong> that blend clean code,
              seamless UI, and reliable performance. Our approach focuses on
              building fast, scalable websites that work smoothly across
              devices and keep your business running without interruption.
            </p>
            <p>
              Your product performance matters the most.{' '}
              <strong>
                We build web experiences that meet 100% of your project’s
                requirements.
              </strong>{' '}
              That’s how we stand apart – by creating robust, maintainable
              applications that prioritize speed, stability, and impact.
            </p>

            <h2>Our Web Development Services</h2>
            <ul>
              {WEB_SERVICES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Tools & Technologies We Use</h2>
            <ul>
              {TOOLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Grow Your Business With Our Web Development Expertise</h2>
            <ul>
              <li>Fast, scalable web applications</li>
              <li>Clean, maintainable frontend and backend code</li>
              <li>Performance-focused development approach</li>
            </ul>
            <p>
              We help you launch websites that leave a strong impression and
              deliver flawless functionality. Hire our dedicated web developers
              to work exclusively on your project and bring your ideas to life
              with exceptional development precision.
            </p>

            <h2>Perks You Get:</h2>
            <ul>
              <li>Dedicated developers focused entirely on your project.</li>
              <li>Flexible pricing — hourly or monthly.</li>
              <li>Daily development updates and progress reports.</li>
            </ul>

            <h2>Why Choose Sahajanand Infotech for Web Development?</h2>
            <p>
              Our team of expert web developers has built modern,
              high-performing digital products for mobile-ready websites,
              dashboards, SaaS platforms, and enterprise applications.
            </p>
            <ul>
              <li>Affordable and premium-quality web development solutions.</li>
              <li>Complete development process — from planning to deployment.</li>
              <li>Tailored technical strategy for your business goals.</li>
              <li>Highly skilled developers with years of experience.</li>
              <li>Websites optimized for speed, SEO, and conversions.</li>
              <li>Future-ready and scalable web architectures.</li>
            </ul>

            <h2>Let’s Discuss Your Requirement</h2>
            <p>
              Share your web development needs with us. We’ll help you refine
              your ideas and create a reliable, high-performing website that
              aligns with your brand and goals.
            </p>
          </div>

          <aside className="webdev__form-wrap">
            <form className="webdev__form" onSubmit={handleSubmit}>
              <h2 className="webdev__form-title">Let’s Get In Touch</h2>
              <span className="webdev__form-rules" aria-hidden="true">
                <span />
                <span />
              </span>
              <label className="webdev__field">
                <span className="webdev__sr">Name</span>
                <input type="text" name="name" placeholder="Name" autoComplete="name" />
              </label>
              <label className="webdev__field">
                <span className="webdev__sr">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" />
              </label>
              <label className="webdev__field">
                <span className="webdev__sr">Subject</span>
                <input type="text" name="subject" placeholder="Subject" />
              </label>
              <label className="webdev__field">
                <span className="webdev__sr">Message</span>
                <textarea name="message" placeholder="Message" rows="6" />
              </label>
              <button className="webdev__submit" type="submit" disabled={submitting}>
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

      <section className="webdev__skills" aria-label="Our expertise and skillset">
        <h2>Our Expertise & Skillset</h2>
        <p>A Complete Overview of Our Technical & Creative Capabilities</p>
        <span className="webdev__form-rules" aria-hidden="true">
          <span />
          <span />
        </span>
        {EXPERTISE.map((group) => (
          <div
            key={group.title}
            className={`webdev__skill-row webdev__skill-row--${group.tone}`}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={`webdev__skill-icon${
                      item.iconMod ? ` webdev__skill-icon--${item.iconMod}` : ''
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

export default WebDev
