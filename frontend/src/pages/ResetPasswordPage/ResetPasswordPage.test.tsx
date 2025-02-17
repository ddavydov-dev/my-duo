import { render, waitFor } from '@testing-library/react'
import { ResetPasswordPage } from '../ResetPasswordPage'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import { vi } from 'vitest'

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigate
  }
})

// Mock supabase methods used in ResetPasswordPage
vi.mock('@/supabase', () => ({
  supabase: {
    auth: {
      refreshSession: vi.fn(() => Promise.resolve({ data: { session: { user: { id: '123' } } } })),
      updateUser: vi.fn(() => Promise.resolve({ error: null }))
    }
  }
}))

describe('ResetPasswordPage Component', () => {
  test('renders reset password form when session is valid', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(getByTestId('new-password-input')).toBeInTheDocument()
      expect(getByTestId('confirm-new-password-input')).toBeInTheDocument()
    })
  })

  test('does not call updateUser if passwords do not match', async () => {
    const { supabase } = await import('@/supabase')
    const user = userEvent.setup()

    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(getByTestId('new-password-input')).toBeInTheDocument()
    })

    const newPasswordInput = getByTestId('new-password-input')
    const confirmPasswordInput = getByTestId('confirm-new-password-input')
    const submitButton = getByRole('button', { name: /Submit/i })

    await user.type(newPasswordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentPassword')
    await user.click(submitButton)

    expect(supabase.auth.updateUser).not.toHaveBeenCalled()
  })

  test('calls updateUser and navigates when passwords match', async () => {
    // Spy on useNavigate to check navigation is triggered
    const user = userEvent.setup()

    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(getByTestId('new-password-input')).toBeInTheDocument()
    })

    const newPasswordInput = getByTestId('new-password-input')
    const confirmPasswordInput = getByTestId('confirm-new-password-input')
    const submitButton = getByRole('button', { name: /Submit/i })

    await user.type(newPasswordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(navigate).toHaveBeenCalled()
    })
  })
})
