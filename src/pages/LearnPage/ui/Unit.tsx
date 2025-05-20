import { useLessons } from '@/entities/lesson'
import { useMemo } from 'react'
import { Unit as UnitType } from '@/entities/unit/config/types'
import { LessonItem } from './LessonItem'
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
    <section className={`${!isFirst ? 'mt-8' : ''}`}>
      {!isFirst && (
        <header className="flex items-center mt-2 mb-2">
          <hr className="flex-grow basis-12 h-0 border-t-2 border-swan my-10" />
          <h2 className="mx-4 text-center text-[19px] leading-[26.6px] text-hare">
            {unit.title}
          </h2>
          <hr className="flex-grow basis-12 h-0 border-t-2 border-swan my-10" />
        </header>
      )}

      <div className="flex flex-col gap-[20px] my-8 px-6">
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
    </section>
  )
}
