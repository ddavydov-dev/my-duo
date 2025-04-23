import { Lesson } from '@/entities/lesson'
import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'

export const createLesson = async (
  lessonData: { unitId: string; title: string; order: number },
  user?: User
) => {
  const newLesson: Lesson = {
    id: crypto.randomUUID(),
    title: lessonData.title,
    order: lessonData.order ?? Date.now(),
    exercises: []
  }

  if (user) {
    try {
      const { error } = await supabase.from('lessons').insert([
        {
          id: newLesson.id,
          unit_id: lessonData.unitId,
          title: newLesson.title,
          order: newLesson.order
        }
      ])
      if (error) console.warn('Create lesson remote sync error:', error)
    } catch (err) {
      console.warn('Create lesson remote sync failed', err)
    }
  }
  return newLesson
}
