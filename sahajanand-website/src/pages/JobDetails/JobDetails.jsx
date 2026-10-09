// import { useEffect, useId, useRef, useState } from 'react'
// import Header from '../../components/layout/Header'
// import Footer from '../../components/layout/Footer'
// import { getJobById, getRelatedJobs } from '../../data/careersJobs'
// import { Reveal, RevealGroup } from '../../components/motion/Reveal'
// import { ArticleItem, ArticleSection } from '../../components/motion/ArticleReveal'
// import './JobDetails.css'

// const APPLY_EMAIL = 'hr@sahajanandinfotech.com'
// const APPLY_PHONE = '+91 00000 00000'
// const OFFICE_ADDRESS =
//   'Sahajanand Infotech — Contact us for office details and interview scheduling.'

// const APPLY_PANEL_SLIDE_PX = 40
// const RELATED_CARD_STAGGER_S = 0.15

// const PHONE_COUNTRIES = [
//   { code: '+91', flag: '🇮🇳', label: 'India' },
//   { code: '+84', flag: '🇻🇳', label: 'Vietnam' },
//   { code: '+1', flag: '🇺🇸', label: 'United States' },
//   { code: '+44', flag: '🇬🇧', label: 'United Kingdom' },
// ]

// const EMPTY_APPLY_FORM = {
//   name: '',
//   email: '',
//   phone: '',
//   countryCode: '+91',
//   coverLetter: '',
//   cv: null,
// }

// function CapIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
//       />
//     </svg>
//   )
// }

// function BriefcaseIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v3H2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm0 4h4V4h-4v2zm12 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5h8v1h4v-1h8z"
//       />
//     </svg>
//   )
// }

// function ClockIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
//       />
//     </svg>
//   )
// }

// function MailIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
//       />
//     </svg>
//   )
// }

// function PhoneIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"
//       />
//     </svg>
//   )
// }

// function PinIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
//       />
//     </svg>
//   )
// }

// function ExternalIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
//       />
//     </svg>
//   )
// }

// function FolderIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path fill="#F5C542" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
//       <path fill="#E8A317" d="M20 8H4v10h16V8z" />
//     </svg>
//   )
// }

// function CloseIcon() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         fill="currentColor"
//         d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.42 6.29 6.29-6.3 6.3 1.42 1.4 6.29-6.29 6.3 6.3 1.4-1.42-6.29-6.29 6.3-6.3z"
//       />
//     </svg>
//   )
// }

// function validateApplyForm(form) {
//   const errors = {}
//   if (!form.name.trim()) errors.name = 'Name is required'
//   if (!form.email.trim()) errors.email = 'Email is required'
//   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
//     errors.email = 'Please enter a valid email'
//   }
//   if (!form.phone.trim()) errors.phone = 'Phone number is required'
//   if (!form.cv) errors.cv = 'Please upload your CV'
//   return errors
// }

// function ApplyModal({ job, open, onClose }) {
//   const titleId = useId()
//   const fileInputRef = useRef(null)
//   const [form, setForm] = useState(EMPTY_APPLY_FORM)
//   const [errors, setErrors] = useState({})
//   const [submitted, setSubmitted] = useState(false)

//   useEffect(() => {
//     if (!open) return undefined
//     setForm(EMPTY_APPLY_FORM)
//     setErrors({})
//     setSubmitted(false)
//   }, [open])

//   useEffect(() => {
//     if (!open) return undefined
//     const previousOverflow = document.body.style.overflow
//     document.body.style.overflow = 'hidden'
//     const onKeyDown = (event) => {
//       if (event.key === 'Escape') onClose()
//     }
//     window.addEventListener('keydown', onKeyDown)
//     return () => {
//       document.body.style.overflow = previousOverflow
//       window.removeEventListener('keydown', onKeyDown)
//     }
//   }, [open, onClose])

//   if (!open) return null

//   const selectedCountry =
//     PHONE_COUNTRIES.find((item) => item.code === form.countryCode) ||
//     PHONE_COUNTRIES[0]

//   const updateField = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors((prev) => {
//         const next = { ...prev }
//         delete next[field]
//         return next
//       })
//     }
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     const nextErrors = validateApplyForm(form)
//     setErrors(nextErrors)
//     if (Object.keys(nextErrors).length > 0) return
//     setSubmitted(true)
//   }

