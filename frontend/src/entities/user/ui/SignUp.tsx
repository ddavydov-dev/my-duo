import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { FormField } from '@/shared/ui/FormField'

import styles from './Auth.module.scss'
import { signIn } from '../utils/signIn'
import { FormEvent } from 'react'
import { signUp } from '../utils/signUp'

export const SignUp = () => {
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // console.log('event: ', e.target.elements)

    const name = e.target.elements['name'].value
    const email = e.target.elements['email'].value
    const password = e.target.elements['password'].value

    const res = await signUp(email, password)

    console.log(res)
  }

  return (
    <form action="/" method="POST" className={styles.AuthForm} onSubmit={handleSignUp}>
      <h1 style={{ fontSize: '26px', margin: '10px 0 15px' }}>Create your profile</h1>
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
      <Button type="submit" variant="primary-filled" style={{ width: '100%', marginTop: '24px' }}>
        Create account
      </Button>
    </form>
  )
}
