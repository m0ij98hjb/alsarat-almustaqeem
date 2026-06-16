import { useState, useEffect, useCallback } from 'react'

// Generic fetch hook
export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return
    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d.data || d); setError(null) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

// Dhikr counter hook
export function useDhikrCounter(initialCount: number) {
  const [count, setCount] = useState(0)
  const done = count >= initialCount

  const increment = useCallback(() => {
    setCount(prev => prev >= initialCount ? 0 : prev + 1)
  }, [initialCount])

  const reset = useCallback(() => setCount(0), [])

  return { count, done, increment, reset, progress: (count / initialCount) * 100 }
}

// Search debounce hook
export function useSearch(delay = 500) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay)
    return () => clearTimeout(timer)
  }, [query, delay])

  return { query, setQuery, debouncedQuery }
}

// Local storage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) { console.error(error) }
  }

  return [storedValue, setValue] as const
}

// Prayer times hook (using Aladhan API)
export function usePrayerTimes(city = 'Jeddah', country = 'SA') {
  const [times, setTimes] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date()
    const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
    fetch(`https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${city}&country=${country}&method=4`)
      .then(r => r.json())
      .then(d => { setTimes(d.data?.timings); setLoading(false) })
      .catch(() => setLoading(false))
  }, [city, country])

  return { times, loading }
}
