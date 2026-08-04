import { useState, useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useLanguage } from '../../context/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'

type Filter = 'all' | 'frontend' | 'fullstack'

/** Slack at the end of the track so the last card clears the right edge. */
const TAIL = 96

export default function Projects() {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const headerRef = useReveal<HTMLDivElement>()

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.projects.filterAll },
    { key: 'frontend', label: t.projects.filterFrontend },
    { key: 'fullstack', label: t.projects.filterFullstack },
  ]

  const categoryLabel: Record<string, string> = {
    frontend: t.projects.filterFrontend,
    fullstack: t.projects.filterFullstack,
    other: lang === 'en' ? 'Other' : 'Otro',
  }

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  useGSAP(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    // Cards always animate in, on every filter change.
    gsap.from(track.children, { opacity: 0, y: 40, duration: 0.7, stagger: 0.07 })

    // The horizontal gallery is desktop-only: on a phone, pinning a section and
    // hijacking the scroll direction fights the user instead of impressing them.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (hover: hover)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + TAIL)

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true, // widths change with the filter and on resize
          onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
        },
      })
    })
    return () => mm.revert()
  }, { scope: sectionRef, dependencies: [filter], revertOnUpdate: true })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="overflow-hidden py-28 md:flex md:h-screen md:flex-col md:justify-center md:py-0"
    >
      <div ref={headerRef} className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title={t.projects.title} />

          <div data-reveal className="mb-14 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`border px-4 py-2 text-sm transition-colors duration-300 ${
                  filter === f.key
                    ? 'border-yellow bg-yellow text-bg'
                    : 'border-line text-muted hover:border-yellow/50 hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Track: a grid on mobile, a single horizontal row from md up. */}
      <div
        ref={trackRef}
        className="grid auto-rows-fr gap-5 px-6 sm:grid-cols-2 md:flex md:w-max md:auto-rows-auto md:pl-[max(1.5rem,calc((100vw-72rem)/2))] md:pr-24 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <article
            key={project.id}
            className="group relative flex h-full flex-col overflow-hidden border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-yellow/50 hover:glow-md md:h-auto md:w-[26rem] md:shrink-0"
          >
            {/* Media */}
            <div className="relative aspect-video shrink-0 overflow-hidden bg-surface-2">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-3xl text-muted/40">
                  {'</>'}
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 border border-yellow/40 bg-bg/70 px-2.5 py-1 text-xs font-medium text-yellow backdrop-blur-sm">
                {categoryLabel[project.category]}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-xl font-semibold leading-tight text-ink">
                {project.title[lang]}
              </h3>
              <p className="mb-5 line-clamp-3 min-h-[3.9rem] text-sm leading-relaxed text-muted">
                {project.description[lang]}
              </p>

              <div className="mt-auto space-y-4">
                {/* Difficulty */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {lang === 'en' ? 'Difficulty' : 'Dificultad'}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filledBar = project.difficulty >= i + 1
                      const half = !filledBar && project.difficulty > i && project.difficulty < i + 1
                      return (
                        <div key={i} className="relative h-1.5 w-5 overflow-hidden bg-line">
                          <div
                            className="absolute inset-y-0 left-0 bg-yellow"
                            style={{ width: filledBar ? '100%' : half ? '50%' : '0%' }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex min-h-[1.75rem] flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2 py-0.5 font-mono text-[0.68rem] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-line px-4 py-2 text-center text-sm font-medium text-ink transition-colors duration-300 hover:border-yellow hover:text-yellow"
                    >
                      {t.projects.viewCode}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-yellow px-4 py-2 text-center text-sm font-medium text-bg transition-colors duration-300 hover:bg-yellow-deep"
                    >
                      {t.projects.viewDemo}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Horizontal progress, desktop only */}
      <div className="mx-auto mt-10 hidden w-full max-w-6xl px-6 md:block">
        <div className="h-px w-full bg-line">
          <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-yellow" />
        </div>
      </div>
    </section>
  )
}
