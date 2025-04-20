import { Lesson } from '../../lesson'

export interface Project {
  id: string
  isActive: boolean
  userId: string
  title: string
  lessons: Lesson[]
}
