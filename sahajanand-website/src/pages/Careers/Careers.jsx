// import { useEffect, useMemo, useRef, useState } from 'react'
// import { motion, useInView, useReducedMotion } from 'framer-motion'
// import Header from '../../components/layout/Header'
// import Footer from '../../components/layout/Footer'
// import cultureImage1 from '../../assets/images/careers/1image.png'
// import cultureImage2 from '../../assets/images/careers/2image.png'
// import cultureImage3 from '../../assets/images/careers/3image.png'
// import cultureImage4 from '../../assets/images/careers/4image.png'
// import quoteMark from '../../assets/images/careers/quote-mark.svg'
// import './Careers.css'

// const JOBS = [
//   {
//     id: 'frontend',
//     title: 'Frontend Developer',
//     level: 'Junior - Middle',
//     detailLabel: 'Experience',
//     detailValue: '1–3 years',
//     metaLabel: 'Type',
//     metaValue: 'Full-time',
//     hot: true,
//   },
//   {
//     id: 'backend',
//     title: 'Backend Developer',
//     level: 'Middle',
//     detailLabel: 'Experience',
//     detailValue: '2–4 years',
//     metaLabel: 'Type',
//     metaValue: 'Full-time',
//     hot: true,
//   },
//   {
//     id: 'fullstack',
//     title: 'Full Stack Developer',
//     level: 'Junior - Middle',
//     detailLabel: 'Experience',
//     detailValue: '2–5 years',
//     metaLabel: 'Type',
//     metaValue: 'Full-time',
//     hot: true,
//   },
//   {
//     id: 'uiux',
//     title: 'UI/UX Designer',
//     level: 'Junior - Middle',
//     detailLabel: 'Experience',
//     detailValue: '1–3 years',
//     metaLabel: 'Type',
//     metaValue: 'Full-time',
//     hot: true,
//   },
//   {
//     id: 'marketing',
//     title: 'Digital Marketing Executive',
//     level: 'Fresher / Junior',
//     detailLabel: 'Experience',
//     detailValue: '1–3 years',
//     metaLabel: 'Type',
//     metaValue: 'Full-time',
//     hot: false,
//   },
// ]

// const CULTURE_ROWS = [
//   {
//     id: 'perk-1',
//     image: cultureImage1,
//     imageFirst: true,
//     icon: '🥪',
//     text: 'A welcoming workplace with thoughtful amenities to keep your energy and creativity flowing.',
//   },
//   {
//     id: 'perk-2',
//     image: cultureImage2,
//     imageFirst: false,
//     icon: '🎉',
//     text: 'Team celebrations and shared moments designed to recharge, connect, and grow together.',
//   },
//   {
//     id: 'perk-3',
//     image: cultureImage3,
//     imageFirst: true,
//     icon: '💻',
//     text: 'Top-notch tools and a focused environment so you are ready to dive into meaningful work.',
//   },
//   {
//     id: 'perk-4',
//     image: cultureImage4,
//     imageFirst: false,
//     icon: '📈',
//     text: 'Clear growth paths, collaborative mentoring, and opportunities to build a lasting career.',
//   },
// ]

// const CARDS_PER_PAGE_DESKTOP = 3
// const CARDS_PER_PAGE_TABLET = 2
// const CARDS_PER_PAGE_MOBILE = 1

// const heroTextEase = [0.22, 1, 0.36, 1]

// const heroCopyVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.06,
//     },
//   },
// }

// const heroItemVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
//   },
// }

// /* Plays only after the hero intro sequence has finished */
// const jobsHeadingVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, delay: 0.15, ease: [0.33, 1, 0.68, 1] },
//   },
// }

// function JobCard({ job, index, cardsReady }) {
//   const ref = useRef(null)
//   const inView = useInView(ref, {
//     once: true,
//     amount: 0.35,
//     margin: '0px 0px -8% 0px',
//   })
//   const show = cardsReady && inView

