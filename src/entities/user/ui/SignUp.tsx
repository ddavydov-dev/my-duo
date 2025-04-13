import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { FormField } from '@/shared/ui/FormField'

import styles from './Auth.module.scss'
import { Text } from '@/shared/ui/Text'
import { useSignUp } from '../model/useSignUp'

export const SignUp = () => {
  const { error, isPending, handleSignUp } = useSignUp()

  return (
    <form action="/" method="POST" className={styles.AuthForm} onSubmit={handleSignUp}>
      <Text as="h1" type="title-1">
        Create your profile
      </Text>
      <Flex flexDirection="column" space={4}>
        <FormField data-test="name-input" placeholder="Name (optional)" name="name" />
        <FormField
          data-test="email-input"
          autoComplete="email"
          placeholder="Email"
          type="email"
          name="email"
          required
        />
        <FormField
          data-test="password-input"
          placeholder="Password"
          type="password"
          name="password"
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
        Create account
      </Button>
    </form>
  )
}
