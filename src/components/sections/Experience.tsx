import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { experience } from '../../data/experience'
import SectionTitle from '../ui/SectionTitle'

/** A timeline whose line draws itself down the page as the reader scrolls. */
export default function Experience() {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[90rem]">
        <SectionTitle index="04" eyebrow={t.experience.eyebrow} title={t.experience.title} />

        <ol ref={ref} className="relative ml-2 md:ml-[calc(25%+0.5rem)]">
          <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-violet"
          />

          {experience.map((entry) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative pb-16 pl-8 last:pb-0 md:pl-14"
            >
              <span
                aria-hidden
                className={`absolute top-2 -left-[7px] h-[15px] w-[15px] rounded-full border-2 border-canvas ${
                  entry.current ? 'bg-accent shadow-[0_0_24px_4px] shadow-accent/50' : 'bg-ink-3 group-hover:bg-ink'
                } transition-colors`}
              />

              <p className="font-mono text-micro uppercase text-ink-3 md:absolute md:top-2 md:-left-[calc(33%+2rem)] md:w-[calc(33%-2rem)] md:text-right">
                {entry.dateRange[lang]}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 md:mt-0">
                <h3 className="font-display text-3xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-5xl">
                  {entry.company}
                </h3>
                {entry.current && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-micro uppercase text-accent">
                    {t.experience.present}
                  </span>
                )}
                {entry.type === 'internship' && (
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-micro uppercase text-ink-3">
                    {t.experience.internship}
                  </span>
                )}
              </div>
              <p className="mt-2 text-lg text-ink">{entry.role[lang]}</p>

              <ul className="mt-5 max-w-2xl space-y-2">
                {entry.description[lang].map((line) => (
                  <li key={line} className="flex gap-3 text-ink-2">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-3" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
