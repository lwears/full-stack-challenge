import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { firebaseConfig } from './firebase.ts'
import { FirebaseAppProvider } from 'reactfire'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import './styles/index.css'

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAppProvider>
  </StrictMode>,
)
