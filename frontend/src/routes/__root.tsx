import { AuthProvider } from '@/entities/user'
import { Navigation } from '@/widgets/Navigation/ui/Navigation'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent
})

const PUBLIC_ROUTES = ['/forgot-password', '/reset-password', '/login', '/signup', '/']

function RootComponent() {
  const data = localStorage.getItem('data')
  const { pathname } = useLocation()
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  if (data && !isPublicRoute) {
    return (
      <AuthProvider>
        <div style={{ paddingLeft: 256 }}>
          <Navigation />
          <Outlet />
        </div>
      </AuthProvider>
    )
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
