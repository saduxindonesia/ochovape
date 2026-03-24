import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/i18n'
import { trackVisit } from './utils/analytics'
import App from './App.jsx'

// Track each page visit (including refresh = new visit count)
trackVisit();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
