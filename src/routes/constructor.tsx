import { BuildPage } from '@/pages/BuildPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constructor')({
  component: BuildPage
})
