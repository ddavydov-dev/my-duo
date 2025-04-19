import { FC, ReactNode } from 'react'
import { Navigation } from '../Navigation/ui/Navigation'
import { AuthProvider } from '@/entities/user'

interface PageProps {
  children: ReactNode
  isNavClosed?: boolean
}

export const Page: FC<PageProps> = ({ children, isNavClosed = false }) => {
  return (
    <AuthProvider>
      <div style={{ paddingLeft: isNavClosed ? 88 : 256, display: 'flex' }}>
        <Navigation isNavClosed={isNavClosed} />
        {children}
      </div>
    </AuthProvider>
  )
}
