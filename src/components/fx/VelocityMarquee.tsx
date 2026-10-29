import { useRef, type ReactNode } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'

const wrap = (min: number, max: number, v: number) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min

/**
 * An endless row that drifts on its own and speeds up (or flips direction)
 * with the reader's scroll. The content is repeated four times and wrapped at
 * a quarter, so the seam is never visible.
 */
export default function VelocityMarquee({ children, speed = 2 }: { children: ReactNode; speed?: number }) {
  const reduced = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const b = boost.get()
    if (b < 0) direction.current = -1
    else if (b > 0) direction.current = 1
    // A negative `speed` runs the row the other way.
    base.set(base.get() - direction.current * speed * (delta / 1000) * (1 + Math.abs(b)))
  })

  return (
    <div className="overflow-hidden">
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