//   return (
//     <div className="job-apply-modal" role="presentation">
//       <button
//         type="button"
//         className="job-apply-modal__backdrop"
//         aria-label="Close apply form"
//         onClick={onClose}
//       />
//       <div
//         className="job-apply-modal__dialog"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby={titleId}
//       >
//         <button
//           type="button"
//           className="job-apply-modal__close"
//           aria-label="Close"
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </button>

//         <h2 id={titleId} className="job-apply-modal__title">
//           CV here for{' '}
//           <span className="job-apply-modal__title-job">
//             {job.title} ({job.level})
//           </span>
//         </h2>

//         {submitted ? (
//           <div className="job-apply-modal__success">
//             <p>Thank you! Your application has been received.</p>
//             <button
//               type="button"
//               className="job-apply-modal__submit"
//               onClick={onClose}
//             >
//               Close
//             </button>
//           </div>
//         ) : (
//           <form className="job-apply-modal__form" onSubmit={handleSubmit} noValidate>
//             <div className="job-apply-modal__field">
//               <input
//                 className={`job-apply-modal__input${errors.name ? ' is-invalid' : ''}`}
//                 type="text"
//                 name="name"
//                 placeholder="Enter your Name"
//                 value={form.name}
//                 onChange={(event) => updateField('name', event.target.value)}
//                 autoComplete="name"
//               />
//               {errors.name ? (
//                 <p className="job-apply-modal__error">{errors.name}</p>
//               ) : null}
//             </div>

//             <div className="job-apply-modal__field">
//               <input
//                 className={`job-apply-modal__input${errors.email ? ' is-invalid' : ''}`}
//                 type="email"
//                 name="email"
//                 placeholder="Enter your Email"
//                 value={form.email}
//                 onChange={(event) => updateField('email', event.target.value)}
//                 autoComplete="email"
//               />
//               {errors.email ? (
//                 <p className="job-apply-modal__error">{errors.email}</p>
//               ) : null}
//             </div>

//             <div className="job-apply-modal__field">
//               <div
//                 className={`job-apply-modal__phone${errors.phone ? ' is-invalid' : ''}`}
//               >
//                 <label className="job-apply-modal__country" aria-label="Country code">
//                   <span className="job-apply-modal__flag" aria-hidden="true">
//                     {selectedCountry.flag}
//                   </span>
//                   <select
//                     className="job-apply-modal__country-select"
//                     value={form.countryCode}
//                     onChange={(event) => updateField('countryCode', event.target.value)}
//                   >
//                     {PHONE_COUNTRIES.map((country) => (
//                       <option key={country.code} value={country.code}>
//                         {country.flag} {country.code}
//                       </option>
//                     ))}
//                   </select>
//                   <span className="job-apply-modal__dial">{form.countryCode}</span>
//                 </label>
//                 <input
//                   className="job-apply-modal__phone-input"
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone number"
//                   value={form.phone}
//                   onChange={(event) => updateField('phone', event.target.value)}
//                   autoComplete="tel-national"
//                 />
//               </div>
//               {errors.phone ? (
//                 <p className="job-apply-modal__error">{errors.phone}</p>
//               ) : null}
//             </div>

//             <div className="job-apply-modal__field">
//               <textarea
//                 className="job-apply-modal__textarea"
//                 name="coverLetter"
//                 placeholder="Enter Cover Letter"
//                 rows={5}
//                 value={form.coverLetter}
//                 onChange={(event) => updateField('coverLetter', event.target.value)}
//               />
//             </div>

//             <div className="job-apply-modal__field">
//               <button
//                 type="button"
//                 className={`job-apply-modal__upload${errors.cv ? ' is-invalid' : ''}`}
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <span className="job-apply-modal__upload-icon" aria-hidden="true">
//                   <FolderIcon />
//                 </span>
//                 <span>
//                   {form.cv ? form.cv.name : 'Upload your CV here'}
//                 </span>
//               </button>
//               <input
//                 ref={fileInputRef}
//                 className="job-apply-modal__file"
//                 type="file"
//                 accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
//                 onChange={(event) => {
//                   const file = event.target.files?.[0] || null
//                   updateField('cv', file)
//                 }}
//               />
//               {errors.cv ? (
//                 <p className="job-apply-modal__error">{errors.cv}</p>
//               ) : null}
//             </div>

