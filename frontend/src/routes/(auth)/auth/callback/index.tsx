import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/(auth)/auth/callback/')({
  component: AuthCallback
})

function AuthCallback() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'auth' }, window.location.origin)
      window.close()
    }
  }, [])

  return <div>Logging in... Please wait.</div>
}
