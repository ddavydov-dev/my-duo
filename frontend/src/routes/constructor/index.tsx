import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constructor/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/constructor/"!</div>
}
