import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { supabase } from '@/supabase'

export const useUser = () => {
  const session = useAuth()

  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!session) return navigate('/login')

  return { user: session.user, signOut: handleSignOut }
}
