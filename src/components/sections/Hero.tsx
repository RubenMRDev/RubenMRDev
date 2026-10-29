import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../lib/scroll'
import ShaderBackground from '../fx/ShaderBackground'
import SplitReveal from '../fx/SplitReveal'
import Magnetic from '../fx/Magnetic'

const ease = [0.16, 1, 0.3, 1] as const

function useSevilleTime() {
  const format = () =>
    new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Hero() {
  const { t } = useLanguage()
  const time = useSevilleTime()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // The name drifts back and fades as the reader leaves the hero.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [first, ...rest] = t.hero.name.split(' ')

  return (
    <section ref={ref} id="hero" className="relative flex min-h-svh flex-col overflow-hidden">
      <ShaderBackground className="absolute inset-0 h-full w-full" />

      <motion.div
        style={{ scale, y, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 font-mono text-micro uppercase text-ink-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {t.hero.location} · <span className="nums">{time}</span>
        </motion.div>

        <h1 className="font-display text-mega font-extrabold text-ink" aria-label={t.hero.name}>
          <SplitReveal text={first} by="char" immediate delay={0.25} className="block" />
          <SplitReveal text={rest.join(' ')} by="char" immediate delay={0.45} className="block text-accent" />
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <SplitReveal
              text={t.hero.subtitle}
              as="p"
              immediate
              delay={0.9}
              className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1.15 }}
              className="mt-3 text-lead text-ink-2"
            >
              {t.hero.tagline}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.3 }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="group relative overflow-hidden rounded-full bg-accent px-7 py-4 font-medium text-canvas"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-ink transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                <span className="relative">{t.hero.cta1} ↓</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="rounded-full border border-ink/25 px-7 py-4 font-medium text-ink backdrop-blur transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {t.hero.cta2}
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
