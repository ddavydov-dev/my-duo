import { render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'

const mockGetSession = vi.fn()
const mockRefreshSession = vi.fn()

vi.mock('@/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      refreshSession: () => mockRefreshSession(),
      signOut: vi.fn()
    }
  }
}))

describe('AuthProvider', () => {
  beforeEach(() => {
    mockGetSession.mockReset()
    mockRefreshSession.mockReset()
  })

  test('renders Auth component when no session exists', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } })
    mockRefreshSession.mockResolvedValue({ data: { session: null } })
    const { getAllByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthProvider>
          <div>Child Content</div>
        </AuthProvider>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(getAllByText(/log in/i)).toHaveLength(2)
      expect(getByTestId('email-input')).toBeInTheDocument()
      expect(getByTestId('password-input')).toBeInTheDocument()
    })
  })

  test('renders children when session exists', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { user: { id: '123' } } } })
    mockRefreshSession.mockResolvedValue({ data: { session: { user: { id: '123' } } } })
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthProvider>
          <div data-test="child-content">Child Content</div>
        </AuthProvider>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(getByTestId('child-content')).toBeInTheDocument()
    })
  })
})
