import { useEffect, useRef } from 'react'
import { useSeason, type Season } from '../../lib/season'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rot: number
  spin: number
  phase: number
  glyph?: string
  color?: string
}

const CONFETTI = ['#f5c542', '#5ad1ff', '#ff6b9d', '#8cf08c', '#c792ff']

/** How each season looks: count per 100k px² of screen, and how a particle is born. */
const recipes: Record<Season, { density: number; spawn: (w: number, h: number, anywhere: boolean) => Particle }> = {
  // Bats and ghosts drifting across, a pumpkin now and then.
  halloween: {
    density: 0.9,
    spawn: (w, h, anywhere) => ({
      x: anywhere ? Math.random() * w : -40,
      y: Math.random() * h * 0.85,
      vx: 0.4 + Math.random() * 0.7,
      vy: 0,
      size: 16 + Math.random() * 16,
      rot: 0,
      spin: 0,
      phase: Math.random() * Math.PI * 2,
      glyph: ['🦇', '🦇', '🦇', '👻', '🎃'][Math.floor(Math.random() * 5)],
    }),
  },
  christmas: {
    density: 5,
    spawn: (w, h, anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -10,
      vx: 0,
      vy: 0.35 + Math.random() * 0.8,
      size: 1 + Math.random() * 2.6,
      rot: 0,
      spin: 0,
      phase: Math.random() * Math.PI * 2,
    }),
  },
  newyear: {
    density: 3,
    spawn: (w, h, anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -10,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 0.7 + Math.random() * 1.2,
      size: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
      color: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
    }),
  },
}

/**
 * Seasonal particles over the page, on one canvas that ignores the mouse. It
 * stops drawing while the tab is hidden and holds fewer particles on small
 * screens, so it costs next to nothing.
 */
export default function SeasonLayer() {
  const season = useSeason()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    document.documentElement.dataset.season = season ?? ''
  }, [season])

  useEffect(() => {
    if (!season) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const recipe = recipes[season]
    const dpr = Math.min(window.devicePixelRatio, 2)
    let w = 0
    let h = 0
    let particles: Particle[] = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(((w * h) / 100_000) * recipe.density)
      particles = Array.from({ length: count }, () => recipe.spawn(w, h, true))
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let t = 0
    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx + (season === 'christmas' ? Math.sin(t / 60 + p.phase) * 0.35 : 0)
        p.y += p.vy + (season === 'halloween' ? Math.sin(t / 25 + p.phase) * 0.6 : 0)
        p.rot += p.spin

        const gone = p.y > h + 40 || p.y < -40 || p.x > w + 50
        if (gone) {
          particles[i] = recipe.spawn(w, h, false)
          continue
        }

        if (p.glyph) {
          ctx.globalAlpha = 0.85
          ctx.font = `${p.size}px serif`
          // A bat flaps by squashing vertically.
          const flap = p.glyph === '🦇' ? 0.6 + Math.abs(Math.sin(t / 6 + p.phase)) * 0.4 : 1
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.scale(1, flap)
          ctx.fillText(p.glyph, 0, 0)
          ctx.restore()
        } else if (p.color) {
          ctx.globalAlpha = 0.9
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.fillStyle = p.color
          // Cos of the spin gives the flutter of a flat piece of paper.
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, (p.size / 2) * Math.abs(Math.cos(p.rot * 3)))
          ctx.restore()
        } else {
          ctx.globalAlpha = 0.35 + p.size / 6
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVisibility)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [season])

  if (!season) return null
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[55] h-full w-full" />
}
