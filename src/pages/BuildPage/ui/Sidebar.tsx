import { Units } from './Units'
import { useActiveSkill } from '../model/useActiveSkill'
import { useUnits } from '@/entities/unit'
import { Skill } from '@/entities/skill'
import { useAtom } from 'jotai'
import { activeUnitIdAtom } from '../model/atoms'
import Icon from '@/shared/ui/Icon'
import SkillBlock from '@/widgets/SkillBlock'

export const Sidebar = () => {
  const { activeSkill } = useActiveSkill()

  if (!activeSkill) {
    return <div>Add your first skill</div>
  }

  return (
    <aside className="min-w-56 h-screen border-r border-swan px-[20px] pr-[20px] pl-6 py-6 flex flex-col gap-8">
      <SkillBlock1 skill={activeSkill} />

      <Units skillId={activeSkill.id} />
    </aside>
  )
}

function SkillBlock1({ skill }: { skill: Skill }) {
  const [, setActiveUnitId] = useAtom(activeUnitIdAtom)
  const { data: units = [], create } = useUnits(skill.id)

  const addUnit = () =>
    create({
      title: `Unit ${units.length + 1}`,
      skillId: skill.id,
      order: units.length,
      style: 'fox'
    }).then(({ id }) => setActiveUnitId(id))

  return (
    <div className="pr-2 relative flex justify-between items-center">
      <SkillBlock />

      <button
        onClick={addUnit}
        className="relative grid place-content-center w-6 h-6 rounded hover:bg-gray-200 transition group cursor-pointer"
      >
        <Icon name="plus" />
        <span className="absolute left-full ml-2 top-1/2 whitespace-nowrap text-xs rounded px-2 py-1 bg-gray-700 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition pointer-events-none">
          Add unit
        </span>
      </button>
    </div>
  )
}
