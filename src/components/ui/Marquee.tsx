import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import type { ReactNode } from 'react'

interface MarqueeProps {
  items: { key: string; label: string; icon?: ReactNode }[]
  /** Seconds for one full pass. Lower is faster. */
  duration?: number
}

/**
 * Infinite horizontal band that reacts to scrolling: it skews with the scroll
 * velocity and reverses direction when the user scrolls back up.
 */
export default function Marquee({ items, duration = 26 }: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    // The track holds the list twice, so -50% lands exactly on the seam.
    const loop = gsap.to(track, { xPercent: -50, repeat: -1, duration, ease: 'none' })
    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3.out' })

    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        skewTo(gsap.utils.clamp(-14, 14, velocity / 120))
        // Scrolling up drags the band the other way.
        loop.timeScale(self.direction === -1 ? -1.6 : 1.6)
      },
    })

    // getVelocity() goes quiet the moment scrolling stops, so ease back on idle.
    const relax = gsap.delayedCall(0.4, () => {
      skewTo(0)
      loop.timeScale(1)
    })
    relax.pause()
    const onScrollEnd = () => {
      relax.restart(true)
    }
    ScrollTrigger.addEventListener('scrollEnd', onScrollEnd)
    return () => {
      ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd)
    }
  }, { scope: wrapRef, dependencies: [duration] })

  return (
    <div
      ref={wrapRef}
      className="relative flex overflow-hidden border-y border-line bg-bg py-6"
      aria-hidden="true"
    >
      {/* Fade the band into the background at both ends. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div ref={trackRef} className="flex w-max shrink-0 will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span
                key={`${copy}-${item.key}`}
                className={`flex shrink-0 items-center gap-3 px-7 text-2xl font-semibold tracking-tight md:text-4xl ${
                  i % 3 === 1 ? 'text-yellow' : 'text-ink/25'
                }`}
              >
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
