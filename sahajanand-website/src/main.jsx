import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import IntroVideo from './components/common/IntroVideo'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IntroVideo>
      <App />
    </IntroVideo>
  </StrictMode>,
)
