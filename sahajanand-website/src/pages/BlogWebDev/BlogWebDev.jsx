import { useEffect, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/blog/main.png'
import articleImage from '../../assets/images/blog/webside.png'
import './BlogWebDev.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/BlogHeroTitleScale.css'
import { Reveal } from '../../components/motion/Reveal'
import { ArticleItem, ArticleSection } from '../../components/motion/ArticleReveal'

const TOC_ITEMS = [
  { id: 'introduction', label: 'Introduction' },
  {
    id: 'why-modern-businesses',
    label: 'Why Modern Businesses Need High-Quality Web Development',
  },
]

const HERO_COPY_RISE_PX = 40
const HERO_COPY_STAGGER_S = 0.15
const TOC_SLIDE_PX = 40
const heroCopyReveal = (delay) => ({ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] })

function BlogWebDev() {
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
    <div className="blog-webdev">
      <Header homePath="/" compactLogoLight />

      <section className="blog-webdev__hero" aria-label="Web Development">
        <img
          className="blog-webdev__hero-image"
          src={heroImage}
          alt="Web Development"
        />
        <div className="blog-webdev__hero-overlay" aria-hidden="true" />
        <div className="blog-webdev__hero-copy">
          <Reveal
            as="h1"
            className="blog-webdev__hero-title service-title-reveal"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(0)}
          >
            {/* The shared scale-up keyframes would run alongside the rise */}
            <span className="service-title-reveal__text" style={{ animation: 'none' }}>
              Web Development
            </span>
          </Reveal>
          <Reveal
            as="nav"
            className="blog-webdev__breadcrumb"
            aria-label="Breadcrumb"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
          >
            <a href="/">Home</a>
            <span className="blog-webdev__breadcrumb-sep" aria-hidden="true">
              &gt;
            </span>
            <span aria-current="page">Web Development</span>
          </Reveal>
        </div>
      </section>

      <div className="blog-webdev__body">
        <div className="blog-webdev__layout">
          <Reveal
            as="aside"
            className="blog-webdev__toc"
            x={-TOC_SLIDE_PX}
            y={0}
            transition={heroCopyReveal(0)}
            aria-label="Table of Contents"
          >
            <div className={`blog-webdev__toc-card${tocOpen ? ' is-open' : ''}`}>
              <div className="blog-webdev__toc-header">
                <h2 className="blog-webdev__toc-title" id="blog-webdev-toc-heading">
                  Table of Contents
                </h2>
                <button
                  type="button"
                  className="blog-webdev__toc-toggle"
                  aria-expanded={tocOpen}
                  aria-controls="blog-webdev-toc-panel"
                  aria-label={tocOpen ? 'Collapse table of contents' : 'Expand table of contents'}
                  onClick={() => setTocOpen((open) => !open)}
                >
                  <span className="blog-webdev__toc-chevron" aria-hidden="true" />
                </button>
              </div>
              <div
                id="blog-webdev-toc-panel"
                className="blog-webdev__toc-panel"
                role="region"
                aria-labelledby="blog-webdev-toc-heading"
                aria-hidden={!tocOpen}
              >
                <ol className="blog-webdev__toc-list">
                  {TOC_ITEMS.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`blog-webdev__toc-link${
                          activeSection === item.id ? ' is-active' : ''
                        }`}
                        tabIndex={tocOpen ? undefined : -1}
                        onClick={(event) => scrollToSection(event, item.id)}
                      >
                        <span className="blog-webdev__toc-index">
                          {index + 1}.
                        </span>
                        <span className="blog-webdev__toc-label">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <article className="blog-webdev__article">
            <Reveal
              as="h2"
              className="blog-webdev__article-title"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(0)}
            >
              Web Development: Building Fast, Scalable and High-Performing
              Digital Experiences
            </Reveal>

            <Reveal
              as="img"
              className="blog-webdev__article-image"
              src={articleImage}
              alt="Web development workspace"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
            />

            <ArticleSection id="introduction" className="blog-webdev__section">
              <ArticleItem as="h3">Introduction</ArticleItem>
              <ArticleItem as="p">
                Today, a website is more than just an online presence. It is
                often the first interaction a customer has with a business. A
                well-designed and professionally developed website helps
                businesses build trust, communicate their value and provide a
                smooth digital experience across every device.
              </ArticleItem>
              <ArticleItem as="p">
                Modern web development combines clean design, reliable
                technology, strong performance and scalable architecture to
                create websites that are fast, secure and easy to use.
              </ArticleItem>
              <ArticleItem as="p">
                Whether it is a business website, e-commerce platform or custom
                web application, the right development approach ensures that the
                experience remains reliable as the business grows.
              </ArticleItem>
            </ArticleSection>

            <ArticleSection id="why-modern-businesses" className="blog-webdev__section">
              <ArticleItem as="h3">
                Why Modern Businesses Need High-Quality Web Development
              </ArticleItem>
              <ArticleItem as="p">
                A strong digital presence has become essential for businesses of
                every size. Customers expect websites to load quickly, work
                smoothly on mobile devices and provide clear information without
                unnecessary complexity.
              </ArticleItem>
              <ArticleItem as="p">
                High-quality web development helps businesses deliver better
                user experiences while creating a reliable foundation for future
                growth.
              </ArticleItem>
              <ul>
                <ArticleItem as="li">Faster page loading and better performance</ArticleItem>
                <ArticleItem as="li">Responsive experiences across devices</ArticleItem>
                <ArticleItem as="li">Better user experience and navigation</ArticleItem>
                <ArticleItem as="li">Secure and reliable functionality</ArticleItem>
                <ArticleItem as="li">Scalable architecture for future growth</ArticleItem>
                <ArticleItem as="li">Search-engine-friendly technical structure</ArticleItem>
              </ul>
            </ArticleSection>
          </article>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default BlogWebDev
