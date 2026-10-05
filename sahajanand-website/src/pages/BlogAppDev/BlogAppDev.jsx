import { useEffect, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/blog/main.png'
import articleImage from '../../assets/images/blog/appside.png'
import './BlogAppDev.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/BlogHeroTitleScale.css'
import { Reveal } from '../../components/motion/Reveal'
import { ArticleItem, ArticleSection } from '../../components/motion/ArticleReveal'

const TOC_ITEMS = [
  { id: 'introduction', label: 'Introduction' },
  {
    id: 'why-mobile-app-development',
    label: 'Why Businesses Need High-Quality Mobile App Development',
  },
]

const HERO_COPY_RISE_PX = 40
const HERO_COPY_STAGGER_S = 0.15
const TOC_SLIDE_PX = 40
const heroCopyReveal = (delay) => ({ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] })

function BlogAppDev() {
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0].id)
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const sections = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    )
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  return (
    <div className="blog-appdev">
      <Header homePath="/" compactLogoLight />

      <section className="blog-appdev__hero" aria-label="App Development">
        <img
          className="blog-appdev__hero-image"
          src={heroImage}
          alt="App Development"
        />
        <div className="blog-appdev__hero-overlay" aria-hidden="true" />
        <div className="blog-appdev__hero-copy">
          <Reveal
            as="h1"
            className="blog-appdev__hero-title service-title-reveal"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(0)}
          >
            {/* The shared scale-up keyframes would run alongside the rise */}
            <span className="service-title-reveal__text" style={{ animation: 'none' }}>
              App Development
            </span>
          </Reveal>
          <Reveal
            as="nav"
            className="blog-appdev__breadcrumb"
            aria-label="Breadcrumb"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
          >
            <a href="/">Home</a>
            <span className="blog-appdev__breadcrumb-sep" aria-hidden="true">
              &gt;
            </span>
            <span aria-current="page">App Development</span>
          </Reveal>
        </div>
      </section>

      <div className="blog-appdev__body">
        <div className="blog-appdev__layout">
          <Reveal
            as="aside"
            className="blog-appdev__toc"
            x={-TOC_SLIDE_PX}
            y={0}
            transition={heroCopyReveal(0)}
            aria-label="Table of Contents"
          >
            <div className={`blog-appdev__toc-card${tocOpen ? ' is-open' : ''}`}>
              <div className="blog-appdev__toc-header">
                <h2 className="blog-appdev__toc-title" id="blog-appdev-toc-heading">
                  Table of Contents
                </h2>
                <button
                  type="button"
                  className="blog-appdev__toc-toggle"
                  aria-expanded={tocOpen}
                  aria-controls="blog-appdev-toc-panel"
                  aria-label={tocOpen ? 'Collapse table of contents' : 'Expand table of contents'}
                  onClick={() => setTocOpen((open) => !open)}
                >
                  <span className="blog-appdev__toc-chevron" aria-hidden="true" />
                </button>
              </div>
              <div
                id="blog-appdev-toc-panel"
                className="blog-appdev__toc-panel"
                role="region"
                aria-labelledby="blog-appdev-toc-heading"
                aria-hidden={!tocOpen}
              >
                <ol className="blog-appdev__toc-list">
                  {TOC_ITEMS.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`blog-appdev__toc-link${
                          activeSection === item.id ? ' is-active' : ''
                        }`}
                        tabIndex={tocOpen ? undefined : -1}
                        onClick={(event) => scrollToSection(event, item.id)}
                      >
                        <span className="blog-appdev__toc-index">
                          {index + 1}.
                        </span>
                        <span className="blog-appdev__toc-label">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <article className="blog-appdev__article">
            <Reveal
              as="h2"
              className="blog-appdev__article-title"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(0)}
            >
              App Development: Building Powerful, Scalable and User-Friendly
              Mobile Experiences
            </Reveal>

            <Reveal
              as="img"
              className="blog-appdev__article-image"
              src={articleImage}
              alt="App development workspace"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
            />

            <ArticleSection id="introduction" className="blog-appdev__section">
              <ArticleItem as="h3">Introduction</ArticleItem>
              <ArticleItem as="p">
                Mobile applications have become an essential part of how modern
                businesses connect with customers. An app puts products,
                services and support within easy reach, helping brands stay
                present in everyday digital habits.
              </ArticleItem>
              <ArticleItem as="p">
                A thoughtfully designed mobile app improves customer engagement
                and accessibility by offering a focused, convenient experience
                on the devices people use most. From browsing information to
                completing transactions, apps can make key interactions faster
                and more intuitive.
              </ArticleItem>
              <ArticleItem as="p">
                When built with the right technology, performance and user
                experience in mind, a mobile application can support long-term
                business growth—strengthening relationships with users while
                creating a scalable channel for future features and services.
              </ArticleItem>
            </ArticleSection>

            <ArticleSection id="why-mobile-app-development" className="blog-appdev__section">
              <ArticleItem as="h3">
                Why Businesses Need High-Quality Mobile App Development
              </ArticleItem>
              <ArticleItem as="p">
                Customers expect digital experiences that feel personal, reliable
                and available whenever they need them. High-quality mobile app
                development helps businesses meet those expectations while
                building a stronger connection with their audience.
              </ArticleItem>
              <ArticleItem as="p">
                A well-developed app can improve engagement, streamline access to
                products and services, and create a consistent brand presence
                across Android and iOS platforms.
              </ArticleItem>
              <ul>
                <ArticleItem as="li">
                  Better customer engagement through always-available access
                </ArticleItem>
                <ArticleItem as="li">
                  Personalized user experiences tailored to individual needs
                </ArticleItem>
                <ArticleItem as="li">Faster access to products, services and support</ArticleItem>
                <ArticleItem as="li">Stronger brand presence on mobile devices</ArticleItem>
                <ArticleItem as="li">Business process automation that reduces friction</ArticleItem>
                <ArticleItem as="li">Scalable architecture that grows with your business</ArticleItem>
                <ArticleItem as="li">Security and performance that protect users and data</ArticleItem>
                <ArticleItem as="li">Reliable Android and iOS support for wider reach</ArticleItem>
              </ul>
            </ArticleSection>
          </article>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default BlogAppDev
