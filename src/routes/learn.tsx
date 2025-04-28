import { LearnList } from '@/widgets/Learn'
import { Page } from '@/widgets/Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/learn')({
  component: Learn
})

function Learn() {
  return (
    <Page>
      <section style={{ maxWidth: 1056, width: '100%', paddingTop: 24, margin: '0 auto' }}>
        <div style={{ padding: '0 24px 24px', display: 'flex', gap: 48 }}>
          <LearnList />
          <Sidebar />
        </div>
      </section>
    </Page>
  )
}

function Sidebar() {
  return (
    <section style={{ width: 368 }}>
      {/* <Menu userData={{ streak: 1, wasToday: true }} languages={[]} onOverlay={() => {}} />
      <p>User: {JSON.stringify(user)}</p>
      <Button onClick={signOut}>Log out</Button> */}
    </section>
  )
}
