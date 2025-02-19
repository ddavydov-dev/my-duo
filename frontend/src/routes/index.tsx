import { Welcome } from '@/widgets/Welcome'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  const data = localStorage.getItem('data')
  const navigate = useNavigate()

  if (data) {
    navigate({ to: '/learn' })
  }

  if (!data) return <Welcome />

  return <div></div>
}
