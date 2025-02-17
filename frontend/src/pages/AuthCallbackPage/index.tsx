import { useEffect } from 'react'

export function AuthCallbackPage() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'auth' }, window.location.origin)
      window.close()
    }
  }, [])

  return <div>Logging in... Please wait.</div>
}
