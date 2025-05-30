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

  if (!activeExercise)
    return (
      <div className="flex justify-center items-center flex-col h-full w-full pt-20">
        <h2 className="mb-12">Choose your exercise type</h2>

        <div className="flex flex-wrap mx-auto">
          <button
            style={{
              borderRadius: '16px',
              borderStyle: 'solid',
              borderWidth: '2px 2px 4px',
              cursor: 'pointer',
              display: 'inline-block',
              flex: '1 1 auto',
              margin: '12px',
              maxWidth: '240px',
              minHeight: '217px',
              minWidth: '200px',
              padding: '12px 12px 24px',
              textAlign: 'center'
            }}
          >
            <div className="h-20 mt-8"></div>
            <h2 className="mt-6">Question&Answer</h2>
          </button>
          <button
            style={{
              borderRadius: '16px',
              borderStyle: 'solid',
              borderWidth: '2px 2px 4px',
              cursor: 'pointer',
              display: 'inline-block',
              flex: '1 1 auto',
              margin: '12px',
              maxWidth: '240px',
              minHeight: '217px',
              minWidth: '200px',
              padding: '12px 12px 24px',
              textAlign: 'center'
            }}
          >
            <div className="h-20 mt-8"></div>
            <h2 className="mt-6">Insert words</h2>
          </button>
          <button
            style={{
              borderRadius: '16px',
              borderStyle: 'solid',
              borderWidth: '2px 2px 4px',
              cursor: 'pointer',
              display: 'inline-block',
              flex: '1 1 auto',
              margin: '12px',
              maxWidth: '240px',
              minHeight: '217px',
              minWidth: '200px',
              padding: '12px 12px 24px',
              textAlign: 'center'
            }}
          >
            <div className="h-20 mt-8"></div>
            <h2 className="mt-6">Variants</h2>
          </button>
          <button
            style={{
              borderRadius: '16px',
              borderStyle: 'solid',
              borderWidth: '2px 2px 4px',
              cursor: 'pointer',
              display: 'inline-block',
              flex: '1 1 auto',
              margin: '12px',
              maxWidth: '240px',
              minHeight: '217px',
              minWidth: '200px',
              padding: '12px 12px 24px',
              textAlign: 'center'
            }}
          >
            <div className="h-20 mt-8"></div>
            <h2 className="mt-6">Connections</h2>
          </button>
        </div>
      </div>
    )

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
        {/* <Button
          onClick={addExercise}
          variant="ghost"
          style={{ border: '2px solid #58CC02', height: 40, width: 49, color: '#58CC02' }}
        >
          +
        </Button> */}
      </div>

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

      <div className="flex h-16 gap-3">
        {/* <Button onClick={}>Change type</Button>
        <Button onClick={}>Clear</Button> */}
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={addExercise}>Add</Button>
        {/* <Button onClick={}>AI</Button> */}
      </div>
    </div>
  )
}
