import { supabase } from '@/supabase'
import { Session } from '@supabase/supabase-js'
import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { Auth } from './Auth'

export const AuthContext = createContext<Session | null>(null)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(data => {
        setSession(data.data.session)
      })
      .finally(() => setLoading(false))
  }, [])

  if (isLoading) return

  if (!session) {
    return <Auth />
  }

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}
