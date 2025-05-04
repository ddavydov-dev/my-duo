export function snakeCaseObject(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`), v])
  )
}
