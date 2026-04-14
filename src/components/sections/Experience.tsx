import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../../context/LanguageContext'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const { t, lang } = useLanguage()
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-dark-card/50">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading title={t.experience.title} />

        <div className="relative">
          {/* Timeline line — hidden on small mobile, visible from sm */}
          <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-white/10 sm:block md:left-1/2 md:-translate-x-px" />
          <div
            ref={lineRef}
            className="absolute left-4 top-0 bottom-0 hidden w-px origin-top bg-gradient-to-b from-neon to-neon-dark sm:block md:left-1/2 md:-translate-x-px"
          />

          {/* Entries */}
          <div className="space-y-8 sm:space-y-12">
            {experience.map((entry, i) => (
              <motion.div
                key={entry.id}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Dot — hidden on small mobile */}
                <div className="absolute left-4 top-1 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-neon bg-dark glow-sm sm:block md:left-1/2" />

                {/* Content */}
                <div className={`w-full sm:ml-10 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="glass rounded-xl p-4 sm:p-5">
                    <span className="inline-block rounded-full bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
                      {entry.dateRange[lang]}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-white sm:mt-3 sm:text-lg">
                      {entry.role[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-neon/70">{entry.company}</p>
                    <ul className={`mt-2 space-y-1 sm:mt-3 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {entry.description[lang].map((desc, j) => (
                        <li key={j} className="text-xs text-text-muted sm:text-sm">
                          {desc}
                        </li>
                      ))}
                    </ul>
                    {entry.type === 'internship' && (
                      <span className="mt-2 inline-block rounded-full border border-white/10 px-2 py-0.5 text-xs text-text-muted sm:mt-3">
                        {lang === 'en' ? 'Internship' : 'Prácticas'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
