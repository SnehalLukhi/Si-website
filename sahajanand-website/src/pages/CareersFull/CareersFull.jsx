// 
import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../../components/motion/Reveal'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import photo1 from '../../assets/images/photos/image1.png'
import photo2 from '../../assets/images/photos/image2.png'
import photo3 from '../../assets/images/photos/image3.png'
import photo4 from '../../assets/images/photos/image4.png'
import photo5 from '../../assets/images/photos/image5.png'
import photo6 from '../../assets/images/photos/image6.png'
import photo7 from '../../assets/images/photos/image7.png'
import photo8 from '../../assets/images/photos/image8.png'
import './CareersFull.css'

const API_URL = 'http://localhost:5000'
const PAGE_SIZE = 8

const EXPERIENCE_FILTERS = [
  { id: '5+', label: '5+ years' },
  { id: '3-5', label: '3-5 years' },
  { id: '2-3', label: '2-3 years' },
  { id: '1-2', label: '1-2 years' },
  { id: '<1', label: '<1 year' },
]

const MARQUEE_TOP_PHOTOS = [photo1, photo2, photo3, photo4]
const MARQUEE_BOTTOM_PHOTOS = [photo5, photo6, photo7, photo8]

/* Fixed filter categories. A job belongs to the one its admin-assigned category matches
   (label or a legacy short form); categories are never derived from job titles. */
const JOB_CATEGORIES = [
  { id: 'development', label: 'Development', aliases: ['development', 'developer', 'dev'] },
  { id: 'ui-ux-design', label: 'UI/UX Design', aliases: ['uiuxdesign', 'uiux', 'design', 'uidesign', 'uxdesign'] },
  { id: 'qa-testing', label: 'QA / Testing', aliases: ['qatesting', 'qa', 'testing', 'qatester', 'tester'] },
  { id: 'digital-marketing', label: 'Digital Marketing', aliases: ['digitalmarketing', 'marketing'] },
  { id: 'ai-machine-learning', label: 'AI / Machine Learning', aliases: ['aimachinelearning', 'aiml', 'ai', 'machinelearning', 'ml'] },
]

function getJobCategoryId(value = '') {
  const key = String(value).toLowerCase().replace(/[^a-z0-9]/g, '')

  return JOB_CATEGORIES.find((item) => item.aliases.includes(key))?.id || null
}

function getExperienceRange(experience = '') {
  const value = experience.toLowerCase().trim()

  const numbers = value.match(/\d+(?:\.\d+)?/g)?.map(Number) || []

  if (value.includes('5+') && numbers.length) {
    return [numbers[0], 99]
  }

  if (numbers.length >= 2) {
    return [numbers[0], numbers[1]]
  }

  if (numbers.length === 1) {
    return [numbers[0], numbers[0]]
  }

  if (value.includes('fresher') || value.includes('<1')) {
    return [0, 0.9]
  }

  return [0, 99]
}

function matchesExperience(job, filterId) {
  if (!filterId) return true

  const [min, max] = getExperienceRange(job.experience)

  switch (filterId) {
    case '5+':
      return max >= 5

    case '3-5':
      return min <= 5 && max >= 3

    case '2-3':
      return min <= 3 && max >= 2

    case '1-2':
      return min <= 2 && max >= 1

    case '<1':
      return min < 1

    default:
      return true
  }
}

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
      />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v3H2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm0 4h4V4h-4v2zm12 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5h8v1h4v-1h8z"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
    </svg>
  )
}

function FilterOption({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`careers-full__filter-option${
        selected ? ' is-selected' : ''
      }`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="careers-full__radio" aria-hidden="true" />
      <span className="careers-full__filter-label">{label}</span>
    </button>
  )
}

