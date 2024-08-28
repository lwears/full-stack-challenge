import { Navigate } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'

import { Loading } from './components'

import type { ReactNode } from 'react'

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') {
    return <Loading />
  }

  if (signInCheckResult.signedIn) {
    return <Navigate to="/profile" />
  }

  return <>{children}</>
}
