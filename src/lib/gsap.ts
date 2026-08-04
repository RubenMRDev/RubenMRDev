import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText)

/** Everything eases with the same curve so the whole page moves as one system. */
gsap.defaults({ ease: 'expo.out', duration: 0.9 })

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scrolls to a section through ScrollSmoother when it is active, natively otherwise. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(target, !prefersReducedMotion(), 'top top')
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText }
