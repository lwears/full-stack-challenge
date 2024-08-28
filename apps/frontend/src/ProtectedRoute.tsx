import { Navigate } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'

import { Loading } from './components'

import type { ReactNode } from 'react'

interface Props {
  redirectPath?: string
  children: ReactNode
}

export const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}: Props) => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') {
    return <Loading />
  }

  if (!signInCheckResult.signedIn) {
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}
