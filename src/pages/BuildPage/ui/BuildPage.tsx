import { createContext, FC, ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Editor } from './Editor'
import { Page } from '@/widgets/Page'

export const BuildPageContext = createContext<{
  lessonId: string | null
  setLessonId: (newLessonId: string) => void
}>({ lessonId: null, setLessonId: () => {} })

export const BuildPageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lessonId, setLessonId] = useState<string | null>(null)

  return (
    <BuildPageContext.Provider value={{ lessonId, setLessonId }}>
      {children}
    </BuildPageContext.Provider>
  )
}

export const BuildPage = () => {
  return (
    <Page isNavClosed>
      <BuildPageProvider>
        <Sidebar />

        <Editor />
      </BuildPageProvider>
    </Page>
  )
}
