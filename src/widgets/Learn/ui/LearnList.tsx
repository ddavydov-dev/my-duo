import { useRef, useState, useEffect, FC, useMemo } from 'react'
import styles from './LearnList.module.scss'
import { useSkills } from '@/entities/skill'
import { useUnits } from '@/entities/unit'
import { useLessons } from '@/entities/lesson'
import type { Lesson as LessonType } from '@/entities/lesson'
import { Icon } from '@/shared/ui/Icon'
import { getLessonPositions } from '../utils/getLessonPositions'

const UnitSection = ({ unit }: { unit: { id: string; title: string } }) => {
  const { lessons } = useLessons(unit.id)

  const lessonPositions = useMemo(() => getLessonPositions(lessons.length), [lessons.length])

  return (
    <div className={styles.UnitSection}>
      <header className={styles.UnitHeader}>
        <hr className={styles.Line} />
        <h2 className={styles.Title}>{unit.title}</h2>
        <hr className={styles.Line} />
      </header>

      <div className={styles.LessonGrid}>
        {lessons.map((lesson, index) => (
          <Lesson key={lesson.id} position={lessonPositions[index]} {...lesson} />
        ))}
      </div>
    </div>
  )
}

const Lesson: FC<LessonType & { position: number }> = ({ position }) => {
  return (
    <div className={styles.LessonContainer}>
      <button className={styles.LessonButton} style={{ left: position }}>
        <Icon name="lesson" className={styles.Icon} />
      </button>
    </div>
  )
}

export const LearnList = () => {
  const { activeSkill } = useSkills()
  const { units } = useUnits(activeSkill?.id || '')
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null)

  // scroll container + refs for each unit
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // on load, default to first unit
  useEffect(() => {
    if (units.length > 0) {
      setActiveUnitId(units[0].id)
    }
  }, [units])

  // Handle scroll and intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Find the entry that is most visible in the viewport
        const visibleEntries = entries.filter(entry => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most visible section
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.intersectionRatio > prev.intersectionRatio ? current : prev
          })

          const id = mostVisible.target.getAttribute('data-unit-id')
          if (id) {
            setActiveUnitId(id)
          }
        }
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Only consider the middle 50% of the viewport
        threshold: [0, 0.25, 0.5, 0.75, 1] // Multiple thresholds for better precision
      }
    )

    // Observe all sections
    units.forEach(unit => {
      const el = sectionRefs.current[unit.id]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [units])

  const activeUnit = units.find(u => u.id === activeUnitId)

  return (
    <div className={styles.LearnList}>
      {activeUnit && (
        <div className={styles.Sticky}>
          <div className={styles.Space} />
          <div className={styles.Content} style={{ backgroundColor: '#58cc02' }}>
            {activeUnit.title}
            <button className={styles.EditButton}>Edit</button>
          </div>
        </div>
      )}

      <div className={styles.ScrollArea}>
        {units.map(unit => (
          <div
            key={unit.id}
            data-unit-id={unit.id}
            ref={el => {
              sectionRefs.current[unit.id] = el
            }}
          >
            <UnitSection unit={unit} />
          </div>
        ))}
      </div>
    </div>
  )
}
