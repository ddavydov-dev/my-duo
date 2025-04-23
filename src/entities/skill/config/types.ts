import { Unit } from '@/entities/unit'

export interface Skill {
  id: string
  createdAt: string
  isActive: boolean
  title: string
  userId: string
  isPublic: boolean
  units: Unit[]
}
