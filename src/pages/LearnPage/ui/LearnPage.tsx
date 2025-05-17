import { Page } from '@/widgets/Page'
import { Sidebar } from './Sidebar'
import { LessonList } from './LessonList'

export const LearnPage = () => {
  return (
    <Page>
      <section className="w-full max-w-[1056px] p-6 flex gap-12 mx-auto">
        <LessonList />

        <Sidebar />
      </section>
    </Page>
  )
}
