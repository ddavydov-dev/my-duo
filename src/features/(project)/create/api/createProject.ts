import { Project } from '@/entities/skill'
import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'

export const createProject = async (
  projectData: { title: string; isPublic?: boolean },
  user?: User
) => {
  const newProject: Project = {
    id: crypto.randomUUID(),
    title: projectData.title,
    isPublic: projectData.isPublic ?? false,
    createdAt: new Date().toISOString(),
    units: [],
    isActive: true,
    userId: user?.id ?? ''
  }

  if (user) {
    try {
      const { error } = await supabase.from('projects').insert([
        {
          id: newProject.id,
          user_id: user.id,
          title: newProject.title,
          is_public: newProject.isPublic,
          created_at: newProject.createdAt
        }
      ])
      if (error) console.warn('Create project remote sync error:', error)
    } catch (err) {
      console.warn('Create project remote sync failed', err)
    }
  }
  return newProject
}
