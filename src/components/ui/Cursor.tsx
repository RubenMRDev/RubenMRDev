import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { prefersReducedMotion } from '../../lib/scroll'

const RING = 34
const DOT = 6

/**
 * Two-part pointer: a dot pinned to the real cursor position and a ring that
 * springs in behind it. `mix-blend-mode: difference` means one pair of elements
 * stays legible over the light sections and the dark ones alike, with no
 * per-section colour switching.
 *
 * Elements opt into the expanded state with `data-cursor` and can name it with
 * `data-cursor-label`.
 */
export default function Cursor() {
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // The dot is nearly rigid, the ring lags. The gap between them is the effect.
  const dotX = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.25 })
  const dotY = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.25 })
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.55 })

  useEffect(() => {
    // A finger has no hover state, and a springy pointer is exactly the kind of
    // motion the reduced-motion setting exists to refuse.
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('has-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const hit = (e.target as Element | null)?.closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      )
      setActive(Boolean(hit))
      setLabel(hit?.getAttribute('data-cursor-label') ?? null)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [x, y])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[95] hidden mix-blend-difference [@media(pointer:fine)]:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          x: ringX,
          y: ringY,
          width: RING,
          height: RING,
          marginLeft: -RING / 2,
          marginTop: -RING / 2,
        }}
        animate={{
          opacity: visible ? (active ? 1 : 0.55) : 0,
          scale: active ? (label ? 1.9 : 1.45) : 1,
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          width: DOT,
          height: DOT,
          marginLeft: -DOT / 2,
          marginTop: -DOT / 2,
        }}
        animate={{ opacity: visible && !active ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* The label rides the ring, so it arrives with the lag rather than
          snapping to the pointer. */}
      <motion.div
        className="absolute font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-white"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: label && visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="block -translate-x-1/2 -translate-y-1/2">{label}</span>
      </motion.div>
    </div>
  )
}
