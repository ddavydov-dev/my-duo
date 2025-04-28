import { useUser } from '@/entities/user'
import { useDeleteAccount } from '@/entities/user/model/useDeleteAccount'
import { Button } from '@/shared/ui/Button'
import { Page } from '@/widgets/Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent
})

function RouteComponent() {
  const { user, signOut } = useUser()

  return (
    <Page>
      <p>User: {JSON.stringify(user)}</p>
      <Button onClick={signOut}>Log out</Button>
      <DeleteAccount />
    </Page>
  )
}

function DeleteAccount() {
  const { handleDelete } = useDeleteAccount()

  return (
    <Button variant="primary-ghost" onClick={handleDelete}>
      Delete my account
    </Button>
  )
}
