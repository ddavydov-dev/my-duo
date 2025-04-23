import { Lesson } from '@/entities/lesson'

export interface Unit {
  id: string
  skillId: string
  title: string
  order: number
  lessons: Lesson[]
}
