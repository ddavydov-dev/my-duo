type LayoutConfig = {
  /** Total width of the container (px) */
  containerWidth?: number
  /** Width of each lesson block (px) */
  lessonWidth?: number
  /** How many lessons between direction flips */
  zigZagInterval?: number
  /** Fraction of lessonWidth to step each ring */
  offsetFraction?: number
  /** Max offset expressed as a multiple of lessonWidth */
  maxOffsetMultiplier?: number
  /** Initial direction of the zig-zag */
  initialDirection?: number
}

export const getLessonPositions = (
  lessonsCount: number,
  {
    containerWidth = 496,
    lessonWidth = 70,
    zigZagInterval = 3,
    offsetFraction = 0.5, // each ring adds 0.5 * lessonWidth
    maxOffsetMultiplier = 1, // max offset = 1 * lessonWidth
    initialDirection = -1
  }: LayoutConfig = {}
): number[] => {
  const center = containerWidth / 2
  const step = lessonWidth * offsetFraction
  const maxOffset = lessonWidth * maxOffsetMultiplier

  // if 1 or 2 lessons, just stack in the center
  if (lessonsCount <= 2) return Array(lessonsCount).fill(center)

  let direction = initialDirection
  let ring = 0 // how many times we’ve “stepped” since flip
  let offset = 0 // running offset

  return Array.from({ length: lessonsCount }, (_, idx) => {
    if (idx === 0 || idx === lessonsCount - 1) {
      // first and last lesson are always centered
      offset = 0
    } else {
      // flip direction every zigZagInterval lessons
      if (idx % zigZagInterval === 0) {
        direction *= -1
        ring = 0
      }
      ring++
      offset = Math.max(-maxOffset, Math.min(maxOffset, offset + ring * step * direction))
    }

    return center + offset
  })
}
