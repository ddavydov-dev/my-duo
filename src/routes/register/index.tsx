import { Text } from '@/shared/ui/Text'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import styles from './Register.module.scss'
import { FormField } from '@/shared/ui/FormField'
import { Button } from '@/shared/ui/Button'
import { FormEvent } from 'react'

export const Route = createFileRoute('/register/')({
  component: Register
})

function Register() {
  const navigate = useNavigate()

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const projectNameInput = e.currentTarget.elements[0] as HTMLInputElement

    localStorage.setItem('data', JSON.stringify({ projectName: projectNameInput.value }))

    navigate({ to: '/learn' })
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Register}>
        <Text as="h1" type="title-1" className={styles.Title}>
          I want to learn...
        </Text>

        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <form onSubmit={handleRegister}>
            <FormField placeholder="Enter name of the project" name="project-name" required />

            <Button type="submit">Continue</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
