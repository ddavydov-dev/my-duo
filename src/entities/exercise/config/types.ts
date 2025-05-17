export type ExerciseType = 'question_answer' | 'variants' | 'insert_value'

export interface Exercise {
  id: string
  lessonId: string
  type: ExerciseType
  prompt: string
  answer: string
  metadata?: unknown
  order: number
}
