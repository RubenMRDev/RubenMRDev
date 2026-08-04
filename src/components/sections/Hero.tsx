import { useRef } from 'react'
import { gsap, useGSAP, SplitText, prefersReducedMotion, scrollToSection } from '../../lib/gsap'
import { useLanguage } from '../../context/LanguageContext'
import NeonButton from '../ui/NeonButton'

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const [firstName, ...rest] = t.hero.name.split(' ')
  const lastName = rest.join(' ')

  useGSAP(() => {
    // Reduced motion still gets an entrance, just a still one: blocks cross-fade
    // in sequence, with no letter travel, no parallax and no scroll hijacking.
    if (prefersReducedMotion()) {
      gsap.from(
        '[data-hero="kicker"], [data-hero="line"], [data-hero="role"], [data-hero="cta"]',
        { opacity: 0, duration: 0.5, stagger: 0.1 }
      )
      return
    }

    // `mask: 'chars'` wraps every character in its own overflow-hidden box, so
    // the letters slide up from behind the baseline instead of just fading.
    const split = SplitText.create('[data-hero="line"]', {
      type: 'chars',
      mask: 'chars',
    })

    const tl = gsap.timeline()
    tl.from('[data-hero="kicker"]', { opacity: 0, y: 16, duration: 0.7, delay: 0.15 })
      .from(
        split.chars,
        { yPercent: 115, duration: 1.1, stagger: { each: 0.035, from: 'start' } },
        '-=0.4'
      )
      .from('[data-hero="rule"]', { scaleX: 0, duration: 1.2 }, '-=0.85')
      .from('[data-hero="role"]', { opacity: 0, y: 24, duration: 0.9 }, '-=0.9')
      .from('[data-hero="cta"]', { opacity: 0, y: 20, duration: 0.8 }, '-=0.75')
      .from('[data-hero="cue"]', { opacity: 0, duration: 0.6 }, '-=0.5')

    // The hero recedes as the next section takes over.
    gsap.to('[data-hero="content"]', {
      y: -110,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Warm depth, not neon glow. data-speed makes it drift slower than the page. */}
      <div className="pointer-events-none absolute inset-0">
        <div
          data-speed="0.85"
          className="absolute -top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-yellow/[0.05] blur-[140px]"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div data-hero="content" className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <p data-hero="kicker" className="mb-6 flex items-center gap-3 text-sm font-medium text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow" />
          {t.hero.greeting}
        </p>

        <h1 className="text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <span data-hero="line" className="block">{firstName}</span>
          <span data-hero="line" className="block">
            {lastName}
            <span className="text-yellow">.</span>
          </span>
        </h1>

        <div data-hero="rule" className="mt-8 h-px w-full origin-left bg-line" />

        <p data-hero="role" className="mt-8 max-w-md text-lg text-muted">
          {t.hero.subtitle}
        </p>

        <div data-hero="cta" className="mt-10 flex flex-col gap-3 sm:flex-row">
          <NeonButton variant="primary" magnetic onClick={() => scrollToSection('projects')}>
            {t.hero.cta1}
          </NeonButton>
          <NeonButton variant="outline" magnetic onClick={() => scrollToSection('contact')}>
            {t.hero.cta2}
          </NeonButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero="cue"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-muted"
      >
        <span>Scroll</span>
        <span className="inline-block h-8 w-px animate-pulse bg-line" />
      </div>
    </section>
  )
}