//   return (
//     <motion.li
//       ref={ref}
//       className="careers-page__job-card"
//       initial={{ opacity: 0, y: 24 }}
//       animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
//       transition={{
//         duration: 0.6,
//         delay: show ? index * 0.14 : 0,
//         ease: heroTextEase,
//       }}
//       whileHover={
//         show
//           ? {
//               y: -4,
//               transition: { duration: 0.3, ease: 'easeOut' },
//             }
//           : undefined
//       }
//     >
//       {job.hot ? <span className="careers-page__job-hot">HOT</span> : null}
//       <h3 className="careers-page__job-name">{job.title}</h3>
//       <div className="careers-page__job-meta-list">
//         <div className="careers-page__job-meta-row">
//           <span className="careers-page__job-icon">
//             <CapIcon />
//           </span>
//           <span className="careers-page__job-meta-inline">{job.level}</span>
//         </div>
//         <div className="careers-page__job-meta-block">
//           <div className="careers-page__job-meta-row">
//             <span className="careers-page__job-icon">
//               <BriefcaseIcon />
//             </span>
//             <span className="careers-page__job-meta-label">{job.detailLabel}:</span>
//           </div>
//           <p className="careers-page__job-meta-value">{job.detailValue}</p>
//         </div>
//         <div className="careers-page__job-meta-block">
//           <div className="careers-page__job-meta-row">
//             <span className="careers-page__job-icon">
//               <ClockIcon />
//             </span>
//             <span className="careers-page__job-meta-label">{job.metaLabel}</span>
//           </div>
//           <p className="careers-page__job-meta-value">{job.metaValue}</p>
//         </div>
//       </div>
//       <a className="careers-page__job-btn" href={`/careers/job/${job.id}`}>
//         View Job <span aria-hidden="true">&gt;</span>
//       </a>
//     </motion.li>
//   )
// }

// const cultureHeadVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.06,
//     },
//   },
// }

// const cultureHeadItemVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
//   },
// }

// const cultureBlockVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.14,
//       delayChildren: 0.04,
//     },
//   },
// }

// const cultureImageVariants = {
//   hidden: { opacity: 0, scale: 0.88 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.7, ease: heroTextEase },
//   },
// }

// function useIsCultureDesktop() {
//   const [isDesktop, setIsDesktop] = useState(() =>
//     typeof window !== 'undefined'
//       ? window.matchMedia('(min-width: 1141px)').matches
//       : true,
//   )

//   useEffect(() => {
//     const mq = window.matchMedia('(min-width: 1141px)')
//     const onChange = () => setIsDesktop(mq.matches)
//     onChange()
//     mq.addEventListener('change', onChange)
//     return () => mq.removeEventListener('change', onChange)
//   }, [])

//   return isDesktop
// }

// function CultureBlock({ row, isDesktop, reduceMotion }) {
//   const contentFromLeft = !row.imageFirst

//   const copyVariants = reduceMotion
//     ? {
//         hidden: { opacity: 1, x: 0, y: 0 },
//         visible: { opacity: 1, x: 0, y: 0 },
//       }
//     : isDesktop
//       ? {
//           hidden: {
//             opacity: 0,
//             x: contentFromLeft ? -28 : 28,
//           },
//           visible: {
//             opacity: 1,
//             x: 0,
//             transition: { duration: 0.65, ease: heroTextEase },
//           },
//         }
//       : {
//           hidden: { opacity: 0, y: 20 },
//           visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.6, ease: heroTextEase },
//           },
//         }

//   const imageVariants = reduceMotion
//     ? {
//         hidden: { opacity: 1, scale: 1 },
//         visible: { opacity: 1, scale: 1 },
//       }
//     : cultureImageVariants

//   return (
//     <motion.article
//       className={`careers-page__culture-card${
//         row.imageFirst ? '' : ' is-reversed'
//       }`}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//       variants={cultureBlockVariants}
//     >
//       <motion.div
//         className="careers-page__culture-image"
//         variants={imageVariants}
//       >
//         <img src={row.image} alt="" />
//       </motion.div>
//       <motion.div
//         className="careers-page__culture-copy"
//         variants={copyVariants}
//       >
//         <span className="careers-page__culture-emoji" aria-hidden="true">
//           {row.icon}
//         </span>
//         <p>{row.text}</p>
//       </motion.div>
//     </motion.article>
//   )
// }

