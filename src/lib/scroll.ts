import Lenis from 'lenis'

let lenis: Lenis | null = null

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Starts Lenis inertial scrolling and returns the teardown.
 * Skipped entirely when the visitor asked for reduced motion: retiming someone's
 * scroll is exactly the kind of motion that setting exists to refuse.
 *
 * `lerp` rather than `duration`: duration restarts a fixed eased animation on
 * every wheel tick, which is what made a fast series of ticks feel stepped.
 * Frame-rate independent interpolation chases the target continuously instead,
 * so a burst of ticks reads as one glide. Lenis treats the two as mutually
 * exclusive, so duration is gone rather than tuned.
 *
 * Only the wheel is retimed. Touch keeps the platform's own momentum, which is
 * already better than anything worth reimplementing.
 */
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    // Slightly under 1 so the longer glide does not also cover more ground per
    // notch; without this, smoother reads as "runs away from you".
    wheelMultiplier: 0.92,
    syncTouch: false,
  })

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
