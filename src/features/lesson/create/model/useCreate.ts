import { setLocalProjects, useProjects } from '@/entities/skill'
import { useUser } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLesson } from '../api/createLesson'

export const useCreateLesson = () => {
  const { user } = useUser()
  const { projects, activeProject } = useProjects()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (lessonData: { unitId: string; title: string; order: number }) => {
      const newLesson = await createLesson(lessonData, user)

      //   const updated = [...prev, newProject]

      const updated = projects.map(p =>
        p.id === activeProject?.id
          ? {
              ...p,
              units: [
                ...p.units.map(u =>
                  u.id === lessonData.unitId ? { ...u, lessons: [...u.lessons, newLesson] } : u
                )
              ]
            }
          : p
      )

      await setLocalProjects(updated)
      queryClient.setQueryData(['projects'], updated)
    }
  })
}