//             <button type="submit" className="job-apply-modal__submit">
//               Submit
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   )
// }

// function RelatedJobCard({ job }) {
//   return (
//     <ArticleItem as="article" className="job-details__related-card">
//       {job.hot ? <span className="job-details__related-hot">HOT</span> : null}
//       <h3 className="job-details__related-title">{job.title}</h3>
//       <div className="job-details__related-meta">
//         <div className="job-details__related-row">
//           <span className="job-details__related-icon">
//             <CapIcon />
//           </span>
//           <span>{job.level}</span>
//         </div>
//         <div className="job-details__related-block">
//           <div className="job-details__related-row">
//             <span className="job-details__related-icon">
//               <BriefcaseIcon />
//             </span>
//             <span>{job.detailLabel}:</span>
//           </div>
//           <p>{job.detailValue}</p>
//         </div>
//         <div className="job-details__related-block">
//           <div className="job-details__related-row">
//             <span className="job-details__related-icon">
//               <ClockIcon />
//             </span>
//             <span>{job.metaLabel}</span>
//           </div>
//           <p>{job.metaValue}</p>
//         </div>
//       </div>
//       <a className="job-details__related-btn" href={`/careers/job/${job.id}`}>
//         View Job <span aria-hidden="true">&gt;</span>
//       </a>
//     </ArticleItem>
//   )
// }

// function JobDetails({ jobId }) {
//   const job = getJobById(jobId)
//   const relatedJobs = getRelatedJobs(jobId)
//   const [applyOpen, setApplyOpen] = useState(false)

//   useEffect(() => {
//     window.scrollTo(0, 0)
//     setApplyOpen(false)
//   }, [jobId])

//   if (!job) {
//     return (
//       <div className="job-details">
//         <Header homePath="/" />
//         <main className="job-details__main">
//           <Reveal as="h1" className="job-details__title" y={20}>
//             Job not found
//           </Reveal>
//           <Reveal as="p" className="job-details__empty" y={16} delay={0.08}>
//             This position is unavailable or the link is incorrect.
//           </Reveal>
//           <a className="job-details__apply-btn" href="/careers/full">
//             Back to Careers
//           </a>
//         </main>
//         <Footer />
//       </div>
//     )
//   }

//   const shareUrl =
//     typeof window !== 'undefined'
//       ? window.location.href
//       : `https://sahajanandinfotech.com/careers/job/${job.id}`

//   return (
//     <div className="job-details">
//       <Header homePath="/" />

//       <main className="job-details__main">
//         <Reveal as="h1" className="job-details__title" y={22}>
//           {job.title}
//         </Reveal>

//         <Reveal className="job-details__meta" y={18} delay={0.08}>
//           <div className="job-details__meta-item">
//             <span className="job-details__meta-label">Level:</span>
//             <span className="job-details__meta-value">{job.level}</span>
//           </div>
//           <div className="job-details__meta-item">
//             <span className="job-details__meta-label">Salary:</span>
//             <span className="job-details__meta-value">{job.salary}</span>
//           </div>
//           <div className="job-details__meta-item">
//             <span className="job-details__meta-label">Expiration Date:</span>
//             <span className="job-details__meta-value">{job.expirationDate}</span>
//           </div>
//         </Reveal>

//         <hr className="job-details__divider" />

//         <div className="job-details__layout">
//           <div className="job-details__content">
//             {job.sections.map((section) => (
//               <ArticleSection
//                 key={section.title}
//                 className="job-details__section"
//                 aria-label={section.title}
//               >
//                 <ArticleItem as="h2" className="job-details__section-title">
//                   {section.title}
//                 </ArticleItem>
//                 <ul className="job-details__list">
//                   {section.items.map((item) => (
//                     <ArticleItem as="li" key={item}>
//                       {item}
//                     </ArticleItem>
//                   ))}
//                 </ul>
//               </ArticleSection>
//             ))}

//             <ArticleSection className="job-details__apply" aria-labelledby="job-apply-title">
//               <ArticleItem as="h2" id="job-apply-title" className="job-details__apply-title">
//                 Application process
//               </ArticleItem>

