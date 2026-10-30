import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../lib/scroll'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import SplitText from '../ui/SplitText'
import SeasonBadge from '../season/SeasonBadge'

const EASE = [0.16, 1, 0.3, 1] as const

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

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
      // The glow follows the mouse through CSS variables, so moving it never
      // re-renders React.
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        glowRef.current?.style.setProperty('--gx', `${e.clientX - r.left}px`)
        glowRef.current?.style.setProperty('--gy', `${e.clientY - r.top}px`)
      }}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-20 pt-32 md:px-10"
    >
      {/* Two soft lights drifting behind the name, plus a glow under the mouse. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-1/4 left-[5%] h-[60vmax] w-[60vmax] rounded-full bg-accent/[0.09] blur-[110px]"
          animate={{ x: ['0%', '18%', '-6%', '0%'], y: ['0%', '12%', '22%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/3 right-[-10%] h-[50vmax] w-[50vmax] rounded-full bg-[oklch(0.62_0.17_300)]/[0.07] blur-[120px]"
          animate={{ x: ['0%', '-20%', '6%', '0%'], y: ['0%', '-14%', '-4%', '0%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          ref={glowRef}
          className="absolute inset-0 hidden [@media(pointer:fine)]:block"
          style={{
            background:
              'radial-gradient(420px circle at var(--gx, -999px) var(--gy, -999px), color-mix(in oklch, var(--color-accent) 12%, transparent), transparent 70%)',
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-6xl"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.06 }}
      >
        <motion.div
          variants={rise}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center gap-2.5 font-mono text-micro uppercase text-ink-3"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {t.hero.location}
          <SeasonBadge />
        </motion.div>

        <h1 className="mt-8 max-w-[15ch] text-display font-semibold text-ink">
          <SplitText text={t.hero.name} by="char" play delay={0.15} />
          <SplitText text={t.hero.subtitle} play delay={0.7} className="text-ink-3" />
        </h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          className="mt-8 max-w-[62ch] text-lead text-ink-2"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.8, ease: EASE, delay: 1 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Button onClick={() => scrollToSection('projects')}>{t.hero.cta1}</Button>
          </Magnetic>
          <Magnetic>
            <Button variant="secondary" href="mailto:rubenmrdev@gmail.com">
              {t.hero.cta2}
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-micro uppercase text-ink-3 transition-colors hover:text-ink"
      >
        {t.hero.scroll}
        <span className="relative h-8 w-px overflow-hidden bg-hairline">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  )
}
