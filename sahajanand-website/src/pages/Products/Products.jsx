
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, ViewportReveal } from '../../components/motion/Reveal'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import './Products.css'
import { blogImageUrl as imageUrl } from '../../utils/blogApi'

const API_URL = import.meta.env.VITE_API_URL ?? ''

const PLACEHOLDER_STORE_URL = 'https://play.google.com/store/apps'

const AUTOPLAY_MS = 4500
const SWIPE_THRESHOLD_PX = 40
const easeOut = [0.22, 1, 0.36, 1]

const STAT_RISE_PX = 20
const STAT_STAGGER_S = 0.15
const SCROLL_GAP_PX = 24

const HERO_RISE_PX = 32
const HERO_STAGGER_S = 0.14

const heroReveal = (delay) => ({
  duration: 0.7,
  delay,
  ease: [0.33, 1, 0.68, 1],
})

const revealProps = (reduceMotion) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.7, ease: easeOut },
      }

const AI_CARD_VARIANTS = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

const aiCardProps = (reduceMotion) =>
  reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
        variants: AI_CARD_VARIANTS,
      }

const AI_CARD_TEXT_DELAY_S = 0.2

const aiCardTextVariants = (delay) => ({
  hidden: { opacity: 0, y: HERO_RISE_PX },
  visible: {
    opacity: 1,
    y: 0,
    transition: heroReveal(delay),
  },
})

function ProductCard({ product, hidden, onSelect }) {
  const productUrl =
    product.playStore || product.website || PLACEHOLDER_STORE_URL

  // The product's own downloads text wins; otherwise its own numeric count is shown
  const downloads = product.downloads
    ? String(product.downloads).replace(/\s*Downloads$/i, '')
    : product.downloadCount > 0
      ? formatCompact(product.downloadCount)
      : ''

  return (
    <div className="products-page__card-inner" onClick={onSelect}>
      <div className="products-page__card-media">
        <img
          src={
            imageUrl(product.image)
          }
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="products-page__card-body">
        <h3 className="products-page__card-name">
          {product.name}
        </h3>

        <p className="products-page__card-text">
          {product.description}
        </p>

        <div className="products-page__card-footer">
          <span className="products-page__card-downloads">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12m0 0-5-5m5 5 5-5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>

            {downloads ? `${downloads} Downloads` : 'Downloads'}
          </span>

          <a
            className="products-page__card-link"
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : 0}
            aria-label={`Get ${product.name} app`}
            onClick={(event) => event.stopPropagation()}
          >
            Get App
          </a>
        </div>
      </div>
    </div>
  )
}

const SLIDE_MS = 800
const DWELL_MS = 3000
const SIDE_DROP_PX = 0
const SIDE_SHRINK = 0.1
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

