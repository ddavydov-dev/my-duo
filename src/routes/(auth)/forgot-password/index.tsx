import { ForgotPassword } from '@/entities/user/ui/ForgotPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password/')({
  component: RouteComponent
})

function RouteComponent() {
  return <ForgotPassword />
}
