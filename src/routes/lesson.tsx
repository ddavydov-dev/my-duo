import { createFileRoute } from '@tanstack/react-router'

import LessonPage from '@/pages/LessonPage/ui/LessonPage'

export const Route = createFileRoute('/lesson')({
  component: LessonPage
})