//               <ul className="job-details__contact-list">
//                 <ArticleItem as="li">
//                   <span className="job-details__contact-icon" aria-hidden="true">
//                     <MailIcon />
//                   </span>
//                   <span>
//                     Send your CV to our email:{' '}
//                     <a href={`mailto:${APPLY_EMAIL}`}>{APPLY_EMAIL}</a>
//                   </span>
//                 </ArticleItem>
//                 <ArticleItem as="li">
//                   <span className="job-details__contact-icon" aria-hidden="true">
//                     <PhoneIcon />
//                   </span>
//                   <span>
//                     Hotline:{' '}
//                     <a href={`tel:${APPLY_PHONE.replace(/\s/g, '')}`}>{APPLY_PHONE}</a>
//                     {' | '}HR Department
//                   </span>
//                 </ArticleItem>
//                 <ArticleItem as="li">
//                   <span className="job-details__contact-icon" aria-hidden="true">
//                     <PinIcon />
//                   </span>
//                   <span>
//                     Head Office:{' '}
//                     <span className="job-details__contact-accent">{OFFICE_ADDRESS}</span>
//                   </span>
//                 </ArticleItem>
//               </ul>
//             </ArticleSection>
//           </div>

//           <Reveal
//             as="aside"
//             className="job-details__actions"
//             x={APPLY_PANEL_SLIDE_PX}
//             y={0}
//             transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
//             aria-label="Apply and share"
//           >
//             <button
//               type="button"
//               className="job-details__apply-btn"
//               onClick={() => setApplyOpen(true)}
//             >
//               Apply Now
//               <span className="job-details__apply-icon" aria-hidden="true">
//                 <ExternalIcon />
//               </span>
//             </button>

//             <div className="job-details__share">
//               <span className="job-details__share-label">Share:</span>
//               <a
//                 className="job-details__share-link"
//                 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 aria-label="Share on Facebook"
//               >
//                 f
//               </a>
//               <a
//                 className="job-details__share-link"
//                 href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 aria-label="Share on LinkedIn"
//               >
//                 in
//               </a>
//               <button
//                 type="button"
//                 className="job-details__share-link"
//                 aria-label="Copy job link"
//                 onClick={() => {
//                   if (navigator.clipboard?.writeText) {
//                     navigator.clipboard.writeText(shareUrl)
//                   }
//                 }}
//               >
//                 ↗
//               </button>
//             </div>
//           </Reveal>
//         </div>

