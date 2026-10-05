import { useEffect, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/blog/main.png'
import articleImage from '../../assets/images/blog/digitalapp.png'
import './BlogMarketing.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/BlogHeroTitleScale.css'
import { Reveal } from '../../components/motion/Reveal'
import { ArticleItem, ArticleSection } from '../../components/motion/ArticleReveal'

const TOC_ITEMS = [
  { id: 'introduction', label: 'Introduction' },
  {
    id: 'why-digital-marketing-strategy',
    label: 'Why Businesses Need a Strong Digital Marketing Strategy',
  },
]

const HERO_COPY_RISE_PX = 40
const HERO_COPY_STAGGER_S = 0.15
const TOC_SLIDE_PX = 40
const heroCopyReveal = (delay) => ({ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] })

function BlogMarketing() {
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
    <div className="blog-marketing">
      <Header homePath="/" compactLogoLight />

      <section className="blog-marketing__hero" aria-label="Digital Marketing">
        <img
          className="blog-marketing__hero-image"
          src={heroImage}
          alt="Digital Marketing"
        />
        <div className="blog-marketing__hero-overlay" aria-hidden="true" />
        <div className="blog-marketing__hero-copy">
          <Reveal
            as="h1"
            className="blog-marketing__hero-title service-title-reveal"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(0)}
          >
            {/* The shared scale-up keyframes would run alongside the rise */}
            <span className="service-title-reveal__text" style={{ animation: 'none' }}>
              Digital Marketing
            </span>
          </Reveal>
          <Reveal
            as="nav"
            className="blog-marketing__breadcrumb"
            aria-label="Breadcrumb"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
          >
            <a href="/">Home</a>
            <span className="blog-marketing__breadcrumb-sep" aria-hidden="true">
              &gt;
            </span>
            <span aria-current="page">Digital Marketing</span>
          </Reveal>
        </div>
      </section>

      <div className="blog-marketing__body">
        <div className="blog-marketing__layout">
          <Reveal
            as="aside"
            className="blog-marketing__toc"
            x={-TOC_SLIDE_PX}
            y={0}
            transition={heroCopyReveal(0)}
            aria-label="Table of Contents"
          >
            <div className={`blog-marketing__toc-card${tocOpen ? ' is-open' : ''}`}>
              <div className="blog-marketing__toc-header">
                <h2
                  className="blog-marketing__toc-title"
                  id="blog-marketing-toc-heading"
                >
                  Table of Contents
                </h2>
                <button
                  type="button"
                  className="blog-marketing__toc-toggle"
                  aria-expanded={tocOpen}
                  aria-controls="blog-marketing-toc-panel"
                  aria-label={
                    tocOpen
                      ? 'Collapse table of contents'
                      : 'Expand table of contents'
                  }
                  onClick={() => setTocOpen((open) => !open)}
                >
                  <span className="blog-marketing__toc-chevron" aria-hidden="true" />
                </button>
              </div>
              <div
                id="blog-marketing-toc-panel"
                className="blog-marketing__toc-panel"
                role="region"
                aria-labelledby="blog-marketing-toc-heading"
                aria-hidden={!tocOpen}
              >
                <ol className="blog-marketing__toc-list">
                  {TOC_ITEMS.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`blog-marketing__toc-link${
                          activeSection === item.id ? ' is-active' : ''
                        }`}
                        tabIndex={tocOpen ? undefined : -1}
                        onClick={(event) => scrollToSection(event, item.id)}
                      >
                        <span className="blog-marketing__toc-index">
                          {index + 1}.
                        </span>
                        <span className="blog-marketing__toc-label">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <article className="blog-marketing__article">
            <Reveal
              as="h2"
              className="blog-marketing__article-title"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(0)}
            >
              Digital Marketing: Building Strong Brands and Driving Meaningful
              Online Growth
            </Reveal>

            <Reveal
              as="img"
              className="blog-marketing__article-image"
              src={articleImage}
              alt="Digital marketing workspace"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
            />

            <ArticleSection id="introduction" className="blog-marketing__section">
              <ArticleItem as="h3">Introduction</ArticleItem>
              <ArticleItem as="p">
                Digital marketing helps businesses build a clear and lasting
                online presence. Through websites, search, social platforms and
                other digital channels, brands can introduce their value to
                people who are already looking for related products and
                services.
              </ArticleItem>
              <ArticleItem as="p">
                A well-planned digital marketing approach makes it easier to
                reach the right audience, increase brand awareness and generate
                qualified leads. Instead of relying on broad, unfocused
                outreach, businesses can share useful content and offers where
                their customers spend time online.
              </ArticleItem>
              <ArticleItem as="p">
                Over time, consistent digital marketing also supports meaningful
                customer connections. When messaging, channels and experiences
                work together, businesses can guide people from first discovery
                to lasting engagement with greater clarity and purpose.
              </ArticleItem>
            </ArticleSection>

            <ArticleSection id="why-digital-marketing-strategy" className="blog-marketing__section">
              <ArticleItem as="h3">
                Why Businesses Need a Strong Digital Marketing Strategy
              </ArticleItem>
              <ArticleItem as="p">
                A strong digital marketing strategy gives businesses direction in
                a crowded online landscape. It connects brand goals with the
                channels, campaigns and content that are most likely to attract
                and convert the right audience.
              </ArticleItem>
              <ArticleItem as="p">
                With a clear strategy, teams can improve visibility, engage
                customers more effectively and make decisions based on real
                performance data—supporting growth that can be measured and
                improved over time.
              </ArticleItem>
              <ul>
                <ArticleItem as="li">Strong online presence across key digital channels</ArticleItem>
                <ArticleItem as="li">Better audience targeting for more relevant outreach</ArticleItem>
                <ArticleItem as="li">Brand awareness that builds recognition and trust</ArticleItem>
                <ArticleItem as="li">Lead generation that supports sales and growth</ArticleItem>
                <ArticleItem as="li">Social media marketing that encourages engagement</ArticleItem>
                <ArticleItem as="li">Search engine visibility for organic discovery</ArticleItem>
                <ArticleItem as="li">Paid advertising that amplifies high-intent traffic</ArticleItem>
                <ArticleItem as="li">
                  Data-driven decision making guided by performance insights
                </ArticleItem>
                <ArticleItem as="li">Better customer engagement throughout the journey</ArticleItem>
                <ArticleItem as="li">Measurable business growth with clear results</ArticleItem>
              </ul>
            </ArticleSection>
          </article>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default BlogMarketing
