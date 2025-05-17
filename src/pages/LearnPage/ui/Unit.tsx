import { useLessons } from '@/entities/lesson'
import { useMemo } from 'react'
import { Unit as UnitType } from '@/entities/unit/config/types'
import { LessonItem } from './LessonItem'
import styles from './LearnList.module.scss'
import { getLessonPositions } from '../utils/getLessonPositions'

export const Unit = ({
  unit,
  initialDirection,
  isFirst
}: {
  unit: UnitType
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
        {lessons.map((lesson, index) => {
          const firstUncompletedIdx = lessons.findIndex(l => !l.isCompleted)

          return (
            <LessonItem
              key={lesson.id}
              position={lessonPositions[index]}
              {...lesson}
              unitStyle={unit.style}
              isFirstUncompleted={index === firstUncompletedIdx}
            />
          )
        })}
      </div>
    </div>
  )
}