//         <section className="job-details__related" aria-labelledby="job-related-title">
//           <Reveal as="h2" id="job-related-title" className="job-details__related-heading" y={24}>
//             Related Jobs
//           </Reveal>
//           <RevealGroup
//             className="job-details__related-grid"
//             stagger={RELATED_CARD_STAGGER_S}
//             delayChildren={0}
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             {relatedJobs.map((related) => (
//               <RelatedJobCard key={related.id} job={related} />
//             ))}
//           </RevealGroup>
//         </section>
//       </main>

//       <Footer />

//       <ApplyModal
//         job={job}
//         open={applyOpen}
//         onClose={() => setApplyOpen(false)}
//       />

//     </div>
//   )
// }

// export default JobDetails


import { useEffect, useId, useRef, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Reveal, RevealGroup } from '../../components/motion/Reveal'
import { ArticleItem, ArticleSection } from '../../components/motion/ArticleReveal'
import './JobDetails.css'

const API_URL = import.meta.env.VITE_API_URL ?? ''

const APPLY_EMAIL = 'hr@sahajanandinfotech.com'
const APPLY_PHONE = '+91 8140039454'
const OFFICE_ADDRESS =
  '307, Dhara Arcade, Nr. Mahadev Chowk, Maruti Nandan Society, Mota Varachha, Surat'

const APPLY_PANEL_SLIDE_PX = 40
const RELATED_CARD_STAGGER_S = 0.15

const PHONE_COUNTRIES = [
  { code: '+91', iso: 'in', label: 'India' },
  { code: '+1', iso: 'us', label: 'United States' },
  { code: '+44', iso: 'gb', label: 'United Kingdom' },
  { code: '+61', iso: 'au', label: 'Australia' },
  { code: '+971', iso: 'ae', label: 'United Arab Emirates' },
  { code: '+966', iso: 'sa', label: 'Saudi Arabia' },
  { code: '+65', iso: 'sg', label: 'Singapore' },
  { code: '+60', iso: 'my', label: 'Malaysia' },
  { code: '+84', iso: 'vn', label: 'Vietnam' },
  { code: '+86', iso: 'cn', label: 'China' },
  { code: '+81', iso: 'jp', label: 'Japan' },
  { code: '+82', iso: 'kr', label: 'South Korea' },
  { code: '+49', iso: 'de', label: 'Germany' },
  { code: '+33', iso: 'fr', label: 'France' },
  { code: '+39', iso: 'it', label: 'Italy' },
  { code: '+34', iso: 'es', label: 'Spain' },
  { code: '+31', iso: 'nl', label: 'Netherlands' },
  { code: '+41', iso: 'ch', label: 'Switzerland' },
  { code: '+46', iso: 'se', label: 'Sweden' },
  { code: '+7', iso: 'ru', label: 'Russia' },
  { code: '+90', iso: 'tr', label: 'Turkey' },
  { code: '+20', iso: 'eg', label: 'Egypt' },
  { code: '+27', iso: 'za', label: 'South Africa' },
  { code: '+234', iso: 'ng', label: 'Nigeria' },
  { code: '+254', iso: 'ke', label: 'Kenya' },
  { code: '+55', iso: 'br', label: 'Brazil' },
  { code: '+52', iso: 'mx', label: 'Mexico' },
  { code: '+64', iso: 'nz', label: 'New Zealand' },
  { code: '+92', iso: 'pk', label: 'Pakistan' },
  { code: '+880', iso: 'bd', label: 'Bangladesh' },
  { code: '+94', iso: 'lk', label: 'Sri Lanka' },
  { code: '+977', iso: 'np', label: 'Nepal' },
  { code: '+63', iso: 'ph', label: 'Philippines' },
  { code: '+62', iso: 'id', label: 'Indonesia' },
  { code: '+66', iso: 'th', label: 'Thailand' },
]

/* Country choices for the "Country" field: every country name, in English */
const COUNTRY_CODES =
  'AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI KH CM CA CV CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG MK NO OM PK PW PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW'.split(' ')

const COUNTRY_NAMES = (() => {
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' })

    return COUNTRY_CODES.map((code) => names.of(code)).sort((a, b) => a.localeCompare(b))
  } catch {
    return PHONE_COUNTRIES.map((item) => item.label).sort()
  }
})()

const EMPTY_APPLY_FORM = {
  name: '',
  company: '',
  country: '',
  email: '',
  countryCode: '+91',
  phone: '',
  portfolio: '',
  message: '',
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.1 9.1H4.3V19.5h2.8V9.1zM5.7 4.5c-.9 0-1.6.7-1.6 1.6S4.8 7.7 5.7 7.7s1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM19.7 19.5h-2.8v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2H10.4V9.1h2.7v1.4h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4v6.1z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
    </svg>
  )
}

// Company social pages shown in the Share section of every job detail page
const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sahajanandinfotech/?viewAsMember=true',
    icon: <LinkedInIcon />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sahajanandinfotech/?next=%2F',
    icon: <InstagramIcon />,
  },
]

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.42 6.29 6.29-6.3 6.3 1.42 1.4 6.29-6.29 6.3 6.3 1.4-1.42-6.29-6.29 6.3-6.3z"
      />
    </svg>
  )
}

function validateApplyForm(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
  }

  if (!form.company.trim()) {
    errors.company = 'Company name is required'
  }

  if (!form.country) {
    errors.country = 'Please select your country'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
  }

  return errors
}

