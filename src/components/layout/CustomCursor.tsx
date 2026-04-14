import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' })
    const fxTo = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power3' })
    const fyTo = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power3' })

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      fxTo(e.clientX)
      fyTo(e.clientY)
    }

    const handleEnterInteractive = () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 })
      gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 })
    }

    const handleLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', handleMove)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterInteractive)
      el.addEventListener('mouseleave', handleLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon mix-blend-difference md:block"
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/50 mix-blend-difference md:block"
      />
    </>
  )
}
