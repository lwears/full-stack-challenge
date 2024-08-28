import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, FunctionsProvider, useFirebaseApp } from 'reactfire'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { Toaster } from 'sonner'

import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from './layouts/Layout'
import { PublicRoute } from './PublicRoute'

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
          <Route element={<Layout />}>
            <Route
              index
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
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
