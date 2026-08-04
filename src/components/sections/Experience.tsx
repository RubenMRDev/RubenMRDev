import { useRef, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'

export default function Experience() {
  const { t, lang } = useLanguage()
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useReveal<HTMLElement>()

  // The yellow rail fills as the section passes through the viewport.
  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = section.getBoundingClientRect()
      const start = window.innerHeight * 0.6
      const progress = (start - top) / (height - window.innerHeight * 0.2)
      line.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [sectionRef])

  return (
    <section id="experience" ref={sectionRef} className="border-y border-line bg-surface/30 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading title={t.experience.title} />

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-line sm:block md:left-1/2 md:-translate-x-px" />
          <div
            ref={lineRef}
            className="absolute left-4 top-0 bottom-0 hidden w-px origin-top bg-yellow sm:block md:left-1/2 md:-translate-x-px"
          />

          {/* Entries */}
          <div className="space-y-8 sm:space-y-12">
            {[...experience].reverse().map((entry, i) => (
              <div
                key={entry.id}
                data-reveal
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 top-2 z-10 hidden h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-yellow bg-bg sm:block md:left-1/2" />

                {/* Content */}
                <div className={`w-full sm:ml-10 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="border border-line bg-bg p-5">
                    <span className="text-sm font-medium text-yellow">
                      {entry.dateRange[lang]}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-tight text-ink sm:text-xl">
                      {entry.role[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {entry.company}
                    </p>
                    <ul className={`mt-3 space-y-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {entry.description[lang].map((desc, j) => (
                        <li key={j} className="text-sm leading-relaxed text-muted">
                          {desc}
                        </li>
                      ))}
                    </ul>
                    {entry.type === 'internship' && (
                      <span className="mt-3 inline-block border border-line px-2 py-0.5 text-xs text-muted">
                        {lang === 'en' ? 'Internship' : 'Prácticas'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
