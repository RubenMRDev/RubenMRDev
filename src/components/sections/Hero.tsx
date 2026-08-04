import { useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../hooks/useReveal'
import NeonButton from '../ui/NeonButton'

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const [firstName, ...rest] = t.hero.name.split(' ')
  const lastName = rest.join(' ')

  // The hero is above the fold, so it reveals on mount instead of on scroll.
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    els?.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${120 + i * 110}ms`)
      el.classList.add('is-visible')
    })
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Warm depth, not neon glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-yellow/[0.05] blur-[140px]" />
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
        <p data-reveal className="mb-6 flex items-center gap-3 text-sm font-medium text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow" />
          {t.hero.greeting}
        </p>

        <h1 className="text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <span data-reveal className="block">{firstName}</span>
          <span data-reveal className="block">
            {lastName}
            <span className="text-yellow">.</span>
          </span>
        </h1>

        <div data-reveal className="mt-8 h-px w-full bg-line" />

        <p data-reveal className="mt-8 max-w-md text-lg text-muted">
          {t.hero.subtitle}
        </p>

        <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          <NeonButton variant="primary" onClick={() => scrollToSection('projects')}>
            {t.hero.cta1}
          </NeonButton>
          <NeonButton variant="outline" onClick={() => scrollToSection('contact')}>
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
