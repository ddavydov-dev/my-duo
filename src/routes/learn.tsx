import { LearnPage } from '@/pages/LearnPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/learn')({
  component: LearnPage
})
