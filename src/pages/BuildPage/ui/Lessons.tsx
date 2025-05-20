import { useLessons } from '@/entities/lesson'
import { Button } from '@/shared/ui/Button'
import { FC } from 'react'
// import { BuildPageContext } from './BuildPage'
import { activeLessonIdAtom, activeUnitIdAtom } from '../model/atoms'
import { useAtom } from 'jotai'
import clsx from 'clsx'
import { ActionGroup } from './ActionGroup'

export default function Lessons() {
  const [activeUnitId] = useAtom(activeUnitIdAtom)
  const { data: lessons, remove } = useLessons(activeUnitId!) // TODO: fix this

  return (
    <div className="mb-3 flex flex-col gap-1 px-3">
      {lessons.map(lesson => (
        <LessonItem key={lesson.id} onRemove={() => remove(lesson.id)} {...lesson} />
      ))}
    </div>
  )
}

// const Lesson: FC<{
//   id: string
//   title: string
//   onRemove: VoidFunction
// }> = ({ id, title, onRemove }) => {
//   const [activeLessonId, setActiveLessonId] = useAtom(activeLessonIdAtom)

//   return (
//     <>
//       <Options
//         menu={
//           <Button variant="ghost" onClick={onRemove}>
//             Delete
//           </Button>
//         }
//         children={() => (
//           <Button
//             onClick={() => setActiveLessonId(id)}
//             style={{
//               height: 33,
//               color: id === activeLessonId ? '#0097DC' : '#4B4B4B',
//               backgroundColor: id === activeLessonId ? '#D9F4FF' : 'inherit',
//               justifyContent: 'flex-start',
//               textTransform: 'initial'
//             }}
//             isFullWidth
//             variant="ghost"
//           >
//             {title}
//           </Button>
//         )}
//       />
//     </>
//   )
// }

// const LessonItem: FC<{ id: string; title: string }> = ({ id, title }) => {
//   const [activeId, setActive] = useAtom(activeLessonIdAtom)

//   return (
//     <Button
//       variant="ghost"
//       isFullWidth
//       onClick={() => setActive(id)}
//       className={clsx(
//         'h-8 justify-start text-left',
//         activeId === id
//           ? 'bg-sky-100 text-sky-700 hover:bg-sky-100'
//           : 'text-neutral-700 hover:bg-neutral-50'
//       )}
//     >
//       {title}
//     </Button>
//   )
// }

interface Props {
  id: string
  title: string
  onRemove: VoidFunction
}

const LessonItem: FC<Props> = ({ id, title, onRemove }) => {
  const [activeId, setActive] = useAtom(activeLessonIdAtom)
  const isActive = id === activeId

  return (
    <div
      className={clsx(
        'relative w-full rounded-lg transition-colors group/header',
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
    </div>
  )
}
