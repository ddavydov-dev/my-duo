import { useLessons } from '@/entities/lesson'
import { Button } from '@/shared/ui/Button'
import { FC, useCallback, useContext } from 'react'
import { ConstructorContext } from './Constructor'

interface LessonsProps {
  unitId: string | null
}

export const Lessons: FC<LessonsProps> = ({ unitId }) => {
  const { lessonId, setLessonId } = useContext(ConstructorContext)
  const { lessons, create: createLesson } = useLessons(unitId || '')

  const addLesson = useCallback(() => {
    createLesson({
      title: `Lesson ${lessons.length + 1}`,
      unitId: lessonId ?? '',
      order: lessons.length
    })
  }, [lessonId, createLesson, lessons.length])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '12px 0',
        padding: '0 12px 0 8px'
      }}
    >
      {lessons.map(lesson => (
        <Button
          onClick={() => setLessonId(lesson.id)}
          style={{
            height: 33,
            color: lesson.id === lessonId ? '#0097DC' : '#4B4B4B',
            backgroundColor: lesson.id === lessonId ? '#D9F4FF' : 'inherit',
            justifyContent: 'flex-start',
            textTransform: 'initial'
          }}
          key={lesson.id}
          isFullWidth
          variant="ghost"
        >
          {lesson.title}
        </Button>
      ))}

      <Button
        onClick={addLesson}
        variant="ghost"
        style={{ height: 33, justifyContent: 'flex-start', textTransform: 'initial' }}
        isFullWidth
      >
        Add a new lesson
      </Button>
    </div>
  )
}
