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
  {
    name: 'Custom Website Development',
    text: 'Websites designed and built from scratch around your brand, your audience and your goals, with no generic templates.',
  },
  {
    name: 'Business Website Development',
    text: 'Professional, fast and trustworthy websites that present your company clearly and help visitors become customers.',
  },
  {
    name: 'Web Application Development',
    text: 'Secure, feature-rich web applications that handle your workflows, users and data reliably as you grow.',
  },
  {
    name: 'E-commerce Development',
    text: 'Online stores with smooth product browsing, secure checkout, payment integration and easy order management.',
  },
  {
    name: 'Frontend Development',
    text: 'Fast, accessible and visually polished interfaces built with modern frameworks that feel smooth on every screen.',
  },
  {
    name: 'Backend Development',
    text: 'Dependable server-side logic, databases and authentication that keep your application secure, stable and quick.',
  },
  {
    name: 'API Development & Integration',
    text: 'Custom APIs and clean integrations that connect your website with payment gateways, CRMs and other third-party services.',
  },
  {
    name: 'Responsive Web Development',
    text: 'Layouts that adapt naturally to mobile, tablet and desktop, so every visitor gets a comfortable experience.',
  },
  {
    name: 'CMS Development',
    text: 'Content management systems that let your team update pages, blogs and media easily, without needing a developer.',
  },
  {
    name: 'Website Revamp & Modernization',
    text: 'We refresh outdated websites with modern design, better speed and updated technology, while keeping what already works.',
  },
  {
    name: 'Custom Software Solutions',
    text: 'Tailor-made web-based software that automates your business processes and fits the way your team really works.',
  },
  {
    name: 'Maintenance & Support',
    text: 'Ongoing updates, monitoring, security fixes and improvements that keep your website healthy long after launch.',
  },
]

const DEVELOPMENT_APPROACH = [
  {
    name: 'Requirement Analysis',
    text: 'We learn about your business, users and goals, and turn them into a clear list of requirements.',
  },
  {
    name: 'Planning',
    text: 'Scope, technology, milestones and timelines are agreed up front, so everyone knows what to expect.',
  },
  {
    name: 'UI/UX Collaboration',
    text: 'Designers and developers work together from the start, so the final product matches the approved design.',
  },
  {
    name: 'Frontend Development',
    text: 'Approved designs become fast, responsive and accessible interfaces.',
  },
  {
    name: 'Backend Development',
    text: 'We build the databases, business logic and security that power the application behind the scenes.',
  },
  {
    name: 'API Integration',
    text: 'The frontend, backend and any third-party services are connected into one smooth working system.',
  },
  {
    name: 'Testing',
    text: 'Functionality, performance, security and device compatibility are checked before anything goes live.',
  },
  {
    name: 'Deployment',
    text: 'We launch your project on a reliable, secure environment and make sure everything runs correctly.',
  },
  {
    name: 'Support',
    text: 'After launch we stay available for updates, fixes and improvements as your needs change.',
  },
]

const BUSINESS_VALUE = [
  'A strong digital presence that builds credibility and helps customers find you.',
  'Better website performance, with faster loading and smoother interactions.',
  'Better user experiences that keep visitors engaged and guide them to act.',
  'Automated business processes that save time and reduce manual work.',
  'Easy integration with the third-party systems and tools you already use.',
  'Support for business growth, with technology that keeps up as demand rises.',
  'Scalable digital products that can take on new features and more users without a rebuild.',
]

const WHY_US = [
  'A custom development approach: every solution is shaped around your requirements.',
  'Clean, maintainable code that is easy to understand, extend and hand over.',
  'Responsive, user-friendly interfaces that work well on every device.',
  'Scalable architecture that is ready for more users, data and features.',
  'Modern development practices, tools and frameworks.',
  'Secure and reliable solutions, with protection built in from the start.',
  'Close collaboration between design and development teams for a consistent result.',
  'Long-term support and maintenance, so your product keeps performing after launch.',
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
              At Sahajanand Infotech, we build{' '}
              <strong>modern, scalable and high-performance</strong> websites
              and web applications, tailored to what your business actually
              needs. From company websites and online stores to custom web
              platforms, we turn your requirements into dependable digital
              products.
            </p>
            <p>
              Our developers combine clean code, thoughtful design and proven
              technology, so your website is fast today and ready to grow
              tomorrow.
            </p>

            <h2>Our Web Development Services</h2>
            <ul>
              {WEB_SERVICES.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>Our Development Approach</h2>
            <p>
              A good website is built through a clear process. We follow a
              structured approach that keeps you informed from the first
              requirement to long-term support.
            </p>
            <ul>
              {DEVELOPMENT_APPROACH.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>How Professional Web Development Helps Your Business</h2>
            <p>
              Your website is often the first place customers meet your
              business. A well-built one works for you every day.
            </p>
            <ul>
              {BUSINESS_VALUE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Why Sahajanand Infotech?</h2>
            <p>
              We approach every project as a long-term partnership. Our design
              and development teams work side by side, so what you approve is
              exactly what gets built.
            </p>
            <ul>
              {WHY_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Build a Powerful Web Presence With Us</h2>
            <p>
              Planning a new website or web application, or looking to improve
              an existing one? Tell us about your requirements. We will
              understand your goals and suggest the right solution for your
              business. Use the form to start the conversation.
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
