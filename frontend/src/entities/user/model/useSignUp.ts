import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmail, signUpWithEmail } from '../services/authServices'

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

    const res = await signUpWithEmail(email, password, name)
    setPending(false)

    if (res.error) return setError(res.error.message)

    await signInWithEmail(email, password)

    navigate(0)
  }

  return { error, isPending, handleSignUp }
}
