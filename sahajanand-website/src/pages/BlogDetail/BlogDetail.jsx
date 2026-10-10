import { useEffect, useMemo, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/blog/main.png'
import './BlogDetail.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/BlogHeroTitleScale.css'
import { Reveal } from '../../components/motion/Reveal'
import { ArticleItem, ArticleSection } from '../../components/motion/ArticleReveal'
import { blogImageUrl, fetchBlogBySlug } from '../../utils/blogApi'

const HERO_COPY_RISE_PX = 40
const HERO_COPY_STAGGER_S = 0.15
const TOC_SLIDE_PX = 40
const heroCopyReveal = (delay) => ({ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] })

const toAnchor = (heading, index) => {
  const base = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'section'}-${index + 1}`
}

/* Blank-line separated text -> paragraphs */
const toParagraphs = (content) =>
  String(content || '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)

function BlogArticle({ blog }) {
  const sections = useMemo(
    () =>
      (blog.sections || []).map((section, index) => ({
        id: toAnchor(section.heading || '', index),
        heading: section.heading,
        paragraphs: toParagraphs(section.content),
        bullets: section.bullets || [],
      })),
    [blog],
  )

  const tocItems = sections.filter((section) => section.heading)
  const [activeSection, setActiveSection] = useState(tocItems[0]?.id || '')
  const [tocOpen, setTocOpen] = useState(false)
  const articleImage = blogImageUrl(blog.articleImage)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const elements = tocItems.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (!elements.length) return undefined

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

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections])

  const scrollToSection = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  return (
    <div className="blog-detail">
      <Header homePath="/" />

      <section className="blog-detail__hero" aria-label={blog.title}>
        <img className="blog-detail__hero-image" src={heroImage} alt={blog.title} />
        <div className="blog-detail__hero-overlay" aria-hidden="true" />
        <div className="blog-detail__hero-copy">
          <Reveal
            as="h1"
            className="blog-detail__hero-title service-title-reveal"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(0)}
          >
            {/* The shared scale-up keyframes would run alongside the rise */}
            <span className="service-title-reveal__text" style={{ animation: 'none' }}>
              {blog.title}
            </span>
          </Reveal>
          <Reveal
            as="nav"
            className="blog-detail__breadcrumb"
            aria-label="Breadcrumb"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
          >
            <a href="/">Home</a>
            <span className="blog-detail__breadcrumb-sep" aria-hidden="true">
              &gt;
            </span>
            <span aria-current="page">{blog.title}</span>
          </Reveal>
        </div>
      </section>

      <div className="blog-detail__body">
        <div className="blog-detail__layout">
          <Reveal
            as="aside"
            className="blog-detail__toc"
            x={-TOC_SLIDE_PX}
            y={0}
            transition={heroCopyReveal(0)}
            aria-label="Table of Contents"
          >
            <div className={`blog-detail__toc-card${tocOpen ? ' is-open' : ''}`}>
              <div className="blog-detail__toc-header">
                <h2 className="blog-detail__toc-title" id="blog-detail-toc-heading">
                  Table of Contents
                </h2>
                <button
                  type="button"
                  className="blog-detail__toc-toggle"
                  aria-expanded={tocOpen}
                  aria-controls="blog-detail-toc-panel"
                  aria-label={tocOpen ? 'Collapse table of contents' : 'Expand table of contents'}
                  onClick={() => setTocOpen((open) => !open)}
                >
                  <span className="blog-detail__toc-chevron" aria-hidden="true" />
                </button>
              </div>
              <div
                id="blog-detail-toc-panel"
                className="blog-detail__toc-panel"
                role="region"
                aria-labelledby="blog-detail-toc-heading"
                aria-hidden={!tocOpen}
              >
                <ol className="blog-detail__toc-list">
                  {tocItems.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`blog-detail__toc-link${
                          activeSection === item.id ? ' is-active' : ''
                        }`}
                        tabIndex={tocOpen ? undefined : -1}
                        onClick={(event) => scrollToSection(event, item.id)}
                      >
                        <span className="blog-detail__toc-index">{index + 1}.</span>
                        <span className="blog-detail__toc-label">{item.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <article className="blog-detail__article">
            <Reveal
              as="h2"
              className="blog-detail__article-title"
              y={HERO_COPY_RISE_PX}
              transition={heroCopyReveal(0)}
            >
              {blog.articleHeading || blog.title}
            </Reveal>

            {articleImage ? (
              <Reveal
                as="img"
                className="blog-detail__article-image"
                src={articleImage}
                alt={`${blog.title} workspace`}
                y={HERO_COPY_RISE_PX}
                transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
              />
            ) : null}

            {sections.map((section) => (
              <ArticleSection key={section.id} id={section.id} className="blog-detail__section">
                {section.heading ? <ArticleItem as="h3">{section.heading}</ArticleItem> : null}
                {section.paragraphs.map((paragraph, index) => (
                  <ArticleItem as="p" key={index}>
                    {paragraph}
                  </ArticleItem>
                ))}
                {section.bullets.length ? (
                  <ul>
                    {section.bullets.map((bullet, index) => (
                      <ArticleItem as="li" key={index}>
                        {bullet}
                      </ArticleItem>
                    ))}
                  </ul>
                ) : null}
              </ArticleSection>
            ))}
          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function BlogDetail({ slug }) {
  /* state: { slug, blog } once loaded; blog is null when the blog does not exist */
  const [state, setState] = useState({ slug: null, blog: null, failed: false })

  useEffect(() => {
    const controller = new AbortController()

    fetchBlogBySlug(slug, controller.signal)
      .then((blog) => setState({ slug, blog, failed: false }))
      .catch((error) => {
        if (error.name === 'AbortError') return

        console.error('Failed to load blog:', error)
        setState({ slug, blog: null, failed: true })
      })

    return () => controller.abort()
  }, [slug])

  if (state.slug !== slug) {
    return (
      <div className="blog-detail">
        <Header homePath="/" />
        <main className="blog-detail__state" aria-busy="true" />
        <Footer />
      </div>
    )
  }

  if (!state.blog) {
    return (
      <div className="blog-detail">
        <Header homePath="/" />
        <main className="blog-detail__state">
          <h1 className="blog-detail__state-title">
            {state.failed ? 'Unable to load this blog' : 'Blog not found'}
          </h1>
          <p className="blog-detail__state-text">
            {state.failed
              ? 'Something went wrong while loading the blog. Please try again.'
              : 'This blog is unavailable or the link is incorrect.'}
          </p>
          <a className="blog-detail__state-link" href="/blog">
            Back to Blog
          </a>
        </main>
        <Footer />
      </div>
    )
  }

  return <BlogArticle key={state.blog._id} blog={state.blog} />
}

export default BlogDetail
