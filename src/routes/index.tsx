import { Welcome } from '@/widgets/Welcome'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  const data = localStorage.getItem('offline_skills')
  const navigate = useNavigate()

  if (!data) return <Welcome />

  navigate({ to: '/learn' })
}
