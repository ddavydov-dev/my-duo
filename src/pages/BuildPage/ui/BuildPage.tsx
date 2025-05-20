import { Sidebar } from './Sidebar'
import { Editor } from './Editor'
import { Page } from '@/widgets/Page'
import { useActiveSkill } from '../model/useActiveSkill'

export const BuildPage = () => {
  const {
    activeSkill
    // isLoading
  } = useActiveSkill()

  if (!activeSkill) {
    return <div>No skills yet</div>
  }

  return (
    <Page isNavClosed>
      <Sidebar />
      <Editor />
    </Page>
  )
}
