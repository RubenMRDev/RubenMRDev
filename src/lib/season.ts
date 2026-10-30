import { useSyncExternalStore } from 'react'

export const SEASONS = ['halloween', 'christmas', 'newyear'] as const
export type Season = (typeof SEASONS)[number]

/** Which season a calendar day falls in, read in Spain's time zone. */
export function seasonFor(date: Date): Season | null {
  const [month, day] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', month: 'numeric', day: 'numeric' })
    .formatToParts(date)
    .filter((p) => p.type === 'month' || p.type === 'day')
    .map((p) => Number(p.value))

  if ((month === 10 && day >= 20) || (month === 11 && day === 1)) return 'halloween'
  if ((month === 12 && day === 31) || (month === 1 && day === 1)) return 'newyear'
  if (month === 12 || (month === 1 && day <= 6)) return 'christmas'
  return null
}

// `?season=christmas` previews any season on any day; `?season=none` turns it off.
function fromUrl(): Season | null | undefined {
  const value = new URLSearchParams(window.location.search).get('season')
  if (value === 'none') return null
  return SEASONS.find((s) => s === value)
}

const hiddenKey = (season: Season) => `season-hidden:${season}:${new Date().getFullYear()}`

function isHidden(season: Season) {
  try {
    return localStorage.getItem(hiddenKey(season)) === '1'
  } catch {
    return false
  }
}

function compute(): Season | null {
  const forced = fromUrl()
  if (forced !== undefined) return forced
  const season = seasonFor(new Date())
  return season && !isHidden(season) ? season : null
}

let current = typeof window === 'undefined' ? null : compute()
const listeners = new Set<() => void>()

/** Hides this season's theme for the rest of the year; it comes back next time. */
export function hideSeason() {
  if (!current) return
  try {
    localStorage.setItem(hiddenKey(current), '1')
  } catch {
    // Private mode: it just will not be remembered.
  }
  current = null
  listeners.forEach((l) => l())
}

/** The active seasonal theme, or null for the everyday look. */
export function useSeason() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => current,
  )
}
