import { supabase } from '@/supabase'
import { Session } from '@supabase/supabase-js'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '../model/AuthContext'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const initAuth = useCallback(async () => {
    const { data } = await supabase.auth.getSession()

    setSession(data.session)
    setLoading(false)
  }, [])

  useEffect(() => {
    initAuth()

    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data.type === 'auth') initAuth()
    }

    window.addEventListener('message', messageListener)
    return () => window.removeEventListener('message', messageListener)
  }, [initAuth])

  if (isLoading) return

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}