// function getCardsPerPage() {
//   if (typeof window === 'undefined') return CARDS_PER_PAGE_DESKTOP
//   if (window.innerWidth <= 676) return CARDS_PER_PAGE_MOBILE
//   // Tablet (<992) and mid-desktop (992–1199): 2 cards per row/page
//   if (window.innerWidth <= 1199) return CARDS_PER_PAGE_TABLET
//   return CARDS_PER_PAGE_DESKTOP
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

// function Careers() {
//   const [page, setPage] = useState(0)
//   const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage)
//   const [jobsCardsReady, setJobsCardsReady] = useState(false)
//   const [heroIntroDone, setHeroIntroDone] = useState(false)
//   const jobsHeadingRef = useRef(null)
//   const jobsHeadingInView = useInView(jobsHeadingRef, {
//     once: true,
//     amount: 0.6,
//     margin: '0px 0px -12% 0px',
//   })
//   const isCultureDesktop = useIsCultureDesktop()
//   const reduceMotion = useReducedMotion()

//   useEffect(() => {
//     if (reduceMotion) setJobsCardsReady(true)
//   }, [reduceMotion])

//   const pageCount = Math.ceil(JOBS.length / cardsPerPage)
//   const visibleJobs = useMemo(() => {
//     const start = page * cardsPerPage
//     return JOBS.slice(start, start + cardsPerPage)
//   }, [page, cardsPerPage])

//   useEffect(() => {
//     window.scrollTo(0, 0)
//     const onResize = () => {
//       const next = getCardsPerPage()
//       setCardsPerPage((prev) => {
//         if (prev !== next) setPage(0)
//         return next
//       })
//     }
//     onResize()
//     window.addEventListener('resize', onResize)
//     return () => {
//       window.removeEventListener('resize', onResize)
//     }
//   }, [])

//   return (
//     <div className="careers-page">
//       <Header homePath="/" />

//       <section className="careers-page__hero" aria-label="Careers">
//         <motion.div
//           className="careers-page__hero-copy"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.4 }}
//           variants={heroCopyVariants}
//           onAnimationComplete={(definition) => {
//             if (definition === 'visible') setHeroIntroDone(true)
//           }}
//         >
//           <motion.h1 className="careers-page__hero-title" variants={heroItemVariants}>
//             Careers
//           </motion.h1>
//           <motion.p className="careers-page__hero-lead" variants={heroItemVariants}>
//             Build Your Future <span>With Us</span>
//           </motion.p>
//           <motion.p className="careers-page__hero-text" variants={heroItemVariants}>
//             Join Sahajanand Infotech and work with a passionate team building
//             innovative digital solutions that create real impact.
//           </motion.p>
//         </motion.div>
//       </section>

//       <section
//         id="open-positions"
//         className="careers-page__jobs"
//         aria-labelledby="careers-jobs-title"
//       >
//         <motion.h2
//           ref={jobsHeadingRef}
//           id="careers-jobs-title"
//           className="careers-page__jobs-title"
//           initial={reduceMotion ? false : 'hidden'}
//           animate={
//             reduceMotion ? undefined : heroIntroDone && jobsHeadingInView ? 'visible' : 'hidden'
//           }
//           variants={jobsHeadingVariants}
//           onAnimationComplete={(definition) => {
//             if (definition === 'visible') setJobsCardsReady(true)
//           }}
//         >
//           Job Opportunities
//         </motion.h2>

//         <div className="careers-page__job-swiper">
//           <ul className="careers-page__job-track" key={`${cardsPerPage}-${page}`}>
//             {visibleJobs.map((job, index) => (
//               <JobCard
//                 key={job.id}
//                 job={job}
//                 index={index}
//                 cardsReady={jobsCardsReady || !!reduceMotion}
//               />
//             ))}
//           </ul>

