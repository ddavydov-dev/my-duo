// import { useProjects } from '@/entities/unit'
// import { useMemo, useState } from 'react'
// import { getUnitsFromProject } from '../utils'

// export const useUnits = (projectId: string) => {
//   const [activeUnitIndex, setActiveUnitIndex] = useState(0)

//   const { projects } = useProjects()

//   const units = useMemo(() => getUnitsFromProject(projects, projectId), [projects, projectId])

//   return { units, activeUnitIndex, setActiveUnitIndex }
// }

import { useResource } from '@/shared/hooks/useResource'
import { unitsAdapter } from '@/shared/storage'
import { supabase } from '@/supabase'
import { useEffect, useState } from 'react'
import { Unit } from '../config/types'

interface CreateUnitArgs {
  title: string
  skillId: string
  order?: number
}

const createLocal = ({ title, skillId, order = 0 }: CreateUnitArgs): Unit => ({
  id: crypto.randomUUID(),
  skillId,
  title,
  order,
  lessons: []
})

const createRemote = async (newUnit: Unit) => {
  try {
    const { error } = await supabase.from('units').insert([
      {
        id: newUnit.id,
        skill_id: newUnit.skillId,
        title: newUnit.title,
        order: newUnit.order
      }
    ])
    if (error) {
      console.warn('Create unit remote sync error:', error)
      return false
    }

    return true
  } catch (err) {
    console.warn('Create unit remote sync failed', err)
    return false
  }
}

const updateRemote = async (newUnit: Unit) => {
  try {
    await supabase
      .from('units')
      .update(newUnit)
      .eq('id', newUnit.id)
      .then(r => r.error && console.warn(r.error))

    return true
  } catch (error) {
    console.warn('Update unit remote sync failed', error)
    return false
  }
}

const deleteRemote = async (id: string) => {
  try {
    await supabase
      .from('units')
      .delete()
      .eq('id', id)
      .then(r => r.error && console.warn(r.error))
    return true
  } catch (error) {
    console.warn('Delete unit remote sync failed', error)
    return false
  }
}

export const useUnits = (skillId: string) => {
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null)

  const { data: units, ...rest } = useResource<Unit, CreateUnitArgs>({
    keys: [skillId, 'units'],
    adapter: unitsAdapter,
    // tableName: 'units',
    getFilterFn: item => item.skillId === skillId,
    createLocal,
    createRemote,
    // updateLocal,
    updateRemote,
    deleteRemote
  })

  // useEffect(() => {
  //   if (!activeUnitId) setActiveUnitId(units[0]?.id || null)
  // }, [activeUnitId, units])

  return { units, activeUnitId, setActiveUnitId, ...rest }
}
