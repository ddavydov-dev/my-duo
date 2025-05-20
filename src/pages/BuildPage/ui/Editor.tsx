import { Exercise } from '@/entities/exercise/ui/Exercise'
import { QuestionAnswer } from '@/entities/exercise/ui/QuestionAnswer'
import { useCallback, useMemo, useState } from 'react'
import { useExercises } from '@/entities/exercise'
import { Button } from '@/shared/ui/Button'
import { useAtom } from 'jotai'
import { activeLessonIdAtom } from '../model/atoms'

export const Editor = () => {
  const [lessonId] = useAtom(activeLessonIdAtom)

  const {
    data: exercises,
    create: createExercise,
    update: updateExercise,
    remove: removeExercise
  } = useExercises(lessonId || '')
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null)

  const addExercise = useCallback(() => {
    createExercise({
      prompt: '',
      answer: '',
      lessonId: lessonId ?? '',
      order: exercises.length
    })
  }, [lessonId, createExercise, exercises.length])

  const activeExercise = useMemo(
    () => exercises.find(e => e.id === activeExerciseId),
    [exercises, activeExerciseId]
  )

  const handleDelete = useCallback(() => {
    if (activeExerciseId) {
      removeExercise(activeExerciseId)
    }
  }, [activeExerciseId, removeExercise])

  if (!lessonId) return <div>No lesson id</div>

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
        height: '100vh',
        position: 'relative'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 20,
          height: 120,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '2px solid #E5E5E5',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {exercises.map((exercise, index) => (
          <Button
            key={exercise.id}
            onClick={() => setActiveExerciseId(exercise.id)}
            style={{
              height: 40,
              width: 49,
              border: `2px solid ${exercise.id === activeExerciseId ? '#0097DC' : '#AFAFAF'}`,
              backgroundColor: exercise.id === activeExerciseId ? '#D9F4FF' : 'inherit',
              color: exercise.id === activeExerciseId ? '#0097DC' : '#4B4B4B',
              textTransform: 'initial'
            }}
            variant="ghost"
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={addExercise}
          variant="ghost"
          style={{ border: '2px solid #58CC02', height: 40, width: 49, color: '#58CC02' }}
        >
          +
        </Button>
      </div>

      {activeExercise ? (
        <Exercise title="Answer the question">
          <QuestionAnswer
            key={activeExercise.id}
            question={activeExercise.prompt}
            onQuestionChange={(newPrompt: string) => {
              const newExercise = { ...activeExercise, prompt: newPrompt }
              updateExercise({ ...newExercise })
            }}
            answer={activeExercise.answer}
            onAnswerChange={(newAnswer: string) => {
              const newExercise = { ...activeExercise, answer: newAnswer }
              updateExercise({ ...newExercise })
            }}
            isEditing
          />
        </Exercise>
      ) : (
        'Choose exercise type'
      )}

      <div>
        <h2>Controls</h2>
        <div className="flex">
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  )
}
