import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'

export const updateExercise = async (
  { id, prompt, answer, order }: { id: string; prompt: string; answer: string; order: number },
  user?: User
) => {
  //   const newExercise: Exercise = {
  //     id: crypto.randomUUID(),
  //     lessonId: exerciseData.lessonId,
  //     type: 'question_answer',
  //     prompt: exerciseData.prompt,
  //     answer: exerciseData.answer,
  //     metadata: {},
  //     order: exerciseData.order ?? Date.now()
  //   }

  if (user) {
    try {
      const { error } = await supabase
        .from('exercises')
        .update([
          {
            prompt,
            answer,
            order
          }
        ])
        .eq('id', id)
      if (error) console.warn('Create exercise remote sync error:', error)
    } catch (err) {
      console.warn('Create exercise remote sync failed', err)
    }
  }
  //   return newExercise
}
