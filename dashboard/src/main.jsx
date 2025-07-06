import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './debug.css'
import App from './App.jsx'
import ConfigPage from './ConfigPage.jsx'

const isDebug = import.meta.env.VITE_DEBUG === 'true'
if (isDebug && typeof document !== 'undefined') {
  document.body.classList.add('debug')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
