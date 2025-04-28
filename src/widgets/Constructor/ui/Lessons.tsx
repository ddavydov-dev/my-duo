import { useLessons } from '@/entities/lesson'
import { Button } from '@/shared/ui/Button'
import { FC, useCallback, useContext } from 'react'
import { ConstructorContext } from './Constructor'
import { Options } from './Options'
// import { OptionsButton } from './Options'

interface LessonsProps {
  unitId: string
}

export const Lessons: FC<LessonsProps> = ({ unitId }) => {
  const { lessonId, setLessonId } = useContext(ConstructorContext)
  const { lessons, create, remove } = useLessons(unitId)

  const addLesson = useCallback(() => {
    create({
      title: `Lesson ${lessons.length + 1}`,
      unitId,
      order: lessons.length
    }).then(item => {
      if (!lessonId && item) setLessonId(item.id)
    })
  }, [unitId, create, lessons.length, lessonId, setLessonId])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 0 12px',
        padding: '0 12px 0 8px'
      }}
    >
      {lessons.map(lesson => (
        <Lesson key={lesson.id} {...lesson} onRemove={() => remove(lesson.id)} />
      ))}

      <Button
        onClick={addLesson}
        variant="ghost"
        style={{
          height: 33,
          justifyContent: 'flex-start',
          textTransform: 'initial',
          letterSpacing: 0
        }}
        isFullWidth
        icon="plus"
      >
        Add a new lesson
      </Button>
    </div>
  )
}

const Lesson: FC<{ id: string; title: string; onRemove: VoidFunction }> = ({
  id,
  title,
  onRemove
}) => {
  const { lessonId, setLessonId } = useContext(ConstructorContext)
  // const [showModal, setShowModal] = useState<[number, number] | null>(null)

  // const lessonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      {/* <Button
        onClick={() => setLessonId(id)}
        style={{
          height: 33,
          color: id === lessonId ? '#0097DC' : '#4B4B4B',
          backgroundColor: id === lessonId ? '#D9F4FF' : 'inherit',
          justifyContent: 'flex-start',
          textTransform: 'initial'
        }}
        isFullWidth
        variant="ghost"
        
      >
        {title}
      </Button> */}
      <Options
        menu={
          <Button variant="ghost" onClick={onRemove}>
            Delete
          </Button>
        }
        children={() => (
          <Button
            onClick={() => setLessonId(id)}
            style={{
              height: 33,
              color: id === lessonId ? '#0097DC' : '#4B4B4B',
              backgroundColor: id === lessonId ? '#D9F4FF' : 'inherit',
              justifyContent: 'flex-start',
              textTransform: 'initial'
            }}
            isFullWidth
            variant="ghost"
          >
            {title}
          </Button>
        )}
      />
    </>
  )
}
