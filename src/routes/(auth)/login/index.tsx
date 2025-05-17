import { Login } from '@/entities/user/ui/Login'
import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { useState } from 'react'

import styles from './Login.module.scss'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { SignUp } from '@/entities/user/ui/SignUp'
import { BackButton } from '@/shared/ui/BackButton'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage
})

export type LoginLocationState = {
  login?: 'signUp' | 'login'
}

type ProviderType = 'google' | 'github'

function LoginPage() {
  const [pending, setPending] = useState<ProviderType | null>(null)
  const state = useLocation({ select: ({ state }) => state as unknown as LoginLocationState })
  const [isSigningUp, setSigningUp] = useState(state.login === 'signUp')

  const signInWith = (provider: ProviderType) => {
    setPending(provider)
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    const redirectUrl = `${window.location.origin}/auth/callback`
    const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(
      redirectUrl
    )}`

    window.open(authUrl, '_blank')
  }

  const toggleLoginScreen = () => setSigningUp(prev => !prev)

  return (
    <div className={styles.Auth}>
      <BackButton />

      <div className={styles.SignUp}>
        <Button variant={'primary-ghost'} onClick={toggleLoginScreen}>
          {isSigningUp ? 'Login' : 'Sign up'}
        </Button>
      </div>

      <div className={styles.AuthForm}>
        {isSigningUp ? <SignUp /> : <Login />}

        <div className={styles.Or}>
          <div className={styles.Line} />
          <div className={styles.Children}>or</div>
          <div className={styles.Line} />
        </div>

        <Flex space={3}>
          <Button
            variant={'primary-ghost'}
            icon="google"
            onClick={() => signInWith('google')}
            style={{ flexGrow: 1, color: 'rgb(66, 133, 244)' }}
            isLoading={pending === 'google'}
          >
            Google
          </Button>
          <Button
            variant={'primary-ghost'}
            icon="github"
            onClick={() => signInWith('github')}
            style={{ flexGrow: 1, color: '#1b1f23' }}
            isLoading={pending === 'github'}
          >
            Github
          </Button>
        </Flex>
      </div>
    </div>
  )
}
