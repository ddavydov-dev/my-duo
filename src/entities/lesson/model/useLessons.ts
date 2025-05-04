// import { useResource } from '@/shared/hooks/useResource'
// import { lessonsAdapter } from '@/shared/storage'
// import { supabase } from '@/supabase'
// import { Lesson } from '../config/types'
import { useEntity } from '@/shared/useEntity'

export interface CreateLessonArgs {
  title: string
  unitId: string
  order?: number
}

// const createLocal = ({ title, unitId, order = 0 }: CreateLessonArgs): Lesson => ({
//   id: crypto.randomUUID(),
//   title,
//   order,
//   unitId,
//   exercises: [],
//   isCompleted: false
// })

// const createRemote = async (newLesson: Lesson) => {
//   try {
//     const { error } = await supabase.from('lessons').insert([
//       {
//         id: newLesson.id,
//         unit_id: newLesson.unitId,
//         title: newLesson.title,
//         order: newLesson.order,
//         is_completed: newLesson.isCompleted
//       }
//     ])
//     if (error) {
//       console.warn('Create lesson remote sync error:', error)
//       return false
//     }

//     return true
//   } catch (err) {
//     console.warn('Create lesson remote sync failed', err)
//     return false
//   }
// }

// const updateRemote = async (newLesson: Lesson) => {
//   try {
//     await supabase
//       .from('lessons')
//       .update(newLesson)
//       .eq('id', newLesson.id)
//       .then(r => r.error && console.warn(r.error))

//     return true
//   } catch (error) {
//     console.warn('Update lesson remote sync failed', error)
//     return false
//   }
// }

// const deleteRemote = async (id: string) => {
//   try {
//     await supabase
//       .from('lessons')
//       .delete()
//       .eq('id', id)
//       .then(r => r.error && console.warn(r.error))
//     return true
//   } catch (error) {
//     console.warn('Delete lesson remote sync failed', error)
//     return false
//   }
// }

// export const useLessons = (unitId: string) => {
//   const { data: lessons, ...rest } = useResource<Lesson, CreateLessonArgs>({
//     keys: ['lessons', unitId],
//     adapter: lessonsAdapter,
//     getFilterFn: item => item.unitId === unitId,
//     createLocal,
//     createRemote,
//     updateRemote,
//     deleteRemote
//   })

//   return { lessons, ...rest }
// }

export const useLessons = (unitId: string) => useEntity('lessons', unitId)