/*
  Continuous marquee: the cards sit on one flex row that drifts left at a constant speed.
  The row holds several copies of the product list, and the scroll position wraps by exactly
  one list width, so the jump from the last card back to the first is never visible.
*/
function ProductCarousel({ products }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const metrics = useRef({ step: 0, cardW: 0, view: 0 })
  const pos = useRef(0)
  const anim = useRef(null)
  const dwell = useRef(0)
  const paused = useRef(false)
  const activeRef = useRef(0)
  const touchStartX = useRef(null)

  const total = products.length
  const looping = total > 1
  // Enough copies that the row always covers the viewport plus one full list
  const copies = looping ? 1 + Math.ceil(4 / total) : 1

  const moveTo = useCallback(
    (index) => {
      const { step, cardW, view } = metrics.current

      if (!step || !total) return

      const setW = total * step
      const wanted = (((index % total) + total) % total) * step - (view / 2 - cardW / 2)
      let delta = (((wanted - pos.current) % setW) + setW) % setW

      if (delta > setW / 2) delta -= setW

      if (reduceMotion) {
        pos.current += delta
        return
      }

      anim.current = {
        from: pos.current,
        to: pos.current + delta,
        start: performance.now(),
      }
    },
    [total, reduceMotion],
  )

  useEffect(() => {
    if (!looping) return undefined

    const measure = () => {
      const track = trackRef.current
      const first = track?.children[0]
      const second = track?.children[1]

      if (!first || !second) return

      const step = second.offsetLeft - first.offsetLeft
      const m = metrics.current

      if (m.step && step !== m.step) {
        pos.current = (pos.current / m.step) * step
      } else if (!m.step) {
        // First measurement: start with the first product in the centre
        pos.current = (((-(carouselRef.current.clientWidth - first.offsetWidth) / 2) % (total * step)) + total * step) % (total * step)
      }

      m.step = step
      m.cardW = first.offsetWidth
      m.view = carouselRef.current.clientWidth
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(carouselRef.current)

    let frame
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(now - last, 50)
      last = now

      const { step, cardW, view } = metrics.current

      if (step) {
        const setW = total * step

        if (anim.current) {
          const progress = Math.min((now - anim.current.start) / SLIDE_MS, 1)
          const { from, to } = anim.current

          pos.current = from + (to - from) * easeInOut(progress)

          if (progress === 1) {
            anim.current = null
            dwell.current = 0
          }
        } else if (!paused.current && !reduceMotion) {
          // The centre card rests, then the row slides one card to the left (the next card becomes the centre)
          dwell.current += dt

          if (dwell.current >= DWELL_MS) {
            dwell.current = 0
            moveTo(activeRef.current + 1)
          }
        }

        pos.current = ((pos.current % setW) + setW) % setW

        trackRef.current.style.transform = `translate3d(${-pos.current}px, 0, 0)`

        // The card nearest the centre is full size and raised, the others smaller and lower
        const multi = view > cardW * 1.1

        Array.from(trackRef.current.children).forEach((card, i) => {
          const away = Math.abs(i * step + cardW / 2 - pos.current - view / 2) / step
          const focus = multi ? Math.max(0, 1 - away) : 1
          const eased = focus * focus * (3 - 2 * focus)

          card.style.zIndex = Math.round(eased * 10)
          card.style.setProperty('--focus', eased.toFixed(3))
          card.style.transform = `translateY(${((1 - eased) * SIDE_DROP_PX).toFixed(2)}px) scale(${(1 - (1 - eased) * SIDE_SHRINK).toFixed(4)})`
        })

        const centred = Math.round((pos.current + view / 2 - cardW / 2) / step)
        const index = ((centred % total) + total) % total

        if (index !== activeRef.current) {
          activeRef.current = index
          setActive(index)
        }
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [looping, total, reduceMotion, moveTo])

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
    paused.current = true
  }

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const delta = event.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      moveTo(activeRef.current + (delta < 0 ? 1 : -1))
    }

    touchStartX.current = null
    paused.current = false
  }

  if (!products.length) {
    return (
      <div className="products-page__carousel">
        <div className="products-page__stage">
          <div className="products-page__card">
            <div className="products-page__card-inner">
              <div className="products-page__card-body">
                <h3 className="products-page__card-name">
                  No products available
                </h3>

                <p className="products-page__card-text">
                  Products added from the Admin Dashboard
                  will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const cards = []

  for (let copy = 0; copy < copies; copy += 1) {
    products.forEach((product, index) => {
      const clone = copy > 0

      cards.push(
        <li
          key={`${product._id || product.id || index}-${copy}`}
          className="products-page__card"
          aria-hidden={clone}
        >
          <ProductCard
            product={product}
            hidden={clone}
            onSelect={() => moveTo(index)}
          />
        </li>,
      )
    })
  }

  return (
    <div
      ref={carouselRef}
      className="products-page__carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <ul ref={trackRef} className="products-page__stage">
        {cards}
      </ul>

      <div
        className="products-page__dots"
        role="tablist"
        aria-label="Products"
      >
        {products.map((product, index) => (
          <button
            key={product._id || product.id || index}
            type="button"
            role="tab"
            className={`products-page__dot${
              index === active ? ' is-active' : ''
            }`}
            aria-label={`Show ${product.name}`}
            aria-selected={index === active}
            onClick={() => moveTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

const HERO_STATS = [
  {
    id: 'products',
    value: '5+',
    label: 'Products',
  },
  {
    id: 'downloads',
    value: '1M+',
    label: 'Downloads',
  },
  {
    id: 'rating',
    value: '4.5+',
    label: 'Average Rating',
  },
  {
    id: 'countries',
    value: '100+',
    label: 'Countries',
  },
]

const formatCompact = (value) => {
  if (value >= 1e9) return `${Math.floor(value / 1e8) / 10}B+`
  if (value >= 1e6) return `${Math.floor(value / 1e5) / 10}M+`
  if (value >= 1e3) return `${Math.floor(value / 100) / 10}K+`
  return String(value)
}

const buildHeroStats = (stats) =>
  stats
    ? [
        { id: 'products', label: 'Products', value: String(stats.products) },
        { id: 'downloads', label: 'Downloads', value: formatCompact(stats.downloads) },
        {
          id: 'rating',
          label: 'Average Rating',
          value: stats.averageRating ? stats.averageRating.toFixed(1) : '—',
        },
        { id: 'countries', label: 'Countries', value: String(stats.countries) },
      ]
    : HERO_STATS

function Products() {
  const reduceMotion = useReducedMotion()

  const [products, setProducts] = useState([])
  const [heroStats, setHeroStats] = useState(HERO_STATS)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/stats`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch stats')
        }

        setHeroStats(buildHeroStats(data.stats))
      } catch (error) {
        console.error('Failed to fetch product stats:', error)
      }
    }

    fetchStats()
  }, [])
  const [loadingProducts, setLoadingProducts] =
    useState(true)

  const [aiLabs, setAiLabs] = useState([])
  const [loadingAiLabs, setLoadingAiLabs] =
    useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true)

        const response = await fetch(
          `${API_URL}/api/products`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Failed to fetch products',
          )
        }

        setProducts(
          Array.isArray(data.products)
            ? data.products
            : [],
        )
      } catch (error) {
        console.error(
          'Failed to fetch products:',
          error,
        )

        setProducts([])
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchAiLabs = async () => {
      try {
        setLoadingAiLabs(true)

        const response = await fetch(
          `${API_URL}/api/ai-lab`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Failed to fetch AI Lab',
          )
        }

        setAiLabs(
          Array.isArray(data.aiLabs)
            ? data.aiLabs
            : [],
        )
      } catch (error) {
        console.error(
          'Failed to fetch AI Lab:',
          error,
        )

        setAiLabs([])
      } finally {
        setLoadingAiLabs(false)
      }
    }

    fetchAiLabs()
  }, [])

  const scrollToProducts = (event) => {
    const target = document.querySelector(
      '.products-page__notable',
    )

    if (!target) return

    event.preventDefault()

    const header = document.querySelector('.header')

    const headerIsFixed =
      header &&
      window.getComputedStyle(header).position ===
        'fixed'

    const headerOffset = headerIsFixed
      ? header.getBoundingClientRect().bottom
      : 0

    window.scrollTo({
      top:
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset -
        SCROLL_GAP_PX,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="products-page">
      <Header homePath="/" compactLogoLight />

      <section
        className="products-page__hero"
        aria-labelledby="products-hero-title"
      >
        <div className="products-page__container products-page__hero-inner">
          <div className="products-page__hero-copy">
            <ViewportReveal
              as="p"
              className="products-page__eyebrow"
              scale={1}
              y={HERO_RISE_PX}
              transition={heroReveal(0)}
            >
              Our Products
            </ViewportReveal>

            <ViewportReveal
              as="h1"
              id="products-hero-title"
              className="products-page__hero-title"
              scale={1}
              y={HERO_RISE_PX}
              transition={heroReveal(
                HERO_STAGGER_S,
              )}
            >
              Apps crafted by <span>Sahajanand</span> for everyday life
            </ViewportReveal>

            <ViewportReveal
              as="p"
              className="products-page__hero-text"
              scale={1}
              y={HERO_RISE_PX}
              transition={heroReveal(
                HERO_STAGGER_S * 2,
              )}
            >
              We design and build simple, reliable Android apps that help people
              stay organised, connected and productive every day.
            </ViewportReveal>

            <ViewportReveal
              className="products-page__hero-actions"
              scale={1}
              y={HERO_RISE_PX}
              transition={heroReveal(
                HERO_STAGGER_S * 3,
              )}
            >
              <a
                className="products-page__hero-cta"
                href="#products-notable-title"
                onClick={scrollToProducts}
              >
                Explore Products
              </a>
            </ViewportReveal>
          </div>

          <ul className="products-page__stats">
            {heroStats.map((stat, statIndex) => (
              <Reveal
                key={stat.id}
                as="li"
                className="products-page__stat"
                y={STAT_RISE_PX}
                scale={0.95}
                duration={0.8}
                delay={
                  statIndex * STAT_STAGGER_S
                }
              >
                <span className="products-page__stat-value">
                  {stat.value}
                </span>

                <span className="products-page__stat-label">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="products-page__notable"
        aria-labelledby="products-notable-title"
      >
        <div className="products-page__container">
          <motion.h2
            id="products-notable-title"
            className="products-page__section-title"
            {...revealProps(reduceMotion)}
          >
            Our Notable Products
          </motion.h2>

          {loadingProducts ? (
            <div className="products-page__carousel">
              <div className="products-page__stage">
                <div className="products-page__card">
                  <div className="products-page__card-inner">
                    <div className="products-page__card-body">
                      <h3 className="products-page__card-name">
                        Loading products...
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Reveal y={24} delay={0.12}>
              <ProductCarousel
                products={products}
              />
            </Reveal>
          )}
        </div>
      </section>

      <section
        className="products-page__ai"
        aria-labelledby="products-ai-title"
      >
        <div className="products-page__container products-page__ai-inner">
          <ViewportReveal
            as="h2"
            id="products-ai-title"
            className="products-page__section-title"
            scale={1}
            y={HERO_RISE_PX}
            transition={heroReveal(0)}
          >
            AI Lab
          </ViewportReveal>

          <ViewportReveal
            as="p"
            className="products-page__ai-text"
            scale={1}
            y={HERO_RISE_PX}
            transition={heroReveal(
              HERO_STAGGER_S,
            )}
          >
            Our team is exploring how artificial intelligence can make everyday apps
            smarter and more helpful. Discover our AI-powered apps built for everyday
            creativity.
          </ViewportReveal>

          {loadingAiLabs ? (
            <motion.article
              className="products-page__ai-card"
              {...aiCardProps(reduceMotion)}
            >
              <div className="products-page__ai-card-media" />

              <div className="products-page__ai-card-body">
                <h3 className="products-page__ai-card-name">
                  Loading AI Lab...
                </h3>
              </div>
            </motion.article>
          ) : aiLabs.length === 0 ? (
            <motion.article
              className="products-page__ai-card"
              {...aiCardProps(reduceMotion)}
            >
              <div className="products-page__ai-card-body">
                <h3 className="products-page__ai-card-name">
                  No AI Lab items available
                </h3>

                <p className="products-page__ai-card-text">
                  AI Lab items added from the Admin Dashboard
                  will appear here.
                </p>
              </div>
            </motion.article>
          ) : (
            aiLabs.map((item) => {
              const itemUrl =
                item.link || PLACEHOLDER_STORE_URL

              return (
                <motion.article
                  key={item._id}
                  className="products-page__ai-card"
                  {...aiCardProps(reduceMotion)}
                >
                  <div className="products-page__ai-card-media">
                    {item.image && (
                      <img
                        src={imageUrl(item.image)}
                        alt={item.title}
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="products-page__ai-card-body">
                    <motion.h3
                      className="products-page__ai-card-name"
                      variants={
                        reduceMotion
                          ? undefined
                          : aiCardTextVariants(
                              AI_CARD_TEXT_DELAY_S,
                            )
                      }
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      className="products-page__ai-card-text"
                      variants={
                        reduceMotion
                          ? undefined
                          : aiCardTextVariants(
                              AI_CARD_TEXT_DELAY_S +
                                HERO_STAGGER_S,
                            )
                      }
                    >
                      {item.description}
                    </motion.p>

                    <a
                      className="products-page__card-link products-page__ai-card-link"
                      href={itemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Get ${item.title} app`}
                    >
                      Get App
                    </a>
                  </div>
                </motion.article>
              )
            })
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Products