import { BackButton } from '@/shared/ui/BackButton'
import { Button } from '@/shared/ui/Button'
import { useState } from 'react'

const exercises = {
  QuestionAnswer: {
    title: 'QuestionAnswer',
    description: 'Choose the correct answer from the list.',
    component: () => <div>Question answer</div>
  },
  MatchingPairs: {
    title: 'Matching Pairs',
    description: 'Match the words with their translations.',
    component: () => <div>Matching Pairs</div>
  },
  InsertWords: {
    title: 'Insert Words',
    description: 'Fill in the blanks with the correct words.',
    component: () => <div>Insert Words</div>
  }
}

export const Exercise = () => {
  const [exerciseType, setExerciseType] = useState<string | null>()

  if (!exerciseType) {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <h2>Choose type</h2>

        {Object.values(exercises).map((exercise, index) => (
          <Button
            key={index}
            style={{ padding: 10, borderBottom: '1px solid #E0E0E0' }}
            onClick={() => setExerciseType(exercise.title)}
          >
            {exercise.title}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <BackButton onClick={() => setExerciseType(null)} />
    </div>
  )
}
