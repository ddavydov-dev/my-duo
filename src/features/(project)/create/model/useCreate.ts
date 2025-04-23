import { getLocalProjects, setLocalProjects } from '@/entities/skill'
import { useUser } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject } from '../api/createProject'

export const useCreateProject = () => {
  const { user } = useUser()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (projectData: { title: string; isPublic?: boolean }) => {
      const newProject = await createProject(projectData, user)

      const prev = await getLocalProjects()
      const updated = [...prev, newProject]
      await setLocalProjects(updated)
      queryClient.setQueryData(['projects'], updated)
    }
  })
}
