import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { PositionProvider } from './data/PositionContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PositionProvider>
      <App />
    </PositionProvider>
  </StrictMode>,
)
