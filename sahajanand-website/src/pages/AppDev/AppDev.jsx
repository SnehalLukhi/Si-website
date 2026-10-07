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
  {
    name: 'Android App Development',
    text: 'Fast, stable native Android apps built to run smoothly across the wide range of devices your customers use.',
  },
  {
    name: 'iOS App Development',
    text: 'Polished iPhone and iPad apps that follow Apple design standards and feel natural to iOS users.',
  },
  {
    name: 'Cross-Platform App Development',
    text: 'One codebase for both Android and iOS, so you reach more users sooner while keeping development efficient.',
  },
  {
    name: 'Custom Mobile App Development',
    text: 'Apps designed and built around your idea, your users and your workflow, not forced into a ready-made template.',
  },
  {
    name: 'Business App Development',
    text: 'Mobile apps for operations, teams and customers that simplify daily tasks and keep your business connected.',
  },
  {
    name: 'E-commerce App Development',
    text: 'Shopping apps with easy product discovery, secure payments, order tracking and notifications that bring buyers back.',
  },
  {
    name: 'UI/UX for Mobile Apps',
    text: 'Clear, thumb-friendly interfaces and simple journeys designed specifically for small screens and quick interactions.',
  },
  {
    name: 'API & Backend Integration',
    text: 'Secure connections between your app, servers, databases and third-party services, so data flows reliably.',
  },
  {
    name: 'App Testing & Quality Assurance',
    text: 'Thorough testing on real devices and OS versions to catch bugs, crashes and performance problems before launch.',
  },
  {
    name: 'App Deployment',
    text: 'We prepare, submit and publish your app on Google Play and the App Store, and handle the review requirements.',
  },
  {
    name: 'App Maintenance & Support',
    text: 'Regular updates, bug fixes, OS compatibility upgrades and improvements that keep your app useful over time.',
  },
]

const APP_APPROACH = [
  {
    name: 'Requirement Analysis',
    text: 'We learn about your idea, audience and goals, and define clearly what the app needs to do.',
  },
  {
    name: 'Planning',
    text: 'Features, platforms, technology, milestones and timelines are agreed before development starts.',
  },
  {
    name: 'UI/UX Design',
    text: 'Screens and user journeys are designed and reviewed with you, so the experience is approved before it is built.',
  },
  {
    name: 'App Development',
    text: 'Our developers turn the approved designs into a working app, with regular progress updates.',
  },
  {
    name: 'API Integration',
    text: 'The app is connected to the backend and any third-party services it relies on.',
  },
  {
    name: 'Testing',
    text: 'Functionality, performance, security and device compatibility are checked thoroughly.',
  },
  {
    name: 'Deployment',
    text: 'The finished app is published on the app stores and made available to your users.',
  },
  {
    name: 'Maintenance & Support',
    text: 'After launch we stay with you for updates, fixes and new features as your app grows.',
  },
]

const BUSINESS_VALUE = [
  'Reach customers directly on the mobile devices they use every day.',
  'Improve customer engagement through notifications, personalised content and easy access.',
  'Create convenient digital experiences that make your services quick to use.',
  'Automate business processes, reducing manual work and saving time.',
  'Build a stronger brand presence with an app that is always on your customers’ phones.',
  'Support business growth by opening new channels for sales and service.',
  'Create scalable and reliable mobile products that keep working as your user base grows.',
]

const WHY_US = [
  'User-focused mobile experiences, designed around how people really use their phones.',
  'Custom app solutions shaped by your requirements rather than a fixed template.',
  'Modern development practices, tools and frameworks.',
  'Clean, maintainable code that is easy to update and extend.',
  'Responsive, intuitive interfaces that work well on different screen sizes.',
  'Secure API and backend integration that protects your users’ data.',
  'Performance-focused development, for quick start-up and smooth interactions.',
  'Scalable architecture that is ready for more users and new features.',
  'Long-term maintenance and support, so your app stays reliable after launch.',
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
              At Sahajanand Infotech, we build{' '}
              <strong>modern, reliable and scalable mobile applications</strong>{' '}
              that help businesses connect with their customers and deliver
              better digital experiences. Whether you are launching a new idea
              or improving an existing product, we design and develop apps that
              are simple to use and dependable in everyday life.
            </p>
            <p>
              Our team brings together thoughtful design, clean engineering and
              careful testing, so your app makes a strong first impression and
              keeps users coming back.
            </p>

            <h2>Our App Development Services</h2>
            <ul>
              {APP_SERVICES.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>Our App Development Approach</h2>
            <p>
              Great apps come from a clear process. We guide your idea through
              a structured journey, from the first requirement to long-term
              support.
            </p>
            <ul>
              {APP_APPROACH.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>How Professional Mobile App Development Helps Your Business</h2>
            <p>
              A well-built mobile app puts your business in your customers’
              hands and gives you a direct, lasting way to serve them.
            </p>
            <ul>
              {BUSINESS_VALUE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Why Sahajanand Infotech?</h2>
            <p>
              We see every app as a long-term product, not a one-time delivery.
              Our designers, developers and testers work together to build
              something that fits your goals and your users.
            </p>
            <ul>
              {WHY_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Turn Your App Idea Into Reality</h2>
            <p>
              Have a mobile app idea, or a product you want to take further?
              Share your concept, requirements and goals with us. We will
              understand what you want to achieve and help you plan the right
              app for your business. Use the form to start the conversation.
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
