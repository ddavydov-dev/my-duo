import { getLocalSkills } from '@/entities/skill'
import { supabase } from '@/supabase'

export async function syncLocalDataToSupabase() {
  // export async function syncLocalDataToSupabase(userId: string) {
  const localProjects = await getLocalSkills()

  for (const project of localProjects) {
    // const { data: projectRow, error: projectError } = await supabase.from('project').insert([
    //   {
    //     id: project.id,
    //     profile_id: userId,
    //     title: project.title,
    //     is_public: project.isPublic,
    //     created_at: project.createdAt
    //   }
    // ])

    for (const unit of project.units) {
      await supabase.from('units').insert([
        {
          id: unit.id,
          project_id: project.id,
          title: unit.title,
          order: unit.order
        }
      ])

      for (const lesson of unit.lessons) {
        await supabase.from('lessons').insert([
          {
            id: lesson.id,
            unit_id: unit.id,
            title: lesson.title,
            order: lesson.order
          }
        ])

        for (const exercise of lesson.exercises) {
          await supabase.from('exercises').insert([
            {
              id: exercise.id,
              lesson_id: lesson.id,
              type: exercise.type,
              prompt: exercise.prompt,
              answer: exercise.answer,
              metadata: exercise.metadata,
              order: exercise.order
            }
          ])
        }
      }
    }
  }
}
