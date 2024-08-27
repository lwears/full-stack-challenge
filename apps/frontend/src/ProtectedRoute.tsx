import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'

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
    return <span>loading...</span>
  }

  if (!signInCheckResult.signedIn) {
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}