//           <div className="careers-page__job-dots" role="tablist" aria-label="Job pages">
//             {Array.from({ length: pageCount }).map((_, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 className={`careers-page__job-dot${
//                   index === page ? ' is-active' : ''
//                 }`}
//                 aria-label={`Show jobs page ${index + 1}`}
//                 aria-selected={index === page}
//                 onClick={() => setPage(index)}
//               />
//             ))}
//           </div>

//           <a className="careers-page__view-all" href="/careers/full">
//             View All
//             <svg viewBox="0 0 24 24" aria-hidden="true">
//               <path
//                 fill="currentColor"
//                 d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
//               />
//             </svg>
//           </a>
//         </div>
//       </section>

//       <section
//         className="careers-page__culture"
//         aria-labelledby="careers-culture-title"
//       >
//         <div className="careers-page__culture-inner">
//           <motion.header
//             className="careers-page__culture-head"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.4 }}
//             variants={cultureHeadVariants}
//           >
//             <motion.h2
//               id="careers-culture-title"
//               className="careers-page__culture-title"
//               variants={cultureHeadItemVariants}
//             >
//               Life At Sahajanand
//             </motion.h2>
//             <motion.p
//               className="careers-page__culture-intro"
//               variants={cultureHeadItemVariants}
//             >
//               At Sahajanand Infotech, we believe a great workplace starts with the
//               small but meaningful things. That&apos;s why our culture is designed
//               to help every team member feel valued:
//             </motion.p>
//           </motion.header>

//           <div className="careers-page__culture-list">
//             {CULTURE_ROWS.map((row) => (
//               <CultureBlock
//                 key={row.id}
//                 row={row}
//                 isDesktop={isCultureDesktop}
//                 reduceMotion={reduceMotion}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="careers-page__quote" aria-label="Our workplace">
//         <div className="careers-page__quote-frame">
//           <div className="careers-page__quote-skew">
//             <div
//               className="careers-page__quote-mark careers-page__quote-mark--left"
//               aria-hidden="true"
//             >
//               <img src={quoteMark} alt="" width={122} height={122} />
//             </div>
//             <div className="careers-page__quote-inner">
//               <motion.p
//                 className="careers-page__quote-text"
//                 initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
//                 whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
//                 viewport={{ once: true, amount: 0.55, margin: '0px 0px -10% 0px' }}
//                 transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
//                 style={{ transformOrigin: 'center center' }}
//               >
//                 We&apos;re building a <span>professional</span> but{' '}
//                 <span>vibrant</span> workplace where people connect, feel{' '}
//                 <span>inspired</span> and <span>grow</span> their careers in their
//                 own way.
//               </motion.p>
//             </div>
//             <div
//               className="careers-page__quote-mark careers-page__quote-mark--right"
//               aria-hidden="true"
//             >
//               <img src={quoteMark} alt="" width={122} height={122} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />

//     </div>
//   )
// }

// export default Careers
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import cultureImage1 from '../../assets/images/careers/1image.png'
import cultureImage2 from '../../assets/images/careers/2image.png'
import cultureImage3 from '../../assets/images/careers/3image.png'
import cultureImage4 from '../../assets/images/careers/4image.png'
import quoteMark from '../../assets/images/careers/quote-mark.svg'
import './Careers.css'

const API_URL = 'http://localhost:5000'

const CULTURE_ROWS = [
  {
    id: 'perk-1',
    image: cultureImage1,
    imageFirst: true,
    icon: '🥪',
    text: 'A welcoming workplace with thoughtful amenities to keep your energy and creativity flowing.',
  },
  {
    id: 'perk-2',
    image: cultureImage2,
    imageFirst: false,
    icon: '🎉',
    text: 'Team celebrations and shared moments designed to recharge, connect, and grow together.',
  },
  {
    id: 'perk-3',
    image: cultureImage3,
    imageFirst: true,
    icon: '💻',
    text: 'Top-notch tools and a focused environment so you are ready to dive into meaningful work.',
  },
  {
    id: 'perk-4',
    image: cultureImage4,
    imageFirst: false,
    icon: '📈',
    text: 'Clear growth paths, collaborative mentoring, and opportunities to build a lasting career.',
  },
]

