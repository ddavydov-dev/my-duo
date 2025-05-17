import { useSkills } from '@/entities/skill'
import { Units } from './Units'
import { useMemo } from 'react'

export const Sidebar = () => {
  const { data: skills } = useSkills()
  const activeSkill = useMemo(() => skills.find(s => s.isActive), [skills])

  return (
    <div
      style={{
        minWidth: 225,
        borderRight: '1px solid #E0E0E0',
        height: '100vh',
        padding: '32px 20px 32px 24px'
      }}
    >
      <h1 style={{ marginBottom: 24 }}>{activeSkill?.title}</h1>

      {/* <h2>Units</h2> */}
      <Units skillId={activeSkill?.id} />
    </div>
  )
}
