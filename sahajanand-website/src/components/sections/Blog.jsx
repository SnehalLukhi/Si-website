import { useEffect, useRef, useState } from 'react'
import { ViewportReveal } from '../motion/Reveal'
import PeekCarousel from '../common/PeekCarousel'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useBlogPosts } from '../../hooks/useBlogPosts'
import './Blog.css'

/* Peek carousel (centre card + half of each neighbour) up to 1199px; three full cards from 1200px */
const PEEK_QUERY = '(max-width: 1199px)'

export function BlogCard({ post }) {
  return (
    <article className="blog__card">
      <div className="blog__media">
        <img className="blog__image" src={post.image} alt="" />
      </div>
      <div className="blog__body">
        <h3
          className={`blog__title${
            post.title === 'App Development' ? ' blog__title--nowrap' : ''
          }`}
        >
          {post.title}
        </h3>
        <p className="blog__date">{post.date}</p>
        <p className="blog__excerpt">{post.excerpt}</p>
        <a className="blog__more" href={post.href || '#blog'}>
          Read More
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

const AUTOPLAY_MS = 5000
const SLIDE_MS = 1000
const DESKTOP_VISIBLE = 3

function getVisibleCount() {
  if (window.matchMedia('(max-width: 676px)').matches) return 2
  if (window.matchMedia('(max-width: 1199px)').matches) return 2
  return DESKTOP_VISIBLE
}

function Blog() {
  const { posts: POSTS } = useBlogPosts()
  const isPeek = useMediaQuery(PEEK_QUERY)
  const [page, setPage] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [visible, setVisible] = useState(getVisibleCount)
  const sectionRef = useRef(null)
  const snapTimeout = useRef(0)
  const autoplayRef = useRef(0)
  /* With fewer blogs than visible cards there is nothing to slide, so the row stays still */
  const canSlide = POSTS.length >= visible

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const updateCover = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // Blog has fully entered when the whole section fits on screen.
      // Cover exactly the band above it so Services cannot remain visible.
      const fullyEntered = rect.top >= -1 && rect.bottom <= vh + 1
      const coverHeight = fullyEntered && rect.top > 0 ? Math.ceil(rect.top) : 0

      section.classList.toggle('blog--cover', coverHeight > 0)
      section.style.setProperty('--blog-cover-height', `${coverHeight}px`)
    }

    updateCover()
    window.addEventListener('scroll', updateCover, { passive: true })
    window.addEventListener('resize', updateCover)
    window.addEventListener('hashchange', updateCover)

    const observer = new IntersectionObserver(updateCover, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })
    observer.observe(section)

    return () => {
      window.removeEventListener('scroll', updateCover)
      window.removeEventListener('resize', updateCover)
      window.removeEventListener('hashchange', updateCover)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const oneCard = window.matchMedia('(max-width: 676px)')
    const twoCards = window.matchMedia('(max-width: 1199px)')
    const onChange = () => {
      setVisible(getVisibleCount())
      setPage(0)
      setAnimate(false)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setAnimate(true))
      })
    }

    oneCard.addEventListener('change', onChange)
    twoCards.addEventListener('change', onChange)
    return () => {
      oneCard.removeEventListener('change', onChange)
      twoCards.removeEventListener('change', onChange)
    }
  }, [])

  /* The list can change while the page is open (Admin edits); start from the first card again */
  useEffect(() => {
    setAnimate(true)
    setPage(0)
  }, [POSTS.length])

  useEffect(() => {
    if (isPeek || !canSlide) return undefined
    autoplayRef.current = window.setInterval(() => {
      setAnimate(true)
      setPage((current) => current + 1)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(autoplayRef.current)
  }, [isPeek, canSlide])

  useEffect(() => {
    if (!canSlide || page < POSTS.length) return undefined

    window.clearTimeout(snapTimeout.current)
    snapTimeout.current = window.setTimeout(() => {
      setAnimate(false)
      setPage(0)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setAnimate(true))
      })
    }, SLIDE_MS)

    return () => window.clearTimeout(snapTimeout.current)
  }, [page, canSlide, POSTS.length])

  const trackItems = canSlide ? [...POSTS, ...POSTS] : POSTS
  const cardStep = `calc(100% / ${visible})`

  return (
    <section
      ref={sectionRef}
      className="blog"
      id="blog"
      aria-label="Latest blog"
    >
      <div className="blog__inner">
        <header className="blog__header">
          <ViewportReveal
            as="p"
            className="blog__eyebrow"
            scale={1}
            y={28}
            duration={1}
          >
            Latest Blog
          </ViewportReveal>
          <ViewportReveal
            as="h2"
            className="blog__heading"
            scale={1}
            y={28}
            duration={1}
            delay={0.18}
          >
            Read The Latest Articles from
            <br />
            Our Blog Post
          </ViewportReveal>
        </header>

        <ViewportReveal
          className="blog__slider"
          aria-roledescription="carousel"
          scale={1}
          y={80}
          threshold={0.1}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
        >
          {POSTS.length === 0 ? null : isPeek ? (
            <PeekCarousel
              key={POSTS.length}
              items={POSTS}
              getKey={(post) => post.id}
              label="Latest blog"
              autoplayMs={AUTOPLAY_MS}
              renderItem={(post) => <BlogCard post={post} />}
            />
          ) : (
            <div className="blog__viewport">
              <ul
                className="blog__track"
                style={{
                  transform: `translate3d(calc(-${page} * ${cardStep}), 0, 0)`,
                  transition: animate
                    ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                    : 'none',
                }}
              >
                {trackItems.map((post, itemIndex) => (
                  <li
                    key={`${post.id}-${itemIndex}`}
                    className="blog__slide"
                    style={{ flex: `0 0 calc(100% / ${visible})` }}
                  >
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ViewportReveal>
      </div>
    </section>
  )
}

export default Blog
