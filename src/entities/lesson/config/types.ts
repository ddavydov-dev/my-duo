import { Exercise } from '@/entities/exercise'

export interface Lesson {
  id: string
  unitId: string
  title: string
  order: number
  exercises: Exercise[]
  isCompleted: boolean
}
