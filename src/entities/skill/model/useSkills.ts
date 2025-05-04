// import { useResource } from '@/shared/hooks/useResource'
// import { skillsAdapter } from '@/shared/storage'
// import { supabase } from '@/supabase'
// import { useMemo } from 'react'
// import { Skill } from '../config/types'
import { useEntity } from '@/shared/useEntity'

export interface CreateSkillArgs {
  title: string
  isPublic?: boolean
  userId?: string
}

// const createLocal = ({ title, isPublic, userId }: CreateSkillArgs): Skill => ({
//   id: crypto.randomUUID(),
//   title,
//   isPublic: isPublic ?? false,
//   createdAt: new Date().toISOString(),
//   units: [],
//   isActive: true,
//   userId: userId ?? ''
// })

// const createRemote = async (newSkill: Skill) => {
//   try {
//     await supabase
//       .from('skills')
//       .insert([
//         {
//           id: newSkill.id,
//           user_id: newSkill.userId,
//           title: newSkill.title,
//           is_public: newSkill.isPublic,
//           created_at: newSkill.createdAt
//         }
//       ])
//       .then(r => {
//         if (r.error) console.warn(r.error)
//       })
//     return true
//   } catch (error) {
//     console.warn('Create skill remote sync failed', error)
//     return false
//   }
// }

// const updateRemote = async (newSkill: Skill) => {
//   try {
//     await supabase
//       .from('skills')
//       .update(newSkill)
//       .eq('id', newSkill.id)
//       .then(r => r.error && console.warn(r.error))

//     return true
//   } catch (error) {
//     console.warn('Update skill remote sync failed', error)
//     return false
//   }
// }

// const deleteRemote = async (id: string) => {
//   try {
//     await supabase
//       .from('skills')
//       .delete()
//       .eq('id', id)
//       .then(r => r.error && console.warn(r.error))
//     return true
//   } catch (error) {
//     console.warn('Delete skill remote sync failed', error)
//     return false
//   }
// }

// export const useSkills = () => {
//   const { data: skills, ...rest } = useResource<Skill, CreateSkillArgs>({
//     keys: ['skills'],
//     adapter: skillsAdapter,
//     // tableName: 'skills',
//     createLocal,
//     createRemote,
//     // updateLocal,
//     updateRemote,
//     deleteRemote
//   })

//   const activeSkill = useMemo(() => skills.find(item => item.isActive), [skills])

//   return { skills, activeSkill, ...rest }
// }

export const useSkills = () => useEntity('skills')
