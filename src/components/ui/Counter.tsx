import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

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
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

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
