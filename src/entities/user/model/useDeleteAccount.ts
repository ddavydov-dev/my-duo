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
    if (!user) return

    setPending(true)
    // const { error, status } = await supabase.from('profile').delete().eq('id', user.id)
    // await supabase.auth.admin.deleteUser(user.id)
    // const { data, error } = await supabase.functions.invoke('deleteAccount', {
    //   body: { userId: user.id }
    // })
    try {
      const { status } = await fetch('http://127.0.0.1:54321/functions/v1/delete-account', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
      })
      await supabase.auth.signOut()
      localStorage.removeItem('data')
      if (status === 200) navigate({ to: '/' })
    } catch (error) {
      console.error('Error deleting account:', error)
      setError('Failed to delete account')
      return
    } finally {
      setPending(false)
    }
  }, [user, navigate])

  return { isPending, error, handleDelete }
}
