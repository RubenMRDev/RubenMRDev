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
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-px" />
          <div
            ref={lineRef}
            className="absolute left-4 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-neon to-neon-dark md:left-1/2 md:-translate-x-px"
          />

          {/* Entries */}
          <div className="space-y-12">
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
                {/* Dot */}
                <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-neon bg-dark glow-sm md:left-1/2" />

                {/* Content */}
                <div className={`ml-10 w-full md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="glass rounded-xl p-5">
                    <span className="inline-block rounded-full bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
                      {entry.dateRange[lang]}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {entry.role[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-neon/70">{entry.company}</p>
                    <ul className={`mt-3 space-y-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {entry.description[lang].map((desc, j) => (
                        <li key={j} className="text-sm text-text-muted">
                          {desc}
                        </li>
                      ))}
                    </ul>
                    {entry.type === 'internship' && (
                      <span className="mt-3 inline-block rounded-full border border-white/10 px-2 py-0.5 text-xs text-text-muted">
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
