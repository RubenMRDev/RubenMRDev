import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Leans its child toward the mouse while hovered and springs back on leave. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const spring = { stiffness: 220, damping: 15, mass: 0.4 }
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
