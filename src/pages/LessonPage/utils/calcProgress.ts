export const calcProgress = (initial: number, remaining: number) =>
  Math.floor(((initial - remaining) / initial) * 100) || 0
