import { Unit } from '@/entities/unit'
import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'

export const createUnit = async (
  unitData: { projectId: string; title: string; order: number },
  user?: User
) => {
  const newUnit: Unit = {
    id: crypto.randomUUID(),
    title: unitData.title,
    order: unitData.order ?? Date.now(),
    lessons: []
  }

  if (user) {
    try {
      const { error } = await supabase.from('units').insert([
        {
          id: newUnit.id,
          project_id: unitData.projectId,
          title: newUnit.title,
          order: newUnit.order
        }
      ])
      if (error) console.warn('Create unit remote sync error:', error)
    } catch (err) {
      console.warn('Create unit remote sync failed', err)
    }
  }
  return newUnit
}
