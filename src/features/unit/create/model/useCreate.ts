import { setLocalProjects, useProjects } from '@/entities/skill'
import { useUser } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUnit } from '../api/createUnit'

export const useCreateUnit = () => {
  const { user } = useUser()
  const { projects } = useProjects()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (unitData: { projectId: string; title: string; order: number }) => {
      const newUnit = await createUnit(unitData, user)

      const updated = projects.map(p =>
        p.id === unitData.projectId ? { ...p, units: [...p.units, newUnit] } : p
      )
      await setLocalProjects(updated)
      queryClient.setQueryData(['projects'], updated)
      // queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}
