import { Constructor } from '@/widgets/Constructor'
import { Page } from '@/widgets/Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constructor')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Page isNavClosed>
      {/* <section style={{ maxWidth: 1056, width: '100%', paddingTop: 24, margin: '0 auto' }}> */}
      {/* <div style={{ padding: '0 24px 24px', display: 'flex', gap: 48 }}> */}
      <Constructor />
      {/* </div>
      </section> */}
    </Page>
  )
}
