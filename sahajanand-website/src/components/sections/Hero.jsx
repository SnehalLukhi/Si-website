import { useReducedMotion } from 'framer-motion'
import Button from '../common/Button'
import { Reveal } from '../motion/Reveal'
import bodyAndroid from '../../assets/images/hero/body-android-1.png'
import headAndroid from '../../assets/images/hero/head-android.png'
import icon1 from '../../assets/images/hero/icon1.png'
import icon2 from '../../assets/images/hero/icon2.png'
import icon3 from '../../assets/images/hero/icon3.png'
import icon4 from '../../assets/images/hero/icon4.png'
import icon5 from '../../assets/images/hero/icon5.png'
import icon6 from '../../assets/images/hero/icon6.png'
import icon7 from '../../assets/images/hero/icon7.png'
import icon8 from '../../assets/images/hero/icon8.png'
import '../common/Button.css'
import './Hero.css'

/**
 * Infinity-style seamless streams:
 * each lane is a duplicated icon track that scrolls -50% for a gapless loop.
 * Left lane falls into the android; right lane rises out.
 */
const WATERFALL_LANES = [
  {
    name: 'down',
    icons: [icon4, icon2, icon3, icon1],
    duration: '35s',
  },
  {
    name: 'up',
    icons: [icon5, icon6, icon7, icon8],
    duration: '35s',
  },
]

function IconTrack({ icons, name, duration }) {
  const loopIcons = [...icons, ...icons]

  return (
    <div className={`hero__icon-lane hero__icon-lane--${name}`}>
      <div
        className="hero__icon-track"
        style={{ '--hero-track-duration': duration }}
      >
        {loopIcons.map((src, index) => (
          <img
            key={`${name}-${index}`}
            className="hero__stream-icon"
            src={src}
            alt=""
            aria-hidden={index >= icons.length ? true : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function Hero({ onIntroComplete }) {
  const reduceMotion = useReducedMotion()
  const introCompleteProps =
    onIntroComplete && !reduceMotion ? { onAnimationComplete: onIntroComplete } : {}

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="hero__container">
        <div className="hero__copy">
          <Reveal as="h1" className="hero__title" y={40} duration={0.8}>
            We Build Apps
            <br />
            That People
            <br />
            Love to Use
          </Reveal>
          <Reveal as="p" className="hero__text" y={40} duration={0.8} delay={0.25}>
            We create innovative Android products that solve
            <br />
            everyday problems and reach users across the globe.
          </Reveal>
          <Reveal y={40} duration={0.8} delay={0.5} {...introCompleteProps}>
            <Button href="#contact">Get in Touch</Button>
          </Reveal>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__art-scene">
            <img
              className="hero__android-body"
              src={bodyAndroid}
              alt=""
            />
            <div className="hero__icon-clip">
              <div className="hero__icon-stream">
                {WATERFALL_LANES.map((lane) => (
                  <IconTrack
                    key={lane.name}
                    name={lane.name}
                    icons={lane.icons}
                    duration={lane.duration}
                  />
                ))}
              </div>
            </div>
            <img
              className="hero__android-rim"
              src={bodyAndroid}
              alt=""
            />
            <img
              className="hero__android-head"
              src={headAndroid}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
