import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import heroImage from '../../assets/images/contact/contactus.png'
import './Contact.css'
import '../../components/ServiceTitleReveal.css'
import '../../components/BlogHeroTitleScale.css'
import { Reveal, RevealGroup } from '../../components/motion/Reveal'
import { ArticleItem } from '../../components/motion/ArticleReveal'

const API_URL = import.meta.env.VITE_API_URL ?? ''

const CONTACT_ITEMS = [
  {
    id: 'contact',
    label: 'hr@sahajanandinfotech.com',
    href: 'mailto:hr@sahajanandinfotech.com',
    icon: 'mail',
  },
  {
    id: 'touch',
    label: '+91 8140039454',
    href: 'tel:+918140039454',
    icon: 'phone',
  },
  {
    id: 'about',
    address: [
      '307, Dhara Arcade, Nr. Mahadev Chowk,',
      'Maruti Nandan Society, Mota Varachha,',
      'Surat, Gujarat 394101',
    ],
    href: '/#about',
    icon: 'location',
  },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/sahajanandinfotech',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sahajanandinfotech/?next=%2F',
    icon: 'instagram',
  },
]

const SERVICE_OPTIONS = [
  'UI/UX Design',
  'QA Tester',
  'Web Development',
  'App Development',
  'Marketing',
]

const EXPERIENCE_OPTIONS = [
  '1 year',
  '2 year',
  '3 year',
  '4 year',
  '5+ year',
]

const HERO_COPY_RISE_PX = 40
const HERO_COPY_STAGGER_S = 0.15
const heroCopyReveal = (delay) => ({ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] })

const CONTACT_CARD_SLIDE_PX = 40
const SOCIAL_ICON_RISE_PX = 40
const contactStaggerVariants = (delayChildren) => ({
  hidden: {},
  visible: { transition: { staggerChildren: HERO_COPY_STAGGER_S, delayChildren } },
})
const CONTACT_ITEM_TRANSITION = { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
const contactCardVariants = {
  hidden: { opacity: 0, x: -CONTACT_CARD_SLIDE_PX },
  visible: { opacity: 1, x: 0, transition: CONTACT_ITEM_TRANSITION },
}
const socialIconVariants = {
  hidden: { opacity: 0, y: SOCIAL_ICON_RISE_PX },
  visible: { opacity: 1, y: 0, transition: CONTACT_ITEM_TRANSITION },
}
/* The CSS transform transition would smooth (and lag) the per-frame entrance transform */
const ENTRANCE_TRANSITION_STYLE = { transition: 'background-color 0.2s ease' }
/* The hover lift uses `translate`, which composes with framer's inline entrance transform */
const SOCIAL_LINK_STYLE = { transition: 'background-color 0.2s ease, translate 0.3s ease-out' }

const FORM_SLIDE_PX = 120
const FORM_DETAIL_RISE_PX = 40
const FORM_DETAIL_STAGGER_S = 0.1
/* The card turns opaque early so its slide stays visible while its details are still hidden */
const FORM_SLIDE_TRANSITION = {
  x: CONTACT_ITEM_TRANSITION,
  opacity: { duration: 0.15, ease: 'easeOut' },
}
const formDetailsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: FORM_DETAIL_STAGGER_S, delayChildren: 0.1 } },
}
const formDetailVariants = {
  hidden: { opacity: 0, y: FORM_DETAIL_RISE_PX },
  visible: { opacity: 1, y: 0, transition: CONTACT_ITEM_TRANSITION },
}
/* Framer owns the submit button's transform, so its CSS :active press is replayed here */
const SUBMIT_PRESS = { y: 1, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }

function ContactIcon({ type }) {
  switch (type) {
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
          />
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"
          />
        </svg>
      )
    case 'location':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
          />
        </svg>
      )
    default:
      return null
  }
}

function SocialIcon({ type }) {
  switch (type) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.1 9.1H4.3V19.5h2.8V9.1zM5.7 4.5c-.9 0-1.6.7-1.6 1.6S4.8 7.7 5.7 7.7s1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM19.7 19.5h-2.8v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2H10.4V9.1h2.7v1.4h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4v6.1z"
          />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}

