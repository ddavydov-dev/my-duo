import { useDeleteAccount } from '@/entities/user/model/useDeleteAccount'
import { Button } from '@/shared/ui/Button'
import { Page } from '@/widgets/Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent
})

function RouteComponent() {
  const { handleDelete } = useDeleteAccount()

  return (
    <Page>
      Hello "/profile/"!
      <Button variant="primary-ghost" onClick={handleDelete}>
        Delete my account
      </Button>
    </Page>
  )
}
