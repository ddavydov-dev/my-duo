import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { FormField } from '@/shared/ui/FormField'

import styles from './Auth.module.scss'
import { useLogin } from '../model/useLogin'
import { Text } from '@/shared/ui/Text'
import { useNavigate } from '@tanstack/react-router'

export const Login = () => {
  const { error, isPending, handleLogin } = useLogin()
  const navigate = useNavigate()

  return (
    <form action="/" method="POST" className={styles.AuthForm} onSubmit={handleLogin}>
      <Text as="h1" type="title-1">
        Log in
      </Text>
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
            <button
              type="button"
              className={styles.ForgotPassword}
              onClick={() => navigate({ to: '/forgot-password' })}
            >
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
