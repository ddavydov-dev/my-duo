import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { AuthCallbackPage } from './pages/AuthCallbackPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
    </Routes>
  )
}
