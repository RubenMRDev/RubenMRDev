import { useEffect, useRef } from 'react'

/**
 * Reveals every `[data-reveal]` inside the returned ref once it scrolls into
 * view. Elements that cross the line together are staggered.
 *
 * Plain IntersectionObserver: the motion itself lives in CSS (see globals.css),
 * so this only decides *when*, never *how*.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(resetKey?: unknown) {
  const scope = useRef<T>(null)

  useEffect(() => {
    const targets = scope.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          // `top < 0` catches anything already scrolled past: an anchor jump or a
          // fast flick can take an element from below the fold to above it without
          // it ever reporting as intersecting, which would strand it invisible.
          .filter((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0)
          .forEach((entry, i) => {
            const el = entry.target as HTMLElement
            el.style.setProperty('--reveal-delay', entry.isIntersecting ? `${i * 80}ms` : '0ms')
            el.classList.add('is-visible')
            observer.unobserve(el) // reveal once, then stop watching
          })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // resetKey re-arms the observer when the rendered set changes (e.g. filters).
  }, [resetKey])

  return scope
}

/** Smooth anchor scrolling that steps aside when the user asked for less motion. */
export function scrollToSection(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}
