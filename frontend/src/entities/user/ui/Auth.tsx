import { Button } from '@/shared/ui/Button'
import styles from './Auth.module.scss'
import { useCallback, useState } from 'react'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { supabase } from '@/supabase'
import { Flex } from '@/shared/ui/Flex'
import { ForgotPassword } from './ForgotPassword'

type ScreenType = 'login' | 'signUp' | 'forgotPassword'

// const screens = {
//   login: Login,
//   signUp: SignUp,
//   forgot: ForgotPassword
// } as const

export const Auth = () => {
  const [screen, setScreen] = useState<ScreenType>('login')

  const handleToggleScreen = useCallback(
    () => setScreen(prev => (prev === 'login' ? 'signUp' : 'login')),
    []
  )

  // const Element = screens[screen]

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }
  const signInWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github'
    })
  }

  if (screen === 'forgotPassword') return <ForgotPassword onClose={() => setScreen('login')} />

  return (
    <div className={styles.Auth}>
      <div className={styles.SignUp}>
        <Button variant={'primary-ghost'} onClick={handleToggleScreen}>
          {screen === 'login' ? 'Sign up' : 'Login'}
        </Button>
      </div>

      <div className={styles.AuthForm}>
        {/* <Element /> */}
        {screen === 'login' ? (
          <Login onForgotPassword={() => setScreen('forgotPassword')} />
        ) : (
          <SignUp />
        )}

        <div className={styles.Or}>
          <div className={styles.Line} />
          <div className={styles.Children}>or</div>
          <div className={styles.Line} />
        </div>

        <Flex space={3}>
          <Button
            variant={'primary-ghost'}
            icon="google"
            onClick={signInWithGoogle}
            style={{ flexGrow: 1, color: 'rgb(66, 133, 244)' }}
          >
            Google
          </Button>
          <Button
            variant={'primary-ghost'}
            icon="github"
            onClick={signInWithGithub}
            style={{ flexGrow: 1, color: '#1b1f23' }}
          >
            Github
          </Button>
        </Flex>
      </div>
    </div>
  )
}
