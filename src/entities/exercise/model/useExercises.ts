// import { useResource } from '@/shared/hooks/useResource'
// import { exercisesAdapter } from '@/shared/storage'
// import { supabase } from '@/supabase'
// import { useEffect, useState } from 'react'
// import { Exercise } from '../config/types'
import { useEntity } from '@/shared/useEntity'

export interface CreateExerciseArgs {
  prompt: string
  answer: string
  lessonId: string
  order?: number
}

// const createLocal = ({ prompt, answer, lessonId, order = 0 }: CreateExerciseArgs): Exercise => ({
//   id: crypto.randomUUID(),
//   prompt,
//   answer,
//   order,
//   lessonId,
//   type: 'question_answer'
// })

// const createRemote = async ({ id, prompt, answer, order, lessonId, type }: Exercise) => {
//   try {
//     const { error } = await supabase.from('exercises').insert([
//       {
//         id,
//         lesson_id: lessonId,
//         prompt,
//         answer,
//         order,
//         type
//       }
//     ])
//     if (error) {
//       console.warn('Create exercise remote sync error:', error)
//       return false
//     }

//     return true
//   } catch (err) {
//     console.warn('Create exercise remote sync failed', err)
//     return false
//   }
// }

// const updateRemote = async (newExercise: Exercise) => {
//   try {
//     await supabase
//       .from('exercises')
//       .update(newExercise)
//       .eq('id', newExercise.id)
//       .then(r => r.error && console.warn(r.error))

//     return true
//   } catch (error) {
//     console.warn('Update exercise remote sync failed', error)
//     return false
//   }
// }

// const deleteRemote = async (id: string) => {
//   try {
//     await supabase
//       .from('exercises')
//       .delete()
//       .eq('id', id)
//       .then(r => r.error && console.warn(r.error))
//     return true
//   } catch (error) {
//     console.warn('Delete exercise remote sync failed', error)
//     return false
//   }
// }

// export const useExercises = (lessonId: string) => {
//   const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null)

//   const { data: exercises, ...rest } = useResource<Exercise, CreateExerciseArgs>({
//     keys: ['exercises', lessonId],
//     adapter: exercisesAdapter,
//     getFilterFn: (item: Exercise) => item.lessonId === lessonId,
//     // tableName: 'exercises',
//     createLocal,
//     createRemote,
//     updateRemote,
//     deleteRemote
//   })

//   useEffect(() => {
//     if (!activeExerciseId) setActiveExerciseId(exercises[0]?.id || null)
//   }, [activeExerciseId, exercises])

//   return { exercises, activeExerciseId, setActiveExerciseId, ...rest }
// }

export const useExercises = (lessonId: string) => useEntity('exercises', lessonId)
