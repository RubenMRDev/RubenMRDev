import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { prefersReducedMotion } from '../../lib/scroll'

interface CounterProps {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

/** Counts up once, the first time it is scrolled into view. */
export default function Counter({ to, suffix = '', duration = 1.4, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  // A number ticking upward is exactly the kind of motion the setting means to
  // refuse, so those visitors start on the final figure and never animate.
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0))

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
