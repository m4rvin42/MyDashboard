import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './debug.css'
import App from './App.jsx'

const isDebug = import.meta.env.VITE_DEBUG === 'true'
if (isDebug && typeof document !== 'undefined') {
  document.body.classList.add('debug')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
