import { Exercise } from '@/entities/exercise'
import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'

export const createExercise = async (
  exerciseData: { lessonId: string; prompt: string; answer: string; order: number },
  user?: User
) => {
  const newExercise: Exercise = {
    id: crypto.randomUUID(),
    lessonId: exerciseData.lessonId,
    type: 'question_answer',
    prompt: exerciseData.prompt,
    answer: exerciseData.answer,
    metadata: {},
    order: exerciseData.order ?? Date.now()
  }

  if (user) {
    try {
      const { error } = await supabase.from('exercises').insert([
        {
          id: newExercise.id,
          lesson_id: newExercise.lessonId,
          type: newExercise.type,
          prompt: newExercise.prompt,
          answer: newExercise.answer,
          metadata: newExercise.metadata,
          order: newExercise.order
        }
      ])
      if (error) console.warn('Create exercise remote sync error:', error)
    } catch (err) {
      console.warn('Create exercise remote sync failed', err)
    }
  }
  return newExercise
}
