import { useExercises } from '@/entities/exercise'
import { useCallback } from 'react'
import { calcProgress } from '../utils/calcProgress'
import { useAnswerValidation } from './useAnswerValidation'
import { useExerciseQueue } from './useExerciseQueue'

export function useLessonLogic() {
  const lessonId = localStorage.getItem('activeLessonId') ?? ''
  //   const navigate = useNavigate({ from: '/lesson' })
  const { data: initialExercises = [] } = useExercises(lessonId)

  const { exercises, activeExercise, advance: advanceQueue } = useExerciseQueue(initialExercises)

  const {
    answer,
    setAnswer,
    isCorrect: isAnswerCorrect,
    checkAnswer: validateAnswer,
    skip: handleSkip,
    reset: resetAnswerState
  } = useAnswerValidation(activeExercise)

  const progress = calcProgress(initialExercises.length, exercises.length)

  /* 4️⃣  public callbacks */
  //   const checkAnswer = useCallback(() => {
  //     const correct = validateAnswer()
  //     // If correct → progress auto‑updates via remaining count
  //   }, [validateAnswer])

  const continueLesson = useCallback(() => {
    advanceQueue(Boolean(isAnswerCorrect))
    resetAnswerState()
  }, [advanceQueue, isAnswerCorrect, resetAnswerState])

  return {
    // navigate,
    progress,
    activeExercise,
    answer,
    setAnswer,
    isAnswerCorrect,
    handleSkip,
    checkAnswer: validateAnswer,
    continueLesson
  }
}
