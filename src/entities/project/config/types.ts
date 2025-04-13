import { Lesson } from '../../lesson'
import { Step } from '../../step'

export interface Project {
  id: string
  isActive: boolean
  userId: string
  title: string
  lessons: Lesson[]
  steps: Step[]
}
