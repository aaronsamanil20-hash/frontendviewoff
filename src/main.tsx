import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import './styles/design-tokens.css'
import './styles/components.css'

import App from './App.tsx'
import './styles/glassmorphism-overhaul.css'
import './styles/obsidian-dark-theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
