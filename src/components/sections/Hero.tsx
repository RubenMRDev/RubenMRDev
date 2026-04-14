import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../../context/LanguageContext'
import NeonButton from '../ui/NeonButton'

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const greetingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1 },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-neon-dark/8 blur-[100px]" />
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          ref={greetingRef}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-neon md:text-base"
        >
          {t.hero.greeting}
        </p>
        <h1
          ref={nameRef}
          className="mb-6 text-6xl font-extrabold leading-[1.1] text-white md:text-8xl lg:text-9xl"
        >
          {t.hero.name}
        </h1>
        <p
          ref={subtitleRef}
          className="mb-10 text-xl font-light tracking-wide text-text-muted md:text-2xl lg:text-3xl"
        >
          {t.hero.subtitle}
        </p>
        <div ref={ctaRef} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1">
          <div className="h-2 w-1 rounded-full bg-neon" />
        </div>
      </div>
    </section>
  )
}
