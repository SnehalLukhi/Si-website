import { useEffect, useRef, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/digitalmarketing.png'
import iconMeta from '../../assets/images/icons/meta.png'
import iconAd from '../../assets/images/icons/ad.png'
import iconConsole from '../../assets/images/icons/console.png'
import iconAnalytics from '../../assets/images/icons/GoogleAnalytics.png'
import './Marketing.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/motion/serviceScrollAnimations.css'
import { useServiceScrollAnimations } from '../../components/motion/useServiceScrollAnimations'
import { useServiceInquiry } from '../../hooks/useServiceInquiry'
import ServiceFormStatus from '../../components/common/ServiceFormStatus'

const MARKETING_SERVICES = [
  'Social Media Marketing',
  'Meta Ads Management',
  'Google Ads Campaigns',
  'Search Engine Optimization',
  'Content Marketing',
  'Brand Awareness Campaigns',
  'Performance Tracking & Analytics',
]

const TOOLS = [
  'Meta Ads',
  'Google Ads',
  'Google Search Console',
  'Google Analytics',
]

const EXPERTISE = [
  {
    title: 'Marketing Tools',
    tone: 'lavender',
    items: [
      { name: 'Meta', icon: iconMeta },
      { name: 'Google Ads', icon: iconAd },
      { name: 'Search Console', icon: iconConsole },
      { name: 'Google Analytics', icon: iconAnalytics },
    ],
  },
]

function Marketing() {
  const rootRef = useRef(null)
  useServiceScrollAnimations(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleSubmit, status, submitting } = useServiceInquiry('Marketing')

  return (
    <div className="marketing" ref={rootRef}>
      <Header homePath="/" compactLogoLight />

      <section className="marketing__hero" aria-label="Marketing">
        <img
          className="marketing__hero-image"
          src={heroImage}
          alt="Marketing"
        />
        <div className="marketing__hero-overlay" aria-hidden="true" />
        <div className="marketing__hero-copy">
          <h1 className="marketing__hero-title service-title-reveal service-title-reveal--grow">
            <span className="service-title-reveal__text">Marketing</span>
          </h1>
          <nav className="marketing__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="marketing__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">Marketing</span>
          </nav>
        </div>
      </section>

      <div className="marketing__main">
        <div className="marketing__grid">
          <div className="marketing__content">
            <p>
              We deliver exceptional{' '}
              <strong>marketing solutions</strong> that blend smart strategy,
              creative campaigns, and measurable performance. Our approach
              focuses on growing brand visibility, attracting the right
              audience, and turning engagement into real business results.
            </p>
            <p>
              Your brand growth matters the most.{' '}
              <strong>
                We build marketing strategies that meet 100% of your project’s
                goals.
              </strong>{' '}
              That’s how we stand apart – by creating data-driven campaigns that
              prioritize reach, conversions, and long-term impact.
            </p>

            <h2>Our Marketing Services</h2>
            <ul>
              {MARKETING_SERVICES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Tools & Technologies We Use</h2>
            <ul>
              {TOOLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Grow Your Business With Our Marketing Expertise</h2>
            <ul>
              <li>Result-driven digital marketing campaigns</li>
              <li>Targeted ads that reach the right audience</li>
              <li>Analytics-focused growth strategy</li>
            </ul>
            <p>
              We help you build campaigns that leave a strong impression and
              deliver measurable growth. Hire our dedicated marketing experts
              to work exclusively on your project and grow your brand with
              exceptional marketing precision.
            </p>

            <h2>Perks You Get:</h2>
            <ul>
              <li>Dedicated marketers focused entirely on your project.</li>
              <li>Flexible pricing — hourly or monthly.</li>
              <li>Daily campaign updates and progress reports.</li>
            </ul>

            <h2>Why Choose Sahajanand Infotech for Marketing?</h2>
            <p>
              Our team of expert marketers has delivered modern,
              high-performing campaigns for brands, startups, SaaS products,
              and growing businesses.
            </p>
            <ul>
              <li>Affordable and premium-quality marketing solutions.</li>
              <li>Complete marketing process — from strategy to optimization.</li>
              <li>Tailored campaign strategy for your business goals.</li>
              <li>Highly skilled marketers with years of experience.</li>
              <li>Campaigns optimized for reach, engagement, and conversions.</li>
              <li>Future-ready and scalable digital marketing frameworks.</li>
            </ul>

            <h2>Let’s Discuss Your Requirement</h2>
            <p>
              Share your marketing needs with us. We’ll help you refine your
              goals and create a reliable, high-performing marketing plan that
              aligns with your brand and growth targets.
            </p>
          </div>

          <aside className="marketing__form-wrap">
            <form className="marketing__form" onSubmit={handleSubmit}>
              <h2 className="marketing__form-title">Let’s Get In Touch</h2>
              <span className="marketing__form-rules" aria-hidden="true">
                <span />
                <span />
              </span>
              <label className="marketing__field">
                <span className="marketing__sr">Name</span>
                <input type="text" name="name" placeholder="Name" autoComplete="name" />
              </label>
              <label className="marketing__field">
                <span className="marketing__sr">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" />
              </label>
              <label className="marketing__field">
                <span className="marketing__sr">Subject</span>
                <input type="text" name="subject" placeholder="Subject" />
              </label>
              <label className="marketing__field">
                <span className="marketing__sr">Message</span>
                <textarea name="message" placeholder="Message" rows="6" />
              </label>
              <button className="marketing__submit" type="submit" disabled={submitting}>
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

      <section className="marketing__skills" aria-label="Our expertise and skillset">
        <h2>Our Expertise & Skillset</h2>
        <p>A Complete Overview of Our Technical & Creative Capabilities</p>
        <span className="marketing__form-rules" aria-hidden="true">
          <span />
          <span />
        </span>
        {EXPERTISE.map((group) => (
          <div
            key={group.title}
            className={`marketing__skill-row marketing__skill-row--${group.tone}`}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={`marketing__skill-icon${
                      item.iconMod ? ` marketing__skill-icon--${item.iconMod}` : ''
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

export default Marketing
