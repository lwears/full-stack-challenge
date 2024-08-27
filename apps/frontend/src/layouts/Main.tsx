import { Outlet } from 'react-router-dom'

export const Main: React.FC = () => (
  <main className="flex size-full flex-col items-center justify-center">
    <Outlet />
  </main>
)
