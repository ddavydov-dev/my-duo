import { useEntity } from '@/shared/useEntity'

export interface CreateLessonArgs {
  title: string
  unitId: string
  order?: number
}

export const useLessons = (unitId: string) => useEntity('lessons', unitId)

// export const useLessons = (unitId: string) => {
//   // const [unitId] = useAtom(activeUnitIdAtom)
//   // const [, setActiveLessonId] = useAtom(activeUnitIdAtom)
//   const { data: lessons, isLoading, ...rest } = useEntity('lessons', unitId)

//   // useEffect(() => {
//   //   if (!isLoading && lessons.length > 0) {
//   //     setActiveLessonId(lessons[0].id)
//   //   }
//   // }, [isLoading, lessons, setActiveLessonId])

//   return { lessons, isLoading, ...rest }
// }
