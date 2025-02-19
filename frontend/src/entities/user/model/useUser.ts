// import { useNavigate } from 'react-router-dom'
import { useSession } from './useSession'
import { signOut } from '../services/authServices'
import { useNavigate } from '@tanstack/react-router'

export const useUser = () => {
  const session = useSession()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate({ to: '/' })
  }

  return { user: session?.user, signOut: handleSignOut }
}
