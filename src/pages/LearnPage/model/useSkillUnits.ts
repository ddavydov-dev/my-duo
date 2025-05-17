import { useSkills } from '@/entities/skill'
import { useUnits } from '@/entities/unit'
import { useEffect, useMemo, useState } from 'react'

export const useSkillUnits = () => {
  const { data: skills } = useSkills()
  const activeSkill = useMemo(() => skills.find(s => s.isActive), [skills])
  const { data: units, ...rest } = useUnits(activeSkill?.id || '')
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null)

  useEffect(() => {
    if (units.length > 0) {
      setActiveUnitId(units[0].id)
    }
  }, [units])

  const activeUnit = useMemo(() => units.find(u => u.id === activeUnitId), [activeUnitId, units])

  return { units, activeUnit, setActiveUnitId, ...rest }
}
