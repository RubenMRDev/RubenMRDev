import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../../context/LanguageContext'
import NeonButton from '../ui/NeonButton'

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const [firstName, ...rest] = t.hero.name.split(' ')
  const lastName = rest.join(' ')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('[data-hero="kicker"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.15 })
        .fromTo(
          '[data-hero="line"]',
          { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo('[data-hero="role"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('[data-hero="cta"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Warm depth, not neon glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-yellow/[0.04] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <p data-hero="kicker" className="mb-6 flex items-center gap-3 text-sm font-medium text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow" />
          {t.hero.greeting}
        </p>

        <h1 className="text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <span data-hero="line" className="block overflow-hidden">{firstName}</span>
          <span data-hero="line" className="block overflow-hidden">
            {lastName}
            <span className="text-yellow">.</span>
          </span>
        </h1>

        <p data-hero="role" className="mt-8 max-w-md text-lg text-muted">
          {t.hero.subtitle}
        </p>

        <div data-hero="cta" className="mt-10 flex flex-col gap-3 sm:flex-row">
          <NeonButton
            variant="primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero.cta1}
          </NeonButton>
          <NeonButton
            variant="outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero.cta2}
          </NeonButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-muted">
        <span>Scroll</span>
        <span className="inline-block h-8 w-px animate-pulse bg-line" />
      </div>
    </section>
  )
}