const CARDS_PER_PAGE_DESKTOP = 3
const CARDS_PER_PAGE_TABLET = 2
const CARDS_PER_PAGE_MOBILE = 1

const heroTextEase = [0.22, 1, 0.36, 1]

const heroCopyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.06,
    },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

/* Plays only after the hero intro sequence has finished */
const jobsHeadingVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

function JobCard({ job, index, cardsReady }) {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })

  const show = cardsReady && inView

  const experience =
    job.experience?.trim() || 'Not specified'

  const jobType =
    job.type?.trim() || 'Full Time'

  const level =
    job.category?.trim() || 'Professional'

  return (
    <motion.li
      ref={ref}
      className="careers-page__job-card"
      initial={{ opacity: 0, y: 24 }}
      animate={
        show
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{
        duration: 0.6,
        delay: show ? index * 0.14 : 0,
        ease: heroTextEase,
      }}
      whileHover={
        show
          ? {
              y: -4,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            }
          : undefined
      }
    >
      {job.hot ? (
        <span className="careers-page__job-hot">
          HOT
        </span>
      ) : null}

      <h3 className="careers-page__job-name">
        {job.title}
      </h3>

      <div className="careers-page__job-meta-list">
        <div className="careers-page__job-meta-row">
          <span className="careers-page__job-icon">
            <CapIcon />
          </span>

          <span className="careers-page__job-meta-inline">
            {level}
          </span>
        </div>

        <div className="careers-page__job-meta-block">
          <div className="careers-page__job-meta-row">
            <span className="careers-page__job-icon">
              <BriefcaseIcon />
            </span>

            <span className="careers-page__job-meta-label">
              Experience:
            </span>
          </div>

          <p className="careers-page__job-meta-value">
            {experience}
          </p>
        </div>

        <div className="careers-page__job-meta-block">
          <div className="careers-page__job-meta-row">
            <span className="careers-page__job-icon">
              <ClockIcon />
            </span>

            <span className="careers-page__job-meta-label">
              Type
            </span>
          </div>

          <p className="careers-page__job-meta-value">
            {jobType}
          </p>
        </div>
      </div>

      <a
        className="careers-page__job-btn"
        href={`/careers/job/${job._id}`}
      >
        View Job <span aria-hidden="true">&gt;</span>
      </a>
    </motion.li>
  )
}

const cultureHeadVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.06,
    },
  },
}

const cultureHeadItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

const cultureBlockVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
}

const cultureImageVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: heroTextEase,
    },
  },
}

function useIsCultureDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1141px)').matches
      : true,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1141px)')

    const onChange = () => {
      setIsDesktop(mq.matches)
    }

    onChange()

    mq.addEventListener('change', onChange)

    return () => {
      mq.removeEventListener('change', onChange)
    }
  }, [])

  return isDesktop
}

