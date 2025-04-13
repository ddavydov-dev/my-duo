import { test, expect } from '@playwright/test'

const testUser = {
  email: 'testusefk9ejwduhuew@mail.ru',
  password: 'password123'
}

test.describe('Authentication E2E Tests', () => {
  test('Sign up with new credentials', async ({ page }) => {
    // Navigate to the auth page
    await page.goto('http://localhost:5173')

    await page.click('button:has-text("I ALREADY HAVE AN ACCOUNT")')

    // Toggle to the sign up screen (assumed via a toggle button)
    await page.click('button:has-text("Sign up")')

    // Verify that the sign up form fields are visible
    await expect(page.getByPlaceholder('Name (optional)')).toBeVisible()
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()

    // Fill in sign up form fields
    await page.fill('input[name="name"]', 'New User')
    await page.fill('input[name="email"]', testUser.email)
    await page.fill('input[name="password"]', testUser.password)

    // Submit the form
    await page.click('button[type="submit"]')

    // Verify that after sign up the user is logged in (e.g. Sign Out button is visible)
    await expect(page.locator('text=Log out')).toBeVisible()
  })

  test('Login with valid credentials', async ({ page }) => {
    // Navigate to the auth page
    await page.goto('http://localhost:5173')

    await page.click('button:has-text("I ALREADY HAVE AN ACCOUNT")')

    // Ensure the login form is visible
    await expect(page.getByPlaceholder('Email or username')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()

    // Fill in login form
    await page.fill('input[name="email"]', testUser.email)
    await page.fill('input[name="password"]', testUser.password)

    // Submit the form
    await page.click('button[type="submit"]')

    // Verify that a Sign Out button (or any indicator of a logged in user) is visible
    await expect(page.locator('text=Log out')).toBeVisible()
  })

  test('Forgot Password flow', async ({ page }) => {
    // Navigate to the auth page
    await page.goto('http://localhost:5173')

    // Click the forgot password button/link (using the label text "FORGOT?")
    await page.click('button:has-text("FORGOT?")')

    // Verify that the forgot password form appears
    await expect(page.locator('text=Forgot password')).toBeVisible()

    // Fill in the email field for password reset
    await page.fill('input[name="email"]', testUser.email)

    // Submit the forgot password form
    await page.click('button[type="submit"]')

    // Verify that a thank you message appears indicating instructions were sent
    await expect(page.locator('text=Thank you')).toBeVisible()
  })

  test('Forgot Password flow with unused email shows error', async ({ page }) => {
    await page.goto(`http://localhost:5173`)
    await page.click('button:has-text("FORGOT?")')
    await expect(page.locator('text=Forgot password')).toBeVisible()

    // Use an email that is not registered
    await page.fill('input[name="email"]', 'unused@example.com')
    await page.click('button[type="submit"]')

    // Verify that an error message (e.g., "Account not found") is displayed
    // const errorLocator = page.locator('text=Account not found')
    await expect(page.locator('text=Account not found')).toBeVisible()
  })

  test('Logout after login', async ({ page }) => {
    // Navigate to the auth page
    await page.goto('http://localhost:5173')

    // Log in with valid credentials
    await page.fill('input[name="email"]', testUser.email)
    await page.fill('input[name="password"]', testUser.password)
    await page.click('button[type="submit"]')

    // Wait for the Sign Out button to appear (indicating a successful login)
    await expect(page.locator('text=Log Out')).toBeVisible()

    // Click the Sign Out button
    await page.click('text=Log out')

    // Verify that the login form is visible again (user is logged out)
    await expect(page.getByPlaceholder('Email or username')).toBeVisible()
  })
})
