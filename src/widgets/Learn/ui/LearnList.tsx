import { useRef, useState, useEffect, FC, useMemo } from 'react'
import styles from './LearnList.module.scss'
import { useSkills } from '@/entities/skill'
import { useUnits } from '@/entities/unit'
import { useLessons } from '@/entities/lesson'
import type { Lesson as LessonType } from '@/entities/lesson'
import { Icon } from '@/shared/ui/Icon'
import { getLessonPositions } from '../utils/getLessonPositions'
import { useNavigate } from '@tanstack/react-router'
import { Unit, UNIT_STYLE_COLORS, UnitStyle } from '@/entities/unit/config/types'
import classNames from 'classnames'

const UnitSection = ({
  unit,
  initialDirection,
  isFirst
}: {
  unit: Unit
  initialDirection: number
  isFirst: boolean
}) => {
  const { data: lessons } = useLessons(unit.id)

  const lessonPositions = useMemo(
    () => getLessonPositions(lessons.length, { initialDirection }),
    [lessons.length, initialDirection]
  )

  return (
    <div className={styles.UnitSection}>
      {!isFirst ? (
        <header className={styles.UnitHeader}>
          <hr className={styles.Line} />
          <h2 className={styles.Title}>{unit.title}</h2>
          <hr className={styles.Line} />
        </header>
      ) : null}

      <div className={styles.LessonGrid}>
        {lessons.map((lesson, index) => (
          <Lesson
            key={lesson.id}
            position={lessonPositions[index]}
            {...lesson}
            unitStyle={unit.style}
          />
        ))}
      </div>
    </div>
  )
}

const Lesson: FC<LessonType & { position: number; unitStyle: UnitStyle }> = ({
  position,
  id,
  unitStyle,
  isCompleted
}) => {
  const navigate = useNavigate({ from: '/lesson' })
  return (
    <div className={styles.LessonContainer}>
      <button
        className={styles.LessonButton}
        style={
          {
            left: position,
            '--unit-color': isCompleted ? UNIT_STYLE_COLORS[unitStyle] : '#e5e5e5'
          } as React.CSSProperties
        }
        onClick={() => {
          localStorage.setItem('activeLessonId', id)
          navigate({ to: `/lesson` })
        }}
      >
        <Icon
          name="lesson"
          className={classNames(styles.Icon, { [styles.isCompleted]: isCompleted })}
        />
      </button>
    </div>
  )
}

export const LearnList = () => {
  const { data: skills } = useSkills()
  const activeSkill = useMemo(() => skills.find(s => s.isActive), [skills])
  const { data: units } = useUnits(activeSkill?.id || '')
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
          <div
            className={styles.Content}
            style={{ backgroundColor: UNIT_STYLE_COLORS[activeUnit.style] }}
          >
            {activeUnit.title}
            <button className={styles.EditButton}>Edit</button>
          </div>
        </div>
      )}

      <div className={styles.ScrollArea}>
        {units.map((unit, idx) => (
          <div
            key={unit.id}
            data-unit-id={unit.id}
            ref={el => {
              sectionRefs.current[unit.id] = el
            }}
          >
            <UnitSection
              unit={unit}
              initialDirection={idx % 2 === 1 ? -1 : 1}
              isFirst={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
