// Small in-memory limiter (per server process): max `max` hits per `windowMs` for a given key
export const createLimiter = ({ windowMs, max }) => {
  const hits = new Map()

  const recent = (key) => {
    const now = Date.now()
    const list = (hits.get(key) || []).filter((time) => now - time < windowMs)

    hits.set(key, list)

    return list
  }

  return {
    isBlocked: (key) => recent(key).length >= max,
    hit: (key) => recent(key).push(Date.now()),
    reset: (key) => hits.delete(key),
  }
}
