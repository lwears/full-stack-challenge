import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, FunctionsProvider, useFirebaseApp } from 'reactfire'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { Toaster } from 'sonner'

import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './ProtectedRoute'
import { Main } from './layouts/Main'

function App() {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const functions = getFunctions(app)

  if (import.meta.env.MODE !== 'production') {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }

  return (
    <FunctionsProvider sdk={functions}>
      <AuthProvider sdk={auth}>
        <Routes>
          <Route element={<Main />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster position="top-right" expand richColors />
      </AuthProvider>
    </FunctionsProvider>
  )
}

export default App
