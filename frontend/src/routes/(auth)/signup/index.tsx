import { Icon } from '@/shared/ui/Icon'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import styles from './Signup.module.scss'
import { Button } from '@/shared/ui/Button'
import { SignUp } from '@/entities/user/ui/SignUp'
import { Flex } from '@/shared/ui/Flex'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/signup/')({
  component: RouteComponent
})

function RouteComponent() {
  const [pending, setPending] = useState<'google' | 'github' | null>()
  //   const { history } = useRouter()

  const signInWith = (provider: 'google' | 'github') => {
    setPending(provider)
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    const redirectUrl = `${window.location.origin}/auth/callback`
    const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(
      redirectUrl
    )}`

    window.open(authUrl, '_blank')
  }

  const navigate = useNavigate()

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
        <Button variant={'primary-ghost'} onClick={() => navigate({ to: '/login' })}>
          Login
        </Button>
      </div>

      <div className={styles.AuthForm}>
        <SignUp />

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
