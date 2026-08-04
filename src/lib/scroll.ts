import Lenis from 'lenis'

let lenis: Lenis | null = null

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Starts Lenis inertial scrolling and returns the teardown.
 * Skipped entirely when the visitor asked for reduced motion: retiming someone's
 * scroll is exactly the kind of motion that setting exists to refuse.
 */
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({ duration: 1.1, smoothWheel: true })

  let frame = requestAnimationFrame(function raf(time) {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  })

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to a section through Lenis when it is running, natively otherwise. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  if (lenis) lenis.scrollTo(target, { offset: -8 })
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
