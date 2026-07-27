/**
 * Deterministic "pick of the day" index — stable for the whole calendar day
 * and changes daily, computed server-side so it costs nothing at runtime.
 */
export function dailyIndex(poolLength: number): number {
  if (poolLength <= 0) return 0
  const start = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 0))
  const now = new Date()
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return dayOfYear % poolLength
}
