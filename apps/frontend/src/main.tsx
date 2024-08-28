import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'

import { firebaseConfig } from './firebase.ts'
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
