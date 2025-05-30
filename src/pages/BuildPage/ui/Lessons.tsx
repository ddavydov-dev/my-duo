import { useLessons } from '@/entities/lesson'
import { Button } from '@/shared/ui/Button'
import { FC, useEffect } from 'react'
// import { BuildPageContext } from './BuildPage'
import { activeLessonIdAtom, activeUnitIdAtom } from '../model/atoms'
import { useAtom } from 'jotai'
import clsx from 'clsx'
import { ActionGroup } from './ActionGroup'

export default function Lessons() {
  const [activeUnitId] = useAtom(activeUnitIdAtom)
  const { data: lessons, remove } = useLessons(activeUnitId!) // TODO: fix this
  const [activeLessonId, setActiveLessonId] = useAtom(activeLessonIdAtom)

  useEffect(() => {
    if (lessons.length > 0 && !activeLessonId) {
      setActiveLessonId(lessons[0].id)
    }
  }, [activeLessonId, setActiveLessonId, lessons])

  return (
    <div className="mb-3 flex flex-col gap-1 px-3">
      {lessons.map(lesson => (
        <LessonItem key={lesson.id} onRemove={() => remove(lesson.id)} {...lesson} />
      ))}
    </div>
  )
}

interface LessonProps {
  id: string
  title: string
  onRemove: VoidFunction
}

const LessonItem: FC<LessonProps> = ({ id, title, onRemove }) => {
  const [activeId, setActive] = useAtom(activeLessonIdAtom)
  const isActive = id === activeId

  return (
    <button
      className={clsx(
        'relative w-full rounded-lg transition-colors group/header cursor-pointer',
        isActive ? 'bg-iguana' : 'bg-white hover:bg-polar'
      )}
      onClick={() => setActive(id)}
    >
      <div className="flex items-center gap-2 py-3 px-2">
        <span
          className={clsx(
            'font-semibold text-base truncate',
            isActive ? 'text-active-menu' : 'text-hare'
          )}
        >
          {title}
        </span>
      </div>

      <ActionGroup
        actions={[
          {
            icon: 'settings',
            tooltip: 'Options',
            menu: (
              <div className="flex flex-col gap-2 p-2">
                <Button variant="ghost" onClick={onRemove}>
                  Delete
                </Button>
              </div>
            )
          }
        ]}
      />
    </button>
  )
}
