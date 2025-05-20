import { useSkills } from '@/entities/skill'
import { useMemo } from 'react'

export const useActiveSkill = () => {
  const { data: skills, ...rest } = useSkills()

  const activeSkill = useMemo(() => skills.find(s => s.isActive), [skills])

  return { activeSkill, ...rest }
}
