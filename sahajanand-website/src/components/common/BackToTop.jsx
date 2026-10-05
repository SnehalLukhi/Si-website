import { useEffect, useState } from 'react'
import './BackToTop.css'

const SHOW_AFTER_PX = 320

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-to-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  )
}

export default BackToTop
