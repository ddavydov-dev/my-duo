import { Exercise } from '@/entities/exercise'
import { useState, useCallback } from 'react'

export function useAnswerValidation(activeExercise: Exercise | null) {
  const [answer, setAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const checkAnswer = useCallback(() => {
    if (!activeExercise || answer.trim() === '') return
    const correct = activeExercise.answer === answer
    setIsCorrect(correct)
    return correct
  }, [activeExercise, answer])

  const skip = useCallback(() => setIsCorrect(false), [])

  const reset = useCallback(() => {
    setAnswer('')
    setIsCorrect(null)
  }, [])

  return { answer, setAnswer, isCorrect, checkAnswer, skip, reset }
}
