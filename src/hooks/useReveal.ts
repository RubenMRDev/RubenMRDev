import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Reveals every `[data-reveal]` element inside the returned ref as it enters
 * the viewport. Elements that enter together animate as one staggered batch.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current)
    if (!targets.length) return

    gsap.set(targets, { opacity: 0, y: 32 })
    ScrollTrigger.batch(targets, {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          overwrite: true,
        }),
    })
  }, { scope })

  return scope
}