/* Custom dropdown: the native <select> popup can't be styled consistently across browsers */
function FormSelect({ name, label, placeholder, options }) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const listId = useId()
  const labelId = useId()

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const openMenu = () => {
    setActiveIndex(Math.max(options.indexOf(value), 0))
    setOpen(true)
  }

  const choose = (option) => {
    setValue(option)
    setOpen(false)
  }

  const handleKeyDown = (event) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault()
        openMenu()
      }
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((index) => (index + step + options.length) % options.length)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (activeIndex >= 0) choose(options[activeIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <motion.div
      className="contact-page__field contact-page__select"
      ref={rootRef}
      variants={formDetailVariants}
    >
      <span className="contact-page__sr" id={labelId}>
        {label}
      </span>
      <button
        className={`contact-page__select-trigger${open ? ' is-open' : ''}`}
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
      >
        {value || placeholder}
      </button>
      {open && (
        <ul className="contact-page__select-menu" id={listId} role="listbox" aria-labelledby={labelId}>
          {options.map((option, index) => (
            <li
              key={option}
              id={`${listId}-${index}`}
              className={`contact-page__select-option${index === activeIndex ? ' is-active' : ''}${
                option === value ? ' is-selected' : ''
              }`}
              role="option"
              aria-selected={option === value}
              onPointerEnter={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {/* Carries the form value and the browser's required-field check */}
      <input
        className="contact-page__select-value"
        name={name}
        value={value}
        required
        tabIndex={-1}
        aria-hidden="true"
        onChange={() => {}}
      />
    </motion.div>
  )
}

function Contact() {
  const reduceMotion = useReducedMotion()
  const [contactCardsDone, setContactCardsDone] = useState(false)
  const [formEntered, setFormEntered] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (!fileInputRef.current?.files?.length) {
      formData.delete('attachment')
    }

    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        body: formData,
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Unable to send your message. Please try again.')
      }

      setSubmissionStatus({
        type: 'success',
        message: result.message || 'Your message has been sent successfully.',
        previewUrl: result.previewUrl || null,
      })
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setSubmissionStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : '')
  }

  return (
    <div className="contact-page">
      <Header homePath="/" compactLogoLight />

      <section className="contact-page__hero" aria-label="Contact Us">
        <img
          className="contact-page__hero-image"
          src={heroImage}
          alt="Contact Us"
        />
        <div className="contact-page__hero-overlay" aria-hidden="true" />
        <div className="contact-page__hero-copy">
          <Reveal
            as="h1"
            className="contact-page__hero-title service-title-reveal"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(0)}
          >
            {/* The shared scale-up keyframes would run alongside the rise */}
            <span className="service-title-reveal__text" style={{ animation: 'none' }}>
              Contact Us
            </span>
          </Reveal>
          <Reveal
            as="nav"
            className="contact-page__breadcrumb"
            aria-label="Breadcrumb"
            y={HERO_COPY_RISE_PX}
            transition={heroCopyReveal(HERO_COPY_STAGGER_S)}
          >
            <a href="/">Home</a>
            <span className="contact-page__breadcrumb-dot" aria-hidden="true" />
            <span aria-current="page">Contact Us</span>
          </Reveal>
        </div>
      </section>

      <div className="contact-page__intro-wrap">
        <RevealGroup
          as="header"
          className="contact-page__intro"
          stagger={HERO_COPY_STAGGER_S}
          delayChildren={0}
        >
          <ArticleItem as="p" className="contact-page__eyebrow">
            Get in Touch With Sahajanand
          </ArticleItem>
          <ArticleItem as="h2" className="contact-page__intro-title">
            Let&apos;s turn your questions into solutions
          </ArticleItem>
          <ArticleItem as="span" className="contact-page__intro-rules" aria-hidden="true">
            <span />
            <span />
          </ArticleItem>
        </RevealGroup>
      </div>

      <section className="contact-page__panel" aria-label="Contact details and form">
        <div className="contact-page__panel-inner">
          <div className="contact-page__grid">
            <aside className="contact-page__info">
              <h3 className="contact-page__info-heading">Contact</h3>
              <motion.ul
                className="contact-page__info-list"
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contactStaggerVariants(0)}
                onAnimationComplete={(definition) => {
                  if (definition === 'visible') setContactCardsDone(true)
                }}
              >
                {CONTACT_ITEMS.map((item) => (
                  <motion.li key={item.id} variants={contactCardVariants}>
                    <a className="contact-page__info-card" href={item.href}>
                      <span className="contact-page__info-icon" aria-hidden="true">
                        <ContactIcon type={item.icon} />
                      </span>
                      <span className="contact-page__info-text">
                        {item.address ? (
                          <span className="contact-page__info-address">
                            {item.address.map((line) => (
                              <span key={line} className="contact-page__info-address-line">
                                {line}
                              </span>
                            ))}
                          </span>
                        ) : (
                          item.label
                        )}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="contact-page__social-block">
                <h3 className="contact-page__info-heading">Our Social Networks</h3>
                <motion.div
                  className="contact-page__social"
                  aria-label="Social media"
                  initial={reduceMotion ? false : 'hidden'}
                  animate={reduceMotion || contactCardsDone ? 'visible' : 'hidden'}
                  variants={contactStaggerVariants(0.1)}
                >
                  {SOCIAL_LINKS.map((item) => (
                    <motion.a
                      key={item.label}
                      className="contact-page__social-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      style={SOCIAL_LINK_STYLE}
                      variants={socialIconVariants}
                    >
                      <SocialIcon type={item.icon} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </aside>

            <motion.div
              className="contact-page__form-wrap"
              id="contact-form"
              initial={reduceMotion ? false : { opacity: 0, x: FORM_SLIDE_PX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={FORM_SLIDE_TRANSITION}
              onAnimationComplete={() => setFormEntered(true)}
            >
              <motion.form
                className="contact-page__form"
                onSubmit={handleSubmit}
                initial={reduceMotion ? false : 'hidden'}
                animate={reduceMotion || formEntered ? 'visible' : 'hidden'}
                variants={formDetailsVariants}
              >
                <motion.h2 className="contact-page__form-title" variants={formDetailVariants}>
                  Let&apos;s Get In Touch
                </motion.h2>

                <div className="contact-page__form-grid">
                  <motion.label variants={formDetailVariants} className="contact-page__field">
                    <span className="contact-page__sr">First name</span>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name *"
                      autoComplete="given-name"
                      required
                    />
                  </motion.label>
                  <motion.label variants={formDetailVariants} className="contact-page__field">
                    <span className="contact-page__sr">Last name</span>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name *"
                      autoComplete="family-name"
                      required
                    />
                  </motion.label>
                  <motion.label variants={formDetailVariants} className="contact-page__field">
                    <span className="contact-page__sr">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      autoComplete="tel"
                    />
                  </motion.label>
                  <motion.label variants={formDetailVariants} className="contact-page__field">
                    <span className="contact-page__sr">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </motion.label>
                  <FormSelect
                    name="service"
                    label="Service interest"
                    placeholder="Select Service *"
                    options={SERVICE_OPTIONS}
                  />
                  <FormSelect
                    name="experience"
                    label="Experience years"
                    placeholder="Select Experience Years *"
                    options={EXPERIENCE_OPTIONS}
                  />
                  <motion.label variants={formDetailVariants} className="contact-page__field">
                    <span className="contact-page__sr">Company</span>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company / Website"
                      autoComplete="organization"
                    />
                  </motion.label>
                  <motion.label variants={formDetailVariants} className="contact-page__field">
                    <span className="contact-page__sr">Subject</span>
                    <input type="text" name="subject" placeholder="Subject" />
                  </motion.label>
                  <motion.label variants={formDetailVariants} className="contact-page__field contact-page__field--full">
                    <span className="contact-page__sr">Message</span>
                    <textarea
                      name="message"
                      placeholder="Tell us about your project"
                      rows="5"
                      required
                    />
                  </motion.label>
                </div>

                <motion.div className="contact-page__upload" variants={formDetailVariants}>
                  <div className="contact-page__upload-head">
                    <span className="contact-page__upload-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="contact-page__upload-title">
                        Attach a document
                      </p>
                      <p className="contact-page__upload-hint">
                        Supported formats: .pdf, .doc, .docx, .png, .jpg
                      </p>
                    </div>
                  </div>
                  <div className="contact-page__upload-bar">
                    <span className="contact-page__upload-name">
                      {fileName || 'No file chosen'}
                    </span>
                    <button
                      className="contact-page__upload-btn"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </button>
                    <input
                      ref={fileInputRef}
                      className="contact-page__upload-input"
                      type="file"
                      name="attachment"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                  </div>
                </motion.div>

                <motion.button
                  className="contact-page__submit"
                  type="submit"
                  disabled={isSubmitting}
                  variants={formDetailVariants}
                  style={ENTRANCE_TRANSITION_STYLE}
                  whileTap={SUBMIT_PRESS}
                >
                  Submit
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17 17 7M9 7h8v8"
                    />
                  </svg>
                </motion.button>
                {submissionStatus && (
                  <p
                    role={submissionStatus.type === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                    style={{
                      color: submissionStatus.type === 'error' ? '#b91c1c' : '#15803d',
                    }}
                  >
                    {submissionStatus.message}
                    {submissionStatus.previewUrl && (
                      <>
                        {' '}
                        <a
                          href={submissionStatus.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Ethereal email preview
                        </a>
                      </>
                    )}
                  </p>
                )}
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Contact
