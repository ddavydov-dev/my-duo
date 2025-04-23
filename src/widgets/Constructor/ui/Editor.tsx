import { Exercise } from '@/entities/exercise/ui/Exercise'
import { QuestionAnswer } from '@/entities/exercise/ui/QuestionAnswer'
import { useCallback, useContext, useMemo } from 'react'
import { ConstructorContext } from './Constructor'
import { useExercises } from '@/entities/exercise'
import { Button } from '@/shared/ui/Button'

export const Editor = () => {
  const { lessonId } = useContext(ConstructorContext)
  const {
    exercises,
    activeExerciseId,
    setActiveExerciseId,
    create: createExercise,
    update: updateExercise
  } = useExercises(lessonId || '')

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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        width: '100%',
        height: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 20,
          height: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '2px solid #E5E5E5'
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
          />
        </Exercise>
      ) : (
        'Choose exercise type'
      )}
    </div>
  )
}
