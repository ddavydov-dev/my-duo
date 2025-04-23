import { setLocalProjects, useProjects } from '@/entities/skill'
import { useUser } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUnits } from '@/entities/unit'
import { updateExercise } from '../api/updateExercise'
import { Exercise } from '@/entities/exercise'

export const useUpdateExercise = () => {
  const { user } = useUser()
  const { projects, activeProject } = useProjects()
  const { units, activeUnitIndex } = useUnits(activeProject?.id || '')

  const activeUnit = units[activeUnitIndex]

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ exercise, index }: { exercise: Exercise; index: number }) => {
      await updateExercise(exercise, user)

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
                            l.id === exercise.lessonId
                              ? { ...l, exercises: l.exercises.with(index, exercise) }
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
