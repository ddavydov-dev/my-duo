import { Button } from '@/shared/ui/Button'
import styles from './Auth.module.scss'
import { FC, useState } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { FormField } from '@/shared/ui/FormField'
import { supabase } from '@/supabase'

interface ForgotPasswordProps {
  onClose: VoidFunction
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleReset = async e => {
    e.preventDefault()
    setPending(true)
    console.log('email: ', email)
    const res = await supabase.from('profile').select('id').eq('email', email)
    if (res.data?.length === 0) {
      setPending(false)
      setError('Account not found')
      return
    }
    const resetRes = await supabase.auth.resetPasswordForEmail(email)
    console.log('resetRes: ', resetRes)
    setError(null)
    setPending(false)
    console.log(res)
  }

  return (
    <div className={styles.Auth}>
      <div className={styles.Close}>
        <button onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
          <Icon name="close" />
        </button>
      </div>

      <div className={styles.AuthForm}>
        <h1
          style={{
            color: 'rgb(var(--color-eel))',
            fontSize: '25px',
            lineHeight: 1.36,
            margin: '0 0 8px'
          }}
        >
          Forgot password
        </h1>
        <p>We will send you instructions on how to reset your password by email.</p>

        <form action="/" method="POST" onSubmit={handleReset}>
          <FormField
            data-test="forgot-email-input"
            autoComplete="email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Button
            variant="primary-filled"
            isLoading={isPending}
            type="submit"
            style={{ width: '100%', marginTop: '16px' }}
          >
            Submit
          </Button>
        </form>

        {error ? (
          <div className={styles.ForgotPasswordError}>
            <span data-test="account-not-found">{error}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
