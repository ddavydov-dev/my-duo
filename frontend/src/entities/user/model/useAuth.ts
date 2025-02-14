import { useContext } from 'react'
import { AuthContext } from '../ui/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}
