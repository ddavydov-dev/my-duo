import { Login } from '@/entities/user/ui/Login'
import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { useState } from 'react'

// type ScreenType = 'login' | 'signUp' | 'forgotPassword'

import styles from './Login.module.scss'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Icon } from '@/shared/ui/Icon'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage
})

function LoginPage() {
  // const [screen, setScreen] = useState<ScreenType>('login')
  const [pending, setPending] = useState<'google' | 'github' | null>()
  const { history } = useRouter()
  // const

  // const handleToggleScreen = useCallback(
  //   () => setScreen(prev => (prev === 'login' ? 'signUp' : 'login')),
  //   []
  // )

  const signInWith = (provider: 'google' | 'github') => {
    setPending(provider)
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    const redirectUrl = `${window.location.origin}/auth/callback`
    const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(
      redirectUrl
    )}`

    window.open(authUrl, '_blank')
  }

  // if (screen === 'forgotPassword') return <ForgotPassword onClose={() => setScreen('login')} />

  return (
    <div className={styles.Auth}>
      <div className={styles.Close}>
        <button
          onClick={() => history.back()}
          style={{ border: 'none', background: 'transparent' }}
        >
          <Icon name="close" />
        </button>
      </div>

      <div className={styles.SignUp}>
        <Button variant={'primary-ghost'} onClick={() => history.push('/signup')}>
          Sign up
        </Button>
      </div>

      <div className={styles.AuthForm}>
        <Login />

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
