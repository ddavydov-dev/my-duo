import { FC, ReactNode } from 'react'
import Navigation from './Navigation'
import { AuthProvider } from '@/entities/user'

interface PageProps {
  children: ReactNode
  isNavClosed?: boolean
}

export const Page: FC<PageProps> = ({ children, isNavClosed = false }) => {
  return (
    <AuthProvider>
      <div className={'flex'}>
        <Navigation isNavClosed={isNavClosed} />
        {children}
      </div>
    </AuthProvider>
  )
}
