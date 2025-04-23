import { useSkills } from '@/entities/skill'
import { Units } from './Units'

export const Sidebar = () => {
  const { activeSkill } = useSkills()

  return (
    <div
      style={{
        width: 300,
        borderRight: '1px solid #E0E0E0',
        height: '100vh',
        padding: '32px 24px'
      }}
    >
      <h1 style={{ marginBottom: 24 }}>{activeSkill?.title}</h1>

      {/* <h2>Units</h2> */}
      <Units skillId={activeSkill?.id} />
    </div>
  )
}
