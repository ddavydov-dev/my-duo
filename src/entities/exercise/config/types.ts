export interface Exercise {
  id: string
  lessonId: string
  type: 'question_answer' // TODO
  prompt: string
  answer: string
  metadata?: unknown
  order: number
}