function ApplyModal({ job, open, onClose }) {
  const titleId = useId()

  const [form, setForm] = useState(EMPTY_APPLY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const submittingRef = useRef(false)

  useEffect(() => {
    if (!open) return undefined

    setForm(EMPTY_APPLY_FORM)
    setErrors({})
    setSubmitted(false)
    setSubmitting(false)
    setSubmitError('')
    submittingRef.current = false
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const selectedCountry =
    PHONE_COUNTRIES.find((item) => item.code === form.countryCode) ||
    PHONE_COUNTRIES[0]

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // ignore repeat clicks while a submission is already in flight
    if (submittingRef.current) return

    const nextErrors = validateApplyForm(form)

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    submittingRef.current = true
    setSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        jobId: job._id,
        name: form.name.trim(),
        company: form.company.trim(),
        country: form.country,
        email: form.email.trim(),
        countryCode: form.countryCode,
        phone: form.phone.trim(),
        portfolio: form.portfolio.trim(),
        message: form.message.trim(),
      }

      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        setSubmitError(
          result?.message ||
            'Unable to send your application. Please try again.',
        )
        return
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Job application failed:', error)

      setSubmitError('Unable to send your application. Please try again.')
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  return (
    <div className="job-apply-modal" role="presentation">
      <button
        type="button"
        className="job-apply-modal__backdrop"
        aria-label="Close apply form"
        onClick={onClose}
      />

      <div
        className="job-apply-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="job-apply-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <h2 id={titleId} className="job-apply-modal__title">
          CV here for{' '}
          <span className="job-apply-modal__title-job">
            {job.title} ({job.level})
          </span>
        </h2>

        {submitted ? (
          <div className="job-apply-modal__success">
            <p>Thank you! Your application has been received.</p>

            <button
              type="button"
              className="job-apply-modal__submit"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="job-apply-modal__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="job-apply-modal__row">
              <div className="job-apply-modal__field">
                <input
                  className={`job-apply-modal__input${errors.name ? ' is-invalid' : ''}`}
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  autoComplete="name"
                />

                {errors.name ? <p className="job-apply-modal__error">{errors.name}</p> : null}
              </div>

              <div className="job-apply-modal__field">
                <input
                  className={`job-apply-modal__input${errors.company ? ' is-invalid' : ''}`}
                  type="text"
                  name="company"
                  placeholder="Company Name *"
                  value={form.company}
                  onChange={(event) => updateField('company', event.target.value)}
                  autoComplete="organization"
                />

                {errors.company ? <p className="job-apply-modal__error">{errors.company}</p> : null}
              </div>
            </div>

            <div className="job-apply-modal__row">
              <div className="job-apply-modal__field">
                <select
                  className={`job-apply-modal__input job-apply-modal__select${
                    form.country ? '' : ' is-empty'
                  }${errors.country ? ' is-invalid' : ''}`}
                  name="country"
                  aria-label="Country"
                  value={form.country}
                  onChange={(event) => updateField('country', event.target.value)}
                  autoComplete="country-name"
                >
                  <option value="">Country *</option>
                  {COUNTRY_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                {errors.country ? <p className="job-apply-modal__error">{errors.country}</p> : null}
              </div>

              <div className="job-apply-modal__field">
                <input
                  className={`job-apply-modal__input${errors.email ? ' is-invalid' : ''}`}
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  autoComplete="email"
                />

                {errors.email ? <p className="job-apply-modal__error">{errors.email}</p> : null}
              </div>
            </div>

            <div className="job-apply-modal__field">
              <div className={`job-apply-modal__phone${errors.phone ? ' is-invalid' : ''}`}>
                <label className="job-apply-modal__country" aria-label="Country calling code">
                  <img
                    className="job-apply-modal__flag"
                    src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                    alt=""
                    width="20"
                    height="15"
                  />

                  <select
                    className="job-apply-modal__country-select"
                    value={form.countryCode}
                    onChange={(event) => updateField('countryCode', event.target.value)}
                  >
                    {PHONE_COUNTRIES.map((country) => (
                      <option key={country.label} value={country.code}>
                        {country.label} ({country.code})
                      </option>
                    ))}
                  </select>

                  <span className="job-apply-modal__dial">{form.countryCode}</span>
                </label>

                <input
                  className="job-apply-modal__phone-input"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  autoComplete="tel-national"
                />
              </div>

              {errors.phone ? <p className="job-apply-modal__error">{errors.phone}</p> : null}
            </div>

            <div className="job-apply-modal__field">
              <input
                className="job-apply-modal__input"
                type="text"
                name="portfolio"
                placeholder="Portfolio / Store Link"
                value={form.portfolio}
                onChange={(event) => updateField('portfolio', event.target.value)}
                autoComplete="url"
              />
            </div>

            <div className="job-apply-modal__field">
              <textarea
                className="job-apply-modal__textarea"
                name="message"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
              />
            </div>

            {submitError ? (
              <p className="job-apply-modal__error" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              className="job-apply-modal__submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function RelatedJobCard({ job }) {
  return (
    <ArticleItem
      as="article"
      className="job-details__related-card"
    >
      {job.hot ? (
        <span className="job-details__related-hot">HOT</span>
      ) : null}

      <h3 className="job-details__related-title">
        {job.title}
      </h3>

      <div className="job-details__related-meta">
        <div className="job-details__related-row">
          <span className="job-details__related-icon">
            <CapIcon />
          </span>

          <span>{job.level}</span>
        </div>

        <div className="job-details__related-block">
          <div className="job-details__related-row">
            <span className="job-details__related-icon">
              <BriefcaseIcon />
            </span>

            <span>{job.detailLabel}:</span>
          </div>

          <p>{job.detailValue}</p>
        </div>

        <div className="job-details__related-block">
          <div className="job-details__related-row">
            <span className="job-details__related-icon">
              <ClockIcon />
            </span>

            <span>{job.metaLabel}</span>
          </div>

          <p>{job.metaValue}</p>
        </div>
      </div>

      <a
        className="job-details__related-btn"
        href={`/careers/job/${job._id}`}
      >
        View Job <span aria-hidden="true">&gt;</span>
      </a>
    </ArticleItem>
  )
}

function JobDetails({ jobId }) {
  const [job, setJob] = useState(null)
  const [relatedJobs, setRelatedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [applyOpen, setApplyOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setApplyOpen(false)

    let cancelled = false

    const fetchJob = async () => {
      try {
        setLoading(true)

        const response = await fetch(`${API_URL}/api/jobs`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Failed to fetch jobs',
          )
        }

        const jobs = Array.isArray(data.jobs)
          ? data.jobs
          : []

        const currentJob = jobs.find(
          (item) => String(item._id) === String(jobId),
        )

        const otherJobs = jobs
          .filter(
            (item) => String(item._id) !== String(jobId),
          )
          .slice(0, 3)

        if (!cancelled) {
          setJob(currentJob || null)
          setRelatedJobs(otherJobs)
        }
      } catch (error) {
        console.error(
          'Failed to fetch job details:',
          error,
        )

        if (!cancelled) {
          setJob(null)
          setRelatedJobs([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchJob()

    return () => {
      cancelled = true
    }
  }, [jobId])

  if (loading) {
    return (
      <div className="job-details">
        <Header homePath="/" />

        <main className="job-details__main">
          <Reveal
            as="h1"
            className="job-details__title"
            y={20}
          >
            Loading...
          </Reveal>
        </main>

        <Footer />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="job-details">
        <Header homePath="/" />

        <main className="job-details__main">
          <Reveal
            as="h1"
            className="job-details__title"
            y={20}
          >
            Job not found
          </Reveal>

          <Reveal
            as="p"
            className="job-details__empty"
            y={16}
            delay={0.08}
          >
            This position is unavailable or the link is incorrect.
          </Reveal>

          <a
            className="job-details__apply-btn"
            href="/careers/full"
          >
            Back to Careers
          </a>
        </main>

        <Footer />
      </div>
    )
  }

  const level =
    job.category?.trim() || 'Professional'

  const salary =
    job.salary?.trim() || 'Not specified'

  const expirationDate =
    job.expirationDate?.trim() || 'Not specified'

  const description =
    job.description?.trim() || ''

  const requirements =
    job.requirements?.trim() || ''

  const benefits =
    job.benefits?.trim() || ''

  const sections = [
    {
      title: 'Job Description',
      content: description,
    },
    {
      title: 'Requirements',
      content: requirements,
    },
    {
      title: 'Benefits',
      content: benefits,
    },
  ].filter((section) => section.content)

  return (
    <div className="job-details">
      <Header homePath="/" />

      <main className="job-details__main">
        <Reveal
          as="h1"
          className="job-details__title"
          y={22}
        >
          {job.title}
        </Reveal>

        <Reveal
          className="job-details__meta"
          y={18}
          delay={0.08}
        >
          <div className="job-details__meta-item">
            <span className="job-details__meta-label">
              Level:
            </span>

            <span className="job-details__meta-value">
              {level}
            </span>
          </div>

          <div className="job-details__meta-item">
            <span className="job-details__meta-label">
              Salary:
            </span>

            <span className="job-details__meta-value">
              {salary}
            </span>
          </div>

          <div className="job-details__meta-item">
            <span className="job-details__meta-label">
              Expiration Date:
            </span>

            <span className="job-details__meta-value">
              {expirationDate}
            </span>
          </div>
        </Reveal>

        <hr className="job-details__divider" />

        <div className="job-details__layout">
          <div className="job-details__content">
            {sections.map((section) => (
              <ArticleSection
                key={section.title}
                className="job-details__section"
                aria-label={section.title}
              >
                <ArticleItem
                  as="h2"
                  className="job-details__section-title"
                >
                  {section.title}
                </ArticleItem>

                <ul className="job-details__list">
                  {section.content
                    .split(/\r?\n/)
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item, index) => (
                      <ArticleItem
                        as="li"
                        key={`${section.title}-${index}`}
                      >
                        {item}
                      </ArticleItem>
                    ))}
                </ul>
              </ArticleSection>
            ))}

            <ArticleSection
              className="job-details__apply"
              aria-labelledby="job-apply-title"
            >
              <ArticleItem
                as="h2"
                id="job-apply-title"
                className="job-details__apply-title"
              >
                Application process
              </ArticleItem>

              <ul className="job-details__contact-list">
                <ArticleItem as="li">
                  <span
                    className="job-details__contact-icon"
                    aria-hidden="true"
                  >
                    <MailIcon />
                  </span>

                  <span>
                    Send your CV to our email:{' '}
                    <a href={`mailto:${APPLY_EMAIL}`}>
                      {APPLY_EMAIL}
                    </a>
                  </span>
                </ArticleItem>

                <ArticleItem as="li">
                  <span
                    className="job-details__contact-icon"
                    aria-hidden="true"
                  >
                    <PhoneIcon />
                  </span>

                  <span>
                    Hotline:{' '}
                    <a
                      href={`tel:${APPLY_PHONE.replace(
                        /\s/g,
                        '',
                      )}`}
                    >
                      {APPLY_PHONE}
                    </a>
                    {' | '}HR Department
                  </span>
                </ArticleItem>

                <ArticleItem as="li">
                  <span
                    className="job-details__contact-icon"
                    aria-hidden="true"
                  >
                    <PinIcon />
                  </span>

                  <span>
                    Head Office:{' '}
                    <span className="job-details__contact-accent">
                      {OFFICE_ADDRESS}
                    </span>
                  </span>
                </ArticleItem>
              </ul>
            </ArticleSection>
          </div>

          <Reveal
            as="aside"
            className="job-details__actions"
            x={APPLY_PANEL_SLIDE_PX}
            y={0}
            transition={{
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
            }}
            aria-label="Apply and share"
          >
            <button
              type="button"
              className="job-details__apply-btn"
              onClick={() => setApplyOpen(true)}
            >
              Apply Now

              <span
                className="job-details__apply-icon"
                aria-hidden="true"
              >
                <ExternalIcon />
              </span>
            </button>

            <div className="job-details__share">
              <span className="job-details__share-label">
                Share:
              </span>

              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  className="job-details__share-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <section
          className="job-details__related"
          aria-labelledby="job-related-title"
        >
          <Reveal
            as="h2"
            id="job-related-title"
            className="job-details__related-heading"
            y={24}
          >
            Related Jobs
          </Reveal>

          <RevealGroup
            className="job-details__related-grid"
            stagger={RELATED_CARD_STAGGER_S}
            delayChildren={0}
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            {relatedJobs.map((related) => (
              <RelatedJobCard
                key={related._id}
                job={{
                  ...related,
                  level:
                    related.category?.trim() ||
                    'Professional',
                  detailLabel: 'Experience',
                  detailValue:
                    related.experience?.trim() ||
                    'Not specified',
                  metaLabel: 'Type',
                  metaValue:
                    related.type?.trim() ||
                    'Full Time',
                  hot: false,
                }}
              />
            ))}
          </RevealGroup>
        </section>
      </main>

      <Footer />

      <ApplyModal
        job={{
          ...job,
          level,
        }}
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
      />
    </div>
  )
}

export default JobDetails