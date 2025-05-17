import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import Navigation from './Navigation'
import { AuthProvider } from '@/entities/user'

interface PageProps {
  children: ReactNode
  isNavClosed?: boolean
}

export const Page: FC<PageProps> = ({ children, isNavClosed = false }) => {
  const paddingLeft = `pl-[${isNavClosed ? 88 : 256}px]` // TODO: fix this

  return (
    <AuthProvider>
      <div className={clsx('flex', paddingLeft)}>
        <Navigation isNavClosed={isNavClosed} />
        {children}
      </div>
    </AuthProvider>
  )
}
