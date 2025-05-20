import { UNIT_STYLE_COLORS } from '@/entities/unit/config/types'
import { useSkillUnits } from '../model/useSkillUnits'
import { useScrollLessons } from '../model/useScrollLessons'
import { Unit } from './Unit'
import { Button } from '@/shared/ui/Button'

export const LessonList = () => {
  const { units, activeUnit, setActiveUnitId, isLoading } = useSkillUnits()

  const sectionRefs = useScrollLessons(units, setActiveUnitId, activeUnit)

  if (isLoading) return null
  if (!activeUnit) return <div>No units for this skill. Please create your first unit</div>

  return (
    <div className="flex flex-col flex-1 h-full bg-white">
      <div className="sticky top-0 bg-white z-10">
        <div className="h-0 md:h-6" />
        <div
          className="flex justify-between items-center h-[90px] text-white text-[22px] font-bold rounded-xl overflow-hidden px-4"
          style={{ backgroundColor: UNIT_STYLE_COLORS[activeUnit.style] }}
        >
          <div>
            <h2>Unit {1}</h2>
            <h2>{activeUnit.title}</h2>
          </div>
          <Button icon="edit">Edit</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {units.map((unit, idx) => (
          <div
            key={unit.id}
            data-unit-id={unit.id}
            ref={el => {
              sectionRefs.current[unit.id] = el
            }}
          >
            <Unit unit={unit} initialDirection={idx % 2 === 1 ? -1 : 1} isFirst={idx === 0} />
          </div>
        ))}
      </div>
    </div>
  )
}
