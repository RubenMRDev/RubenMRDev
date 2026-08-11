import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../lib/scroll'
import Button from '../ui/Button'

const EASE = [0.16, 1, 0.3, 1] as const

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-svh flex-col justify-center px-6 pb-20 pt-32 md:px-10"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto w-full max-w-6xl"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.06 }}
      >
        <motion.div
          variants={rise}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-mono text-micro uppercase text-ink-3"
        >
          {t.hero.location}
        </motion.div>

        <h1 className="mt-8 max-w-[15ch] text-display font-semibold text-ink">
          {[t.hero.name, t.hero.subtitle].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 1 ? 'text-ink-3' : ''}`}
                variants={{ hidden: { y: '105%' }, show: { y: '0%' } }}
                transition={{ duration: 1, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-8 max-w-[62ch] text-lead text-ink-2"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button onClick={() => scrollToSection('projects')}>{t.hero.cta1}</Button>
          <Button variant="secondary" onClick={() => scrollToSection('contact')}>
            {t.hero.cta2}
          </Button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-micro uppercase text-ink-3 transition-colors hover:text-ink"
      >
        {t.hero.scroll}
        <motion.span
          className="h-7 w-px origin-top bg-hairline"
          animate={{ scaleY: [0.25, 1, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </section>
  )
}
