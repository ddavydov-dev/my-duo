import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/supabase'

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setPending] = useState(false)

  const navigate = useNavigate()
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)

    const email = e.target.elements['email'].value
    const password = e.target.elements['password'].value

    const res = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setPending(false)

    if (res.error) {
      return setError(res.error.message)
    }

    navigate(0)
  }

  return { error, isPending, handleLogin }
}
