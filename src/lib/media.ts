import { useCallback, useSyncExternalStore } from 'react'

/**
 * Tracks a media query.
 *
 * Used to decide whether a section pins and scrolls sideways or just stacks:
 * that is a structural difference, not something CSS alone can switch off,
 * because the horizontal offset is a motion value.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
