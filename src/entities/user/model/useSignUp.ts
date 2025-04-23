import { FormEvent, useState } from 'react'
import { signInWithEmail, signUpWithEmail } from '../services/authServices'
import { useNavigate } from '@tanstack/react-router'
import { syncLocalDataToSupabase } from '@/features/user/syncData'

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setPending] = useState(false)

  const navigate = useNavigate()
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)

    const target = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
    }

    const name = target.name.value
    const email = target.email.value
    const password = target.password.value

    const { error, data } = await signUpWithEmail(email, password, name)
    setPending(false)

    if (error) return setError(error.message)

    if (data.user?.id) {
      await syncLocalDataToSupabase(data.user.id)
    }

    await signInWithEmail(email, password)

    navigate({ to: '/learn' })
  }

  return { error, isPending, handleSignUp }
}
