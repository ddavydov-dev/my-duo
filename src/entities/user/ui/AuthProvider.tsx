import { supabase } from '@/supabase'
import { Session } from '@supabase/supabase-js'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '../model/AuthContext'
// import { useNavigate } from '@tanstack/react-router'

// const PUBLIC_ROUTES = ['/reset-password', '/login']

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  // const navigate = useNavigate()
  // const location = useLocation()
  // const [searchParams, setSearchParams] = useSearchParams()

  const initAuth = useCallback(async () => {
    const { data } = await supabase.auth.getSession()

    // if (!data.session) navigate({ to: '/' })

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
