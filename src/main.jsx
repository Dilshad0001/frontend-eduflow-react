import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx'
// import { DarkModeProvider } from './context/DarkModeContext.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
    <App />
    </DarkModeProvider>
  </StrictMode>,
)
