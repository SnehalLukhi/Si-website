import { useEffect, useRef, useState } from 'react'
import introVideo from '../../assets/images/intro-vedio.mp4'
import './IntroVideo.css'

const SEEN_KEY = 'sahajanand-intro-seen'
const FADE_MS = 600
/* If the video has not started playing after this long (slow network, blocked autoplay), the site opens anyway */
const START_TIMEOUT_MS = 6000

function alreadySeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* storage unavailable: the intro simply plays again next time */
  }
}

/* Plays the intro video first when the app is opened, then shows the site (children) with a soft fade.
   It plays once per browser session, so moving between pages of the site does not replay it. */
function IntroVideo({ children }) {
  const skip =
    alreadySeen() ||
    (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  /* 'playing' -> video on screen; 'fading' -> site is mounted and the video fades out; 'done' -> video removed */
  const [phase, setPhase] = useState(skip ? 'done' : 'playing')
  const videoRef = useRef(null)
  const startedRef = useRef(false)

  const finish = () => {
    markSeen()
    setPhase((current) => (current === 'playing' ? 'fading' : current))
  }

  useEffect(() => {
    if (phase !== 'playing') return undefined

    document.documentElement.classList.add('intro-active')

    const video = videoRef.current
    const play = video?.play?.()
    if (play && typeof play.catch === 'function') play.catch(finish)

    const timer = window.setTimeout(() => {
      if (!startedRef.current) finish()
    }, START_TIMEOUT_MS)

    return () => {
      window.clearTimeout(timer)
      document.documentElement.classList.remove('intro-active')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'fading') return undefined

    const timer = window.setTimeout(() => setPhase('done'), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  return (
    <>
      {phase !== 'playing' ? children : null}
      {phase !== 'done' ? (
        <div className={`intro-video${phase === 'fading' ? ' is-fading' : ''}`} aria-hidden="true">
          <video
            ref={videoRef}
            className="intro-video__media"
            src={introVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onPlaying={() => {
              startedRef.current = true
            }}
            onEnded={finish}
            onError={finish}
          />
        </div>
      ) : null}
    </>
  )
}

export default IntroVideo
