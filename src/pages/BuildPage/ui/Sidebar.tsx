import { Units } from './Units'
import { useActiveSkill } from '../model/useActiveSkill'

export const Sidebar = () => {
  const { activeSkill } = useActiveSkill()
  // const activeSkill = useMemo(() => skills.find(s => s.isActive), [skills])

  if (!activeSkill) {
    return <div>Add your first skill</div>
  }

  return (
    <aside className="min-w-56 h-screen border-r border-swan px-[20px] pr-[20px] pl-6 py-[32px]">
      {/* TODO: Skills component */}
      <h1 className="mb-6">{activeSkill.title}</h1>

      <Units skillId={activeSkill.id} />
    </aside>
  )
}
