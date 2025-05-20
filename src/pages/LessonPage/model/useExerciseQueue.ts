import { Exercise } from '@/entities/exercise'
import { useState, useMemo, useCallback } from 'react'

export function useExerciseQueue(initialExercises: Exercise[]) {
  const [exercises, setExercises] = useState(initialExercises)
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(
    initialExercises[0]?.id ?? null
  )

  const activeExercise = useMemo(
    () => exercises.find(e => e.id === activeExerciseId) ?? null,
    [exercises, activeExerciseId]
  )

  const advance = useCallback(
    (isCorrect: boolean) => {
      setExercises(prev => (isCorrect ? prev.slice(1) : [...prev.slice(1), prev[0]]))

      setActiveExerciseId(() => (exercises[1] ? exercises[1].id : null))
    },
    [exercises]
  )

  return { exercises, activeExercise, advance }
}
