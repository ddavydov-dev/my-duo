import { supabase } from '@/supabase'
import { useState, useCallback } from 'react'
import { useUser } from './useUser'
import { useNavigate } from '@tanstack/react-router'

export const useDeleteAccount = () => {
  const { user } = useUser()
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const handleDelete = useCallback(async () => {
    console.log('♟ user:', user)
    if (!user) return

    setPending(true)
    const { error, status } = await supabase.from('profile').delete().eq('id', user.id)
    await supabase.auth.signOut()
    setPending(false)
    if (error) setError(error.message)
    if (status === 204) navigate({ to: '/' })
  }, [user, navigate])

  return { isPending, error, handleDelete }
}
