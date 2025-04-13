import { Page } from '@/widgets/Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constructor')({
  component: RouteComponent
})

function RouteComponent() {
  return <Page>Hello "/constructor/"!</Page>
}
