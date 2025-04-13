import { supabase } from '@/supabase'
import { useState, FormEvent } from 'react'

export const useResetPassword = () => {
  const [isPending, setPending] = useState(false)
  const [isSent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const emailInput = e.currentTarget.elements[0] as HTMLInputElement
    const email = emailInput.value
    const res = await supabase.from('profile').select('id').eq('email', email)
    if (res.data?.length === 0) {
      setPending(false)
      setError('Account not found')
      return
    }
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    setError(null)
    setPending(false)
    setSent(true)
  }

  return { isPending, isSent, error, handleReset }
}
