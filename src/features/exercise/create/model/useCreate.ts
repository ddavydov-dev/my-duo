import { setLocalProjects, useProjects } from '@/entities/skill'
import { useUser } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createExercise } from '../api/createExercise'
import { useUnits } from '@/entities/unit'

export const useCreateExercise = () => {
  const { user } = useUser()
  const { projects, activeProject } = useProjects()
  const { units, activeUnitIndex } = useUnits(activeProject?.id || '')

  const activeUnit = units[activeUnitIndex]

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (exerciseData: {
      lessonId: string
      prompt: string
      answer: string
      order: number
    }) => {
      const newExercise = await createExercise(exerciseData, user)

      //   const updated = [...prev, newProject]

      const updated = projects.map(p =>
        p.id === activeProject?.id
          ? {
              ...p,
              units: [
                ...p.units.map(u =>
                  u.id === activeUnit.id
                    ? {
                        ...u,
                        lessons: [
                          ...u.lessons.map(l =>
                            l.id === exerciseData.lessonId
                              ? { ...l, exercises: [...l.exercises, newExercise] }
                              : l
                          )
                        ]
                      }
                    : u
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
