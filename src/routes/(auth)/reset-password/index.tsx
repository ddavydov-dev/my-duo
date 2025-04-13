import { useState, useEffect, useCallback, FormEvent } from 'react'
import { supabase } from '@/supabase'
import { Button } from '@/shared/ui/Button'
import { Flex } from '@/shared/ui/Flex'
import { FormField } from '@/shared/ui/FormField'

import styles from './Reset.module.scss'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/reset-password/')({
  component: ResetPasswordPage
})

function ResetPasswordPage() {
  const [validSession, setValidSession] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updatePassword = useCallback(async (newPassword: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) throw updateError
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update password'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.refreshSession()
      if (error) {
        console.error('Error retrieving session from URL', error)
      }

      setValidSession(!!data.session)
    }
    checkSession()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const password = formData.get('new-password') as string | null
    const confirmPassword = formData.get('confirm-new-password') as string | null

    if (!password || !confirmPassword) {
      console.error('Missing one or more required fields.')
      return
    }

    if (password !== confirmPassword) return // Form validation will handle this

    try {
      await updatePassword(password)
      navigate({ to: '/learn' })
    } catch (err) {
      // Error is handled by useAuth hook
      console.error('Password update error:', err)
    }
  }

  if (!validSession) {
    return (
      <div className={styles.ResetForm}>
        <h1 style={{ fontSize: '26px', margin: '10px 0 15px' }}>Invalid or expired reset link</h1>
        <p style={{ margin: 0 }}>Please request a new password reset link</p>
      </div>
    )
  }

  return (
    <form className={styles.ResetForm} onSubmit={handleSubmit}>
      <h1 style={{ fontSize: '26px', margin: '10px 0 15px' }}>Reset Password</h1>
      <Flex flexDirection="column" space={4} className={styles.Flex}>
        <FormField
          data-test="new-password-input"
          placeholder="New password"
          type="password"
          name="new-password"
          required
        />
        <FormField
          data-test="confirm-new-password-input"
          placeholder="Confirm password"
          type="password"
          name="confirm-new-password"
          required
        />
      </Flex>
      {error ? <p className={styles.Error}>{error}</p> : null}
      <Button
        type="submit"
        variant="primary-filled"
        isLoading={loading}
        style={{ width: '100%', marginTop: '24px' }}
      >
        Submit
      </Button>
    </form>
  )
}
