import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'

type Filter = 'all' | 'frontend' | 'fullstack'

export default function Projects() {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.projects.filterAll },
    { key: 'frontend', label: t.projects.filterFrontend },
    { key: 'fullstack', label: t.projects.filterFullstack },
  ]

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t.projects.title} />

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === f.key
                  ? 'bg-neon text-dark font-semibold glow-sm'
                  : 'border border-white/10 text-text-muted hover:border-neon/30 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                layoutId={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group glass flex flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-video overflow-hidden bg-dark-lighter">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title[lang]}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl text-text-muted/30">
                      {'</>'}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-dark/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-neon/20"
                      >
                        {t.projects.viewCode}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-dark transition-colors hover:bg-neon/80"
                      >
                        {t.projects.viewDemo}
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {project.title[lang]}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                    {project.description[lang]}
                  </p>
                  {/* Difficulty */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs text-text-muted">{lang === 'en' ? 'Difficulty' : 'Dificultad'}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const filled = project.difficulty >= i + 1
                        const half = !filled && project.difficulty > i && project.difficulty < i + 1
                        return (
                          <div
                            key={i}
                            className="relative h-2 w-5 overflow-hidden rounded-sm bg-white/10"
                          >
                            <div
                              className="absolute inset-y-0 left-0 rounded-sm bg-neon"
                              style={{ width: filled ? '100%' : half ? '50%' : '0%' }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neon/10 px-3 py-1 text-xs text-neon"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
