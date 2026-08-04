import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'

type Filter = 'all' | 'frontend' | 'fullstack'

export default function Projects() {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  // Re-arms the reveal when the filter swaps the rendered cards.
  const scope = useReveal<HTMLElement>(filter)

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

  return (
    <section id="projects" ref={scope} className="py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
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

      <div className="mx-auto grid max-w-6xl auto-rows-fr gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.id}
            data-reveal
            className="group relative flex h-full flex-col overflow-hidden border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-yellow/50 hover:glow-md"
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

    </section>
  )
}
