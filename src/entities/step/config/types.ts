export interface Step {
  id: string
  createdAt: string
  updatedAt: string
  stepType: string
  answer: string
  parentLessonId: string
  languageId?: string
  options?: string
}
