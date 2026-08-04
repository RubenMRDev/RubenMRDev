import { useState, useEffect, useRef } from 'react'
import { gsap, useGSAP, ScrollSmoother, prefersReducedMotion } from '../../lib/gsap'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useGSAP(() => {
    gsap.to(btnRef.current, {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.6,
      duration: prefersReducedMotion() ? 0 : 0.35,
      ease: 'power3.out',
    })
  }, { dependencies: [visible] })

  return (
    <button
      ref={btnRef}
      onClick={() => {
        const smoother = ScrollSmoother.get()
        if (smoother) smoother.scrollTo(0, !prefersReducedMotion())
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className={`fixed bottom-8 right-8 z-50 flex h-11 w-11 scale-[0.6] items-center justify-center border border-line bg-surface text-ink opacity-0 transition-colors hover:border-yellow hover:text-yellow ${
        visible ? '' : 'pointer-events-none'
      }`}
      aria-label="Scroll to top"
      aria-hidden={!visible}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
