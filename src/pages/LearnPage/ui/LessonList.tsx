import styles from './LearnList.module.scss'
import { UNIT_STYLE_COLORS } from '@/entities/unit/config/types'
import { useSkillUnits } from '../model/useSkillUnits'
import { useScrollLessons } from '../model/useScrollLessons'
import { Unit } from './Unit'

export const LessonList = () => {
  const { units, activeUnit, setActiveUnitId } = useSkillUnits()

  const sectionRefs = useScrollLessons(units, setActiveUnitId, activeUnit)

  if (!activeUnit) return <div>No units for this skill. Please create your first unit</div>

  return (
    <div className={styles.LearnList}>
      <div className={styles.Sticky}>
        <div className={styles.Space} />
        <div
          className={styles.Content}
          style={{ backgroundColor: UNIT_STYLE_COLORS[activeUnit.style] }}
        >
          {activeUnit.title}
          <button className={styles.EditButton}>Edit</button>
        </div>
      </div>

      <div className={styles.ScrollArea}>
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