function CultureBlock({
  row,
  isDesktop,
  reduceMotion,
}) {
  const contentFromLeft = !row.imageFirst

  const copyVariants = reduceMotion
    ? {
        hidden: {
          opacity: 1,
          x: 0,
          y: 0,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
        },
      }
    : isDesktop
      ? {
          hidden: {
            opacity: 0,
            x: contentFromLeft ? -28 : 28,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.65,
              ease: heroTextEase,
            },
          },
        }
      : {
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: heroTextEase,
            },
          },
        }

  const imageVariants = reduceMotion
    ? {
        hidden: {
          opacity: 1,
          scale: 1,
        },
        visible: {
          opacity: 1,
          scale: 1,
        },
      }
    : cultureImageVariants

  return (
    <motion.article
      className={`careers-page__culture-card${
        row.imageFirst ? '' : ' is-reversed'
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      variants={cultureBlockVariants}
    >
      <motion.div
        className="careers-page__culture-image"
        variants={imageVariants}
      >
        <img src={row.image} alt="" />
      </motion.div>

      <motion.div
        className="careers-page__culture-copy"
        variants={copyVariants}
      >
        <span
          className="careers-page__culture-emoji"
          aria-hidden="true"
        >
          {row.icon}
        </span>

        <p>{row.text}</p>
      </motion.div>
    </motion.article>
  )
}

function getCardsPerPage() {
  if (typeof window === 'undefined') {
    return CARDS_PER_PAGE_DESKTOP
  }

  if (window.innerWidth <= 676) {
    return CARDS_PER_PAGE_MOBILE
  }

  // Tablet (<992) and mid-desktop (992–1199): 2 cards per row/page
  if (window.innerWidth <= 1199) {
    return CARDS_PER_PAGE_TABLET
  }

  return CARDS_PER_PAGE_DESKTOP
}

function CapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
      />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v3H2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm0 4h4V4h-4v2zm12 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5h8v1h4v-1h8z"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
      />
    </svg>
  )
}

function Careers() {
  const [jobs, setJobs] = useState([])
  const [jobsLoading, setJobsLoading] = useState(true)
  const [jobsError, setJobsError] = useState(false)

  const [page, setPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] =
    useState(getCardsPerPage)

  const [jobsCardsReady, setJobsCardsReady] =
    useState(false)

  const [heroIntroDone, setHeroIntroDone] =
    useState(false)

  const jobsHeadingRef = useRef(null)

  const jobsHeadingInView = useInView(
    jobsHeadingRef,
    {
      once: true,
      amount: 0.6,
      margin: '0px 0px -12% 0px',
    },
  )

  const isCultureDesktop = useIsCultureDesktop()
  const reduceMotion = useReducedMotion()

  /*
   * Fetch jobs from backend
   */
  useEffect(() => {
    let cancelled = false

    const fetchJobs = async () => {
      try {
        setJobsLoading(true)
        setJobsError(false)

        const response = await fetch(
          `${API_URL}/api/jobs`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Failed to fetch jobs',
          )
        }

        if (!cancelled) {
          setJobs(
            Array.isArray(data.jobs)
              ? data.jobs
              : [],
          )
        }
      } catch (error) {
        console.error(
          'Failed to fetch careers jobs:',
          error,
        )

        if (!cancelled) {
          setJobs([])
          setJobsError(true)
        }
      } finally {
        if (!cancelled) {
          setJobsLoading(false)
        }
      }
    }

    fetchJobs()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setJobsCardsReady(true)
    }
  }, [reduceMotion])

  const pageCount = Math.ceil(
    jobs.length / cardsPerPage,
  )

  const visibleJobs = useMemo(() => {
    const start = page * cardsPerPage

    return jobs.slice(
      start,
      start + cardsPerPage,
    )
  }, [jobs, page, cardsPerPage])

  /*
   * If jobs change and current page no longer exists,
   * return to first page.
   */
  useEffect(() => {
    if (pageCount === 0 && page !== 0) {
      setPage(0)
      return
    }

    if (page >= pageCount && pageCount > 0) {
      setPage(0)
    }
  }, [page, pageCount])

  useEffect(() => {
    window.scrollTo(0, 0)

    const onResize = () => {
      const next = getCardsPerPage()

      setCardsPerPage((prev) => {
        if (prev !== next) {
          setPage(0)
        }

        return next
      })
    }

    onResize()

    window.addEventListener(
      'resize',
      onResize,
    )

    return () => {
      window.removeEventListener(
        'resize',
        onResize,
      )
    }
  }, [])

  return (
    <div className="careers-page">
      <Header homePath="/" />

      <section
        className="careers-page__hero"
        aria-label="Careers"
      >
        <motion.div
          className="careers-page__hero-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          variants={heroCopyVariants}
          onAnimationComplete={(definition) => {
            if (definition === 'visible') {
              setHeroIntroDone(true)
            }
          }}
        >
          <motion.h1
            className="careers-page__hero-title"
            variants={heroItemVariants}
          >
            Careers
          </motion.h1>

          <motion.p
            className="careers-page__hero-lead"
            variants={heroItemVariants}
          >
            Build Your Future <span>With Us</span>
          </motion.p>

          <motion.p
            className="careers-page__hero-text"
            variants={heroItemVariants}
          >
            Join Sahajanand Infotech and work with a
            passionate team building innovative digital
            solutions that create real impact.
          </motion.p>
        </motion.div>
      </section>

      <section
        id="open-positions"
        className="careers-page__jobs"
        aria-labelledby="careers-jobs-title"
      >
        <motion.h2
          ref={jobsHeadingRef}
          id="careers-jobs-title"
          className="careers-page__jobs-title"
          initial={
            reduceMotion ? false : 'hidden'
          }
          animate={
            reduceMotion
              ? undefined
              : heroIntroDone &&
                  jobsHeadingInView
                ? 'visible'
                : 'hidden'
          }
          variants={jobsHeadingVariants}
          onAnimationComplete={(definition) => {
            if (definition === 'visible') {
              setJobsCardsReady(true)
            }
          }}
        >
          Job Opportunities
        </motion.h2>

        <div className="careers-page__job-swiper">
          {jobsLoading ? (
            <div className="careers-page__job-loading">
              Loading job opportunities...
            </div>
          ) : jobsError ? (
            <div className="careers-page__job-loading">
              Unable to load job opportunities.
            </div>
          ) : jobs.length === 0 ? (
            <div className="careers-page__job-loading">
              No job opportunities available right now.
            </div>
          ) : (
            <>
              <ul
                className="careers-page__job-track"
                key={`${cardsPerPage}-${page}`}
              >
                {visibleJobs.map(
                  (job, index) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      index={index}
                      cardsReady={
                        jobsCardsReady ||
                        !!reduceMotion
                      }
                    />
                  ),
                )}
              </ul>

              <div
                className="careers-page__job-dots"
                role="tablist"
                aria-label="Job pages"
              >
                {Array.from({
                  length: pageCount,
                }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`careers-page__job-dot${
                      index === page
                        ? ' is-active'
                        : ''
                    }`}
                    aria-label={`Show jobs page ${
                      index + 1
                    }`}
                    aria-selected={
                      index === page
                    }
                    onClick={() =>
                      setPage(index)
                    }
                  />
                ))}
              </div>
            </>
          )}

          <a
            className="careers-page__view-all"
            href="/careers/full"
          >
            View All

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
              />
            </svg>
          </a>
        </div>
      </section>

      <section
        className="careers-page__culture"
        aria-labelledby="careers-culture-title"
      >
        <div className="careers-page__culture-inner">
          <motion.header
            className="careers-page__culture-head"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.4,
            }}
            variants={cultureHeadVariants}
          >
            <motion.h2
              id="careers-culture-title"
              className="careers-page__culture-title"
              variants={cultureHeadItemVariants}
            >
              Life At Sahajanand
            </motion.h2>

            <motion.p
              className="careers-page__culture-intro"
              variants={cultureHeadItemVariants}
            >
              At Sahajanand Infotech, we believe a great
              workplace starts with the small but meaningful
              things. That&apos;s why our culture is designed
              to help every team member feel valued:
            </motion.p>
          </motion.header>

          <div className="careers-page__culture-list">
            {CULTURE_ROWS.map((row) => (
              <CultureBlock
                key={row.id}
                row={row}
                isDesktop={isCultureDesktop}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="careers-page__quote"
        aria-label="Our workplace"
      >
        <div className="careers-page__quote-frame">
          <div className="careers-page__quote-skew">
            <div
              className="careers-page__quote-mark careers-page__quote-mark--left"
              aria-hidden="true"
            >
              <img
                src={quoteMark}
                alt=""
                width={122}
                height={122}
              />
            </div>

            <div className="careers-page__quote-inner">
              <motion.p
                className="careers-page__quote-text"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.88,
                      }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.55,
                  margin: '0px 0px -10% 0px',
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                We&apos;re building a{' '}
                <span>professional</span> but{' '}
                <span>vibrant</span> workplace where people
                connect, feel <span>inspired</span> and{' '}
                <span>grow</span> their careers in their
                own way.
              </motion.p>
            </div>

            <div
              className="careers-page__quote-mark careers-page__quote-mark--right"
              aria-hidden="true"
            >
              <img
                src={quoteMark}
                alt=""
                width={122}
                height={122}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Careers