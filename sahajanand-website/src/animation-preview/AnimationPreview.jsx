import { useCallback, useState } from 'react'
import androidBody from './assets/android-body.png'
import androidHead from './assets/android-head.png'
import cardCamera from './assets/card-camera.png'
import cardWeather from './assets/card-weather.png'
import cardAnime from './assets/card-anime.png'
import cardShark from './assets/card-shark.png'
import cardDragons from './assets/card-dragons.png'
import cardHeart from './assets/card-heart.png'
import cardMushroom from './assets/card-mushroom.png'
import cardDraw from './assets/card-draw.png'
import './AnimationPreview.css'

const CARDS = [
  { name: 'camera', src: cardCamera, left: 8.961, width: 15.558, z: 4, duration: 10.5, delay: 0 },
  { name: 'weather', src: cardWeather, left: 24.904, width: 17.482, z: 3, duration: 11.8, delay: 1.2 },
  { name: 'anime', src: cardAnime, left: 17.977, width: 16.273, z: 6, duration: 9.6, delay: 2.4 },
  { name: 'shark', src: cardShark, left: 35.349, width: 15.503, z: 5, duration: 12.4, delay: 0.6 },
  { name: 'dragons', src: cardDragons, left: 27.708, width: 15.723, z: 5, duration: 10.9, delay: 3.3 },
  { name: 'heart', src: cardHeart, left: 44.365, width: 16.273, z: 7, duration: 11.2, delay: 1.8 },
  { name: 'mushroom', src: cardMushroom, left: 37.328, width: 15.558, z: 6, duration: 13.1, delay: 4.1 },
  { name: 'draw', src: cardDraw, left: 54.096, width: 15.778, z: 8, duration: 10.2, delay: 2.9 },
]

function AnimationPreview() {
  const [playId, setPlayId] = useState(0)

  const replay = useCallback(() => {
    setPlayId((value) => value + 1)
  }, [])

  return (
    <div className="preview">
      <div
        key={playId}
        className="preview__stage"
        aria-label="Android animation preview"
      >
        <img
          className="preview__body"
          src={androidBody}
          alt=""
        />
        <img
          className="preview__head"
          src={androidHead}
          alt=""
        />
        {CARDS.map((card) => (
          <img
            key={card.name}
            className="preview__card"
            src={card.src}
            alt=""
            style={{
              left: `${card.left}%`,
              width: `${card.width}%`,
              zIndex: card.z,
              '--preview-duration': `${card.duration}s`,
              '--preview-delay': `${card.delay}s`,
            }}
          />
        ))}
      </div>

      <button className="preview__replay" type="button" onClick={replay}>
        Replay Animation
      </button>
    </div>
  )
}

export default AnimationPreview
