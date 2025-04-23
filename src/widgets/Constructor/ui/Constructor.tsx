import { createContext, FC, ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Editor } from './Editor'

export const ConstructorContext = createContext<{
  lessonId: string | null
  setLessonId: (newLessonId: string) => void
}>({ lessonId: null, setLessonId: () => {} })

export const ConstructorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lessonId, setLessonId] = useState<string | null>(null)

  return (
    <ConstructorContext.Provider value={{ lessonId, setLessonId }}>
      {children}
    </ConstructorContext.Provider>
  )
}

export const Constructor = () => {
  return (
    <ConstructorProvider>
      <Sidebar />

      <Editor />
    </ConstructorProvider>
  )
}
