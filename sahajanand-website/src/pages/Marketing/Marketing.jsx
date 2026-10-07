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
  {
    name: 'Search Engine Optimization (SEO)',
    text: 'We improve your site structure, content and authority so your business ranks higher and is found by people already searching for you.',
  },
  {
    name: 'Social Media Marketing',
    text: 'Targeted campaigns on the platforms your audience uses, built to raise awareness and start real conversations.',
  },
  {
    name: 'Search Engine Marketing (SEM/PPC)',
    text: 'Paid search campaigns that place your business in front of high-intent customers at the moment they are looking.',
  },
  {
    name: 'Content Marketing',
    text: 'Useful, well-written content such as blogs, guides and web copy that attracts visitors and builds trust in your brand.',
  },
  {
    name: 'Social Media Management',
    text: 'Planning, posting and community care for your social channels, so your brand stays active, consistent and responsive.',
  },
  {
    name: 'Google Ads & Paid Campaigns',
    text: 'Carefully structured Google Ads and paid campaigns, managed to bring quality traffic and make good use of your budget.',
  },
  {
    name: 'Local SEO',
    text: 'We strengthen your presence in local search and maps, so nearby customers can find, call and visit your business.',
  },
  {
    name: 'Performance Marketing',
    text: 'Results-driven campaigns focused on measurable actions such as leads, enquiries and sales, with clear cost control.',
  },
  {
    name: 'Online Brand Promotion',
    text: 'A consistent brand message across search, social and web, so more people recognise and remember your business.',
  },
  {
    name: 'Analytics & Performance Tracking',
    text: 'Clear tracking and reporting that show what is working, what is not, and where to focus next.',
  },
]

const MARKETING_APPROACH = [
  {
    name: 'Business & Audience Analysis',
    text: 'We learn about your business, competitors and customers, to understand who we need to reach and why.',
  },
  {
    name: 'Marketing Strategy',
    text: 'Goals, channels, budget and key messages are brought together into a clear, practical plan.',
  },
  {
    name: 'Content Planning',
    text: 'We plan the content, creatives and calendar that will carry your message to the right audience.',
  },
  {
    name: 'Campaign Execution',
    text: 'Campaigns go live across the chosen channels, with careful setup and consistent quality.',
  },
  {
    name: 'Performance Tracking',
    text: 'We monitor traffic, engagement, leads and costs, and report on them in plain language.',
  },
  {
    name: 'Optimization',
    text: 'Based on the data, we adjust targeting, content and budgets to improve results.',
  },
  {
    name: 'Continuous Growth',
    text: 'We keep learning and refining, so your marketing grows stronger over time.',
  },
]

const BUSINESS_VALUE = [
  'Increase your online visibility, so more people find your business.',
  'Reach the right audience, instead of spending on people who will never buy.',
  'Generate quality leads that are genuinely interested in what you offer.',
  'Improve brand awareness and make your business easier to recognise and trust.',
  'Increase website traffic from search, social media and paid channels.',
  'Improve customer engagement through relevant content and timely conversations.',
  'Support conversions and business growth by guiding visitors towards action.',
  'Make data-driven marketing decisions, based on facts rather than guesses.',
]

const WHY_US = [
  'Strategy-driven marketing: every activity is planned around a clear objective.',
  'Audience-focused campaigns that speak to the people who matter most to you.',
  'Data and analytics at the centre of every decision we make.',
  'Creative content that is clear, engaging and true to your brand.',
  'Performance tracking with simple reports you can easily understand.',
  'Continuous optimization, so results keep improving month after month.',
  'Transparent communication, with honest updates on progress and spending.',
  'Business-focused goals, aimed at leads, sales and growth, not just numbers.',
  'A long-term view of digital growth, built to last beyond a single campaign.',
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
              At Sahajanand Infotech, we help businesses build a{' '}
              <strong>stronger digital presence</strong> through strategic
              digital marketing, audience-focused campaigns and measurable
              online growth. We combine planning, creativity and data to put
              your business in front of the people who are ready to hear from
              you.
            </p>
            <p>
              Every campaign we run is tied to a clear business goal, so you
              can see what your marketing is achieving and where it is heading.
            </p>

            <h2>Our Digital Marketing Services</h2>
            <ul>
              {MARKETING_SERVICES.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>Our Marketing Approach</h2>
            <p>
              Effective marketing follows a clear path. We move from
              understanding your business to steady, continuous growth.
            </p>
            <ul>
              {MARKETING_APPROACH.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2>How Professional Digital Marketing Helps Your Business</h2>
            <p>
              Good digital marketing does more than bring visitors. It builds
              awareness, trust and a steady flow of customers.
            </p>
            <ul>
              {BUSINESS_VALUE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Why Sahajanand Infotech?</h2>
            <p>
              We treat your marketing as a partnership. We plan carefully,
              explain openly and keep working towards your long-term growth.
            </p>
            <ul>
              {WHY_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Grow Your Business With Smarter Digital Marketing</h2>
            <p>
              Want more customers, better visibility or a clearer marketing
              plan? Tell us about your marketing goals, your target audience
              and your digital growth requirements. We will listen, review
              where you stand today and suggest the right way forward. Use the
              form to start the conversation.
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
