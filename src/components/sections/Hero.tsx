import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../lib/scroll'
import NeonButton from '../ui/NeonButton'

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const [firstName, ...rest] = t.hero.name.split(' ')
  const lastName = rest.join(' ')

  // The hero drifts up and dims as the next section takes over.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -90])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

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

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.11, delayChildren: 0.15 }}
      >
        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3 text-sm font-medium text-muted"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow" />
          {t.hero.greeting}
        </motion.p>

        <h1 className="text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {[firstName, lastName].map((line, i) => (
            // Each line rides up from behind its own overflow box.
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
                {i === 1 && <span className="text-yellow">.</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 h-px w-full origin-left bg-line"
        />

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-md text-lg text-muted"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <NeonButton variant="primary" onClick={() => scrollToSection('projects')}>
            {t.hero.cta1}
          </NeonButton>
          <NeonButton variant="outline" onClick={() => scrollToSection('contact')}>
            {t.hero.cta2}
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-muted">
        <span>Scroll</span>
        <span className="inline-block h-8 w-px animate-pulse bg-line" />
      </div>
    </section>
  )
}
