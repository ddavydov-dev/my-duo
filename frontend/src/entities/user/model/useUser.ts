import { useNavigate } from 'react-router-dom'
import { useSession } from './useSession'
import { signOut } from '../services/authServices'

export const useUser = () => {
  const session = useSession()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate(0)
  }

  return { user: session?.user, signOut: handleSignOut }
}
