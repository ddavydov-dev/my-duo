export const getLessonPositions = (lessonsLength: number): number[] => {
  const center = 496 / 2
  const lessonWidth = 70
  const maxOffset = lessonWidth * 2 // Maximum offset from center
  const positions: number[] = []

  // Start at center
  positions.push(center)

  if (lessonsLength <= 1) return positions

  if (lessonsLength === 2) return [center, center]

  let currentDirection = Math.random() > 0.5 ? 1 : -1 // 1 for right, -1 for left
  let currentOffset = lessonWidth
  let lessonsInCurrentDirection = 0

  for (let i = 1; i < lessonsLength; i++) {
    // If we've reached the edge or done 4 lessons in this direction
    if (currentOffset >= maxOffset || lessonsInCurrentDirection >= 4) {
      currentDirection *= -1 // Reverse direction
      currentOffset = 0
      lessonsInCurrentDirection = 0
    }

    positions.push(center + currentOffset * currentDirection)
    currentOffset += lessonWidth
    lessonsInCurrentDirection++
  }

  return positions
}
