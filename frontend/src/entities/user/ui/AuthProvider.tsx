import { supabase } from '@/supabase'
import { Session } from '@supabase/supabase-js'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { Auth } from './Auth'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../model/AuthContext'

const PUBLIC_ROUTES = ['/reset-password']

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const location = useLocation()

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

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname)

  // TODO: looks like we show only if we want to log in
  if (!session || (!isPublicRoute && !session)) {
    return <Auth />
  }

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}
