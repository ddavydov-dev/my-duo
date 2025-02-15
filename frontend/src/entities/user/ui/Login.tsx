import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { FormField } from '@/shared/ui/FormField'

import styles from './Auth.module.scss'
import { useLogin } from '../model/useLogin'

export const Login = ({ onForgotPassword }: { onForgotPassword: VoidFunction }) => {
  const { error, isPending, handleLogin } = useLogin()

  return (
    <form action="/" method="POST" className={styles.AuthForm} onSubmit={handleLogin}>
      <h1 style={{ fontSize: '26px', margin: '10px 0 15px' }}>Log in</h1>
      <Flex flexDirection="column" space={4}>
        <FormField
          data-test="email-input"
          autoComplete="email"
          placeholder="Email or username"
          type="email"
          name="email"
          required
        />
        <FormField
          data-test="password-input"
          placeholder="Password"
          type="password"
          name="password"
          postfix={
            <button type="button" className={styles.ForgotPassword} onClick={onForgotPassword}>
              FORGOT?
            </button>
          }
          required
        />
      </Flex>
      {error ? <p className={styles.Error}>{error}</p> : null}
      <Button
        type="submit"
        variant="primary-filled"
        isLoading={isPending}
        style={{ width: '100%', marginTop: '24px' }}
      >
        Log in
      </Button>
    </form>
  )
}
