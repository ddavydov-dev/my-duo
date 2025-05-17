import { useEntity } from '@/shared/useEntity'

export interface CreateSkillArgs {
  title: string
  isPublic?: boolean
  userId?: string
}

export const useSkills = () => useEntity('skills')
