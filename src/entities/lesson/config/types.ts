export interface Lesson {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  stepIds: string[]
  lessonsAmount: number
  currentLesson: number
  level: number
  projectId: string
  lineNumber: number // TODO: we might contain a sequence of lessons inside a project so we don't need to know the number
}
