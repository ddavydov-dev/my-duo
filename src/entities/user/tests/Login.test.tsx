import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Login } from '../ui/Login'

vi.mock('../model/useLogin', () => ({
  useLogin: () => ({
    error: null,
    isPending: false,
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    }
  })
}))

describe('Login Component', () => {
  test('renders email and password fields', () => {
    const { getByPlaceholderText } = render(<Login onForgotPassword={() => {}} />)
    expect(getByPlaceholderText(/Email or username/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument()
  })

  test('calls onForgotPassword when forgot button is clicked', async () => {
    const forgotCallback = vi.fn()
    const user = userEvent.setup()

    const { getByText } = render(<Login onForgotPassword={forgotCallback} />)
    const forgotButton = getByText(/FORGOT\?/i)
    await user.click(forgotButton)
    expect(forgotCallback).toHaveBeenCalled()
  })
})
