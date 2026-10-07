import { useEffect } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { BlogCard } from '../../components/sections/Blog'
import { useBlogPosts } from '../../hooks/useBlogPosts'
import heroImage from '../../assets/images/ui-xi.png'
import './BlogPage.css'
import '../../components/ServiceTitleReveal.css'

/* Simple outline icons (24 x 24, drawn with the current text colour) */
const ICONS = {
  ai: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
      <path d="M12 9.5l.9 1.6 1.6.9-1.6.9-.9 1.6-.9-1.6-1.6-.9 1.6-.9z" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M10.5 12.2 8.7 14l1.8 1.8M13.5 12.2l1.8 1.8-1.8 1.8" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  design: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M3.5 3.5l17 17M20.5 3.5l-17 17" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 17.5a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 8.7a4.4 4.4 0 0 1 .5 8.8z" />
      <path d="M9 21h6M12 17.5V21" />
    </>
  ),
  tech: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v2.5M12 18.7v2.5M2.8 12h2.5M18.7 12h2.5M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" />
      <circle cx="12" cy="12" r="6.6" />
    </>
  ),
  insights: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 21 21M8 10.5l1.8 1.8L13 8.8" />
    </>
  ),
  practices: (
    <>
      <path d="M12 3l7.5 3v5.4c0 4.4-3 8-7.5 9.6-4.5-1.6-7.5-5.2-7.5-9.6V6z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
  trends: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="M7 15.5l4-4.5 3 2.8 5.5-6.3M15.5 7.5h4v4" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg
      className="blogpage__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

const TOPICS = [
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile App Development' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'tech', label: 'Technology' },
]

const REASONS = [
  {
    number: '01',
    icon: 'insights',
    title: 'Technology Insights',
    text: 'Practical insights about modern technologies and digital solutions.',
  },
  {
    number: '02',
    icon: 'practices',
    title: 'Development Best Practices',
    text: 'Useful ideas and approaches for building better digital products.',
  },
  {
    number: '03',
    icon: 'trends',
    title: 'Business & Digital Trends',
    text: 'Understand the latest trends shaping digital businesses.',
  },
]

/* /blog: hero with breadcrumb, the same blog cards (data and card) as the Home page Blog section,
   then the Popular Topics and Why Read Our Blog sections.
   "Read More" opens each blog's page (/blog/<slug>). The blogs come from Admin → Blogs. */
function BlogPage() {
  const { posts: BLOG_POSTS } = useBlogPosts()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="blogpage">
      <Header homePath="/" compactLogoLight />

      <section className="blogpage__hero" aria-label="Blog">
        <img className="blogpage__hero-image" src={heroImage} alt="" />
        <div className="blogpage__hero-overlay" aria-hidden="true" />
        <div className="blogpage__hero-copy">
          <h1 className="blogpage__hero-title service-title-reveal service-title-reveal--grow">
            <span className="service-title-reveal__text">Blog</span>
          </h1>
          <nav className="blogpage__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="blogpage__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">Blog</span>
          </nav>
        </div>
      </section>

      <section className="blogpage__list" aria-label="Blog posts">
        <ul className="blogpage__grid">
          {BLOG_POSTS.map((post) => (
            <li key={post.id} className="blogpage__item">
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="blogpage__topics" aria-labelledby="blogpage-topics-title">
        <p className="blogpage__label">Popular Topics</p>
        <h2 className="blogpage__heading" id="blogpage-topics-title">
          Explore Our Technology Topics
        </h2>
        <p className="blogpage__intro">
          Explore insights, ideas and practical knowledge across modern technology and digital
          development.
        </p>
        <ul className="blogpage__topic-grid">
          {TOPICS.map((topic) => (
            <li key={topic.id} className="blogpage__topic">
              <Icon name={topic.id} />
              <span className="blogpage__topic-name">{topic.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="blogpage__why" aria-labelledby="blogpage-why-title">
        <div className="blogpage__why-copy">
          <p className="blogpage__label">Why Read Our Blog?</p>
          <h2 className="blogpage__why-heading" id="blogpage-why-title">
            Insights That Help Your Business Grow
          </h2>
          <p className="blogpage__why-text">
            Stay informed with practical technology insights, development best practices and
            digital trends that can help businesses make better technology decisions.
          </p>
        </div>
        <ul className="blogpage__reasons">
          {REASONS.map((reason) => (
            <li key={reason.number} className="blogpage__reason">
              <span className="blogpage__reason-number" aria-hidden="true">
                {reason.number}
              </span>
              <span className="blogpage__reason-icon">
                <Icon name={reason.icon} />
              </span>
              <div className="blogpage__reason-body">
                <h3 className="blogpage__reason-title">{reason.title}</h3>
                <p className="blogpage__reason-text">{reason.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage
