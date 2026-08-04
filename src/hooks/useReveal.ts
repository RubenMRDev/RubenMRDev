import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/** Hidden state: the element sits below its own mask, cropped at the baseline. */
const HIDDEN = { opacity: 0, y: 60, clipPath: 'inset(0% -20% 100% -20%)' }
/** Resting state: the mask is pushed outside the box so shadows are never clipped. */
const SHOWN = { opacity: 1, y: 0, clipPath: 'inset(0% -20% -20% -20%)' }

/**
 * Reveals every `[data-reveal]` inside the returned ref as it enters the
 * viewport: the element rises from behind its own mask. Elements that enter
 * together animate as one staggered batch.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current)
    if (!targets.length) return

    gsap.set(targets, HIDDEN)
    ScrollTrigger.batch(targets, {
      start: 'top 85%',
      once: true,
      onEnter: (els) => gsap.to(els, { ...SHOWN, duration: 1.1, stagger: 0.09, overwrite: true }),
    })

    // Lazy-loaded sections mount after the page settles, so positions computed
    // by earlier ScrollTriggers (and by ScrollSmoother) are stale until this.
    ScrollTrigger.refresh()
  }, { scope })

  return scope
}