function MarqueeRow({ direction, photos }) {
  return (
    <div
      className={`careers-full__marquee-row careers-full__marquee-row--${direction}`}
    >
      <div className="careers-full__marquee-track">
        {[0, 1].map((copy) => (
          <div
            className="careers-full__marquee-group"
            key={`${direction}-${copy}`}
          >
            {photos.map((src, index) => (
              <div
                className="careers-full__marquee-item"
                key={`${direction}-${copy}-${index}`}
              >
                <img
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function JobCard({ job }) {
  return (
    <article className="careers-full__job-card">
      {job.hot ? (
        <span className="careers-full__job-hot">HOT</span>
      ) : null}

      <h3 className="careers-full__job-name">{job.title}</h3>

      <div className="careers-full__job-meta-list">
        <div className="careers-full__job-meta-row">
          <span className="careers-full__job-icon">
            <CapIcon />
          </span>

          <span className="careers-full__job-meta-inline">
            {job.category || 'Professional'}
          </span>
        </div>

        <div className="careers-full__job-meta-block">
          <div className="careers-full__job-meta-row">
            <span className="careers-full__job-icon">
              <BriefcaseIcon />
            </span>

            <span className="careers-full__job-meta-label">
              Experience:
            </span>
          </div>

          <p className="careers-full__job-meta-value">
            {job.experience || 'Not specified'}
          </p>
        </div>

        <div className="careers-full__job-meta-block">
          <div className="careers-full__job-meta-row">
            <span className="careers-full__job-icon">
              <ClockIcon />
            </span>

            <span className="careers-full__job-meta-label">
              Job Type
            </span>
          </div>

          <p className="careers-full__job-meta-value">
            {job.type || 'Full Time'}
          </p>
        </div>
      </div>

      <a
        className="careers-full__job-btn"
        href={`/careers/job/${job._id}`}
        onClick={(event) => {
          event.preventDefault()
          window.location.assign(`/careers/job/${job._id}`)
        }}
      >
        View Job <span aria-hidden="true">&gt;</span>
      </a>
    </article>
  )
}

function CareersFull() {
  const reduceMotion = useReducedMotion()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const [category, setCategory] = useState(null)
  const [experience, setExperience] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setLoadError(false)

        const response = await fetch(`${API_URL}/api/jobs`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Failed to fetch jobs',
          )
        }

        setJobs(data.jobs || [])
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        setLoadError(true)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    setPage(0)
  }, [category, experience, searchQuery])

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return jobs.filter((job) => {
      if (
        category &&
        getJobCategoryId(job.category) !== category
      ) {
        return false
      }

      if (!matchesExperience(job, experience)) {
        return false
      }

      if (
        q &&
        !String(job.title || '')
          .toLowerCase()
          .includes(q)
      ) {
        return false
      }

      return true
    })
  }, [jobs, category, experience, searchQuery])

  const pageCount = Math.max(
    1,
    Math.ceil(filteredJobs.length / PAGE_SIZE),
  )

  const visibleJobs = filteredJobs.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  )

  const toggleCategory = (id) => {
    setCategory((prev) => (prev === id ? null : id))
  }

  const toggleExperience = (id) => {
    setExperience((prev) => (prev === id ? null : id))
  }

  const runSearch = (event) => {
    event?.preventDefault()
    setSearchQuery(searchInput)
  }

  return (
    <div className="careers-full">
      <Header homePath="/" />

      <main className="careers-full__main">
        <div className="careers-full__layout">
          <Reveal
            as="aside"
            className="careers-full__sidebar"
            aria-label="Job filters"
            x={-28}
            y={12}
          >
            <section className="careers-full__filter-box">
              <h3 className="careers-full__filter-title">
                Job Category
              </h3>

              <div className="careers-full__filter-list">
                {JOB_CATEGORIES.map((item) => (
                  <FilterOption
                    key={item.id}
                    label={item.label}
                    selected={category === item.id}
                    onSelect={() => toggleCategory(item.id)}
                  />
                ))}
              </div>
            </section>

            <section className="careers-full__filter-box">
              <h3 className="careers-full__filter-title">
                Experience
              </h3>

              <div className="careers-full__filter-list">
                {EXPERIENCE_FILTERS.map((item) => (
                  <FilterOption
                    key={item.id}
                    label={item.label}
                    selected={experience === item.id}
                    onSelect={() => toggleExperience(item.id)}
                  />
                ))}
              </div>
            </section>

            <div className="careers-full__cv">
              <p className="careers-full__cv-text">
                Don&apos;t see your dream job now? Leave your CV here
                for future opening.
              </p>

              <a
                className="careers-full__apply-btn"
                href="/contact-us"
              >
                Apply Now
              </a>
            </div>
          </Reveal>

          <Reveal
            as="section"
            className="careers-full__content"
            aria-label="Job listings"
            y={24}
            delay={0.1}
          >
            <div className="careers-full__listings">
              <form
                className="careers-full__search-row"
                onSubmit={runSearch}
              >
                <div className="careers-full__search-field">
                  <span
                    className="careers-full__search-icon"
                    aria-hidden="true"
                  >
                    <SearchIcon />
                  </span>

                  <input
                    type="search"
                    className="careers-full__search-input"
                    placeholder="Search here..."
                    value={searchInput}
                    onChange={(e) =>
                      setSearchInput(e.target.value)
                    }
                    aria-label="Search jobs"
                  />
                </div>

                <button
                  type="submit"
                  className="careers-full__find-btn"
                >
                  Find Job
                </button>
              </form>

              {loading ? (
                <p className="careers-full__empty">
                  Loading jobs...
                </p>
              ) : loadError ? (
                <p className="careers-full__empty">
                  Unable to load jobs. Please try again later.
                </p>
              ) : visibleJobs.length > 0 ? (
                <div className="careers-full__job-grid">
                  {visibleJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <p className="careers-full__empty">
                  No jobs match your filters.
                </p>
              )}
            </div>

            {!loading &&
              !loadError &&
              filteredJobs.length > 0 && (
                <div
                  className="careers-full__pagination"
                  role="navigation"
                  aria-label="Job pages"
                >
                  <button
                    type="button"
                    className="careers-full__page-arrow"
                    aria-label="Previous page"
                    disabled={page <= 0}
                    onClick={() =>
                      setPage((p) => Math.max(0, p - 1))
                    }
                  >
                    ‹
                  </button>

                  {Array.from({ length: pageCount }).map(
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`careers-full__page-num${
                          index === page ? ' is-active' : ''
                        }`}
                        aria-label={`Page ${index + 1}`}
                        aria-current={
                          index === page ? 'page' : undefined
                        }
                        onClick={() => setPage(index)}
                      >
                        {index + 1}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    className="careers-full__page-arrow"
                    aria-label="Next page"
                    disabled={page >= pageCount - 1}
                    onClick={() =>
                      setPage((p) =>
                        Math.min(pageCount - 1, p + 1),
                      )
                    }
                  >
                    ›
                  </button>
                </div>
              )}
          </Reveal>
        </div>
      </main>

      <section
        className="careers-full__marquee"
        aria-labelledby="careers-full-marquee-title"
      >
        <motion.h2
          id="careers-full-marquee-title"
          className="careers-full__marquee-title"
          initial={
            reduceMotion ? false : { opacity: 0, y: 24 }
          }
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{
            once: true,
            amount: 0.6,
            margin: '0px 0px -12% 0px',
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          A Little Corner of Sahajanand
        </motion.h2>

        <MarqueeRow
          direction="rtl"
          photos={MARQUEE_TOP_PHOTOS}
        />

        <MarqueeRow
          direction="ltr"
          photos={MARQUEE_BOTTOM_PHOTOS}
        />
      </section>

      <Footer />
    </div>
  )
}

export default CareersFull