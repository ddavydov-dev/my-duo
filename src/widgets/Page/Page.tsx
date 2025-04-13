import { FC, ReactNode } from 'react'
import { Navigation } from '../Navigation/ui/Navigation'
import { AuthProvider } from '@/entities/user'

export const Page: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <div style={{ paddingLeft: 256 }}>
        <Navigation />
        {children}
      </div>
    </AuthProvider>
  )
}
