import { useEffect, useRef } from 'react'

/**
 * A soft glow that trails the mouse across the whole page. Written straight to
 * a CSS variable, so moving the mouse never re-renders React. Touch screens
 * have no hover to follow and never mount it.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current!
    const onMove = (e: PointerEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
      el.style.opacity = '1'
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-700"
      style={{
        background:
          'radial-gradient(520px circle at var(--x) var(--y), color-mix(in srgb, var(--color-violet) 9%, transparent), transparent 70%)',
      }}
    />
  )
}
