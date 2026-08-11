import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import { useMediaQuery } from '../../lib/media'
import SectionHeading from '../ui/SectionHeading'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The run pins and the work travels sideways: vertical scroll drives horizontal
 * distance, so the whole set reads as one continuous pass instead of a grid.
 *
 * Below md there is nothing to pin. The same panels stack and the motion value
 * is never applied, which is why this needs a media query rather than CSS.
 */
export default function Projects() {
  const { t, lang } = useLanguage()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const runwayRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // ResizeObserver fires once on observe, so the first measurement arrives from
  // the callback rather than from a synchronous write inside the effect. A
  // stale distance below md is harmless: every consumer of it is gated on
  // isDesktop.
  useEffect(() => {
    const track = trackRef.current
    if (!track || !isDesktop) return

    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))

    // The track can stay the same width while the viewport changes, so the
    // window needs watching too.
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [isDesktop])

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  })
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  // Tight on purpose. Lenis already smooths the wheel, so a soft spring here
  // would stack a second lag on top and the rail would trail the page.
  const x = useSpring(rawX, { stiffness: 400, damping: 45, mass: 0.35 })
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.4 })

  const categoryLabel: Record<string, string> = {
    frontend: t.projects.frontend,
    fullstack: t.projects.fullstack,
    other: lang === 'en' ? 'Other' : 'Otro',
  }

  return (
    <section id="projects" className="bg-deep text-deep-ink-2">
      <div
        ref={runwayRef}
        style={isDesktop ? { height: `calc(100svh + ${distance}px)` } : undefined}
      >
        <div className="flex flex-col justify-center overflow-hidden px-6 py-24 md:sticky md:top-0 md:h-svh md:px-0 md:py-0">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:px-10">
            <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} onDeep />
            <span className="nums font-mono text-micro uppercase text-deep-ink-2">
              {String(projects.length).padStart(2, '0')} {t.projects.count}
            </span>
          </div>

          <motion.div
            ref={trackRef}
            style={isDesktop ? { x } : undefined}
            className="flex flex-col gap-14 md:w-max md:flex-row md:gap-8 md:px-10"
          >
            {projects.map((project, i) => {
              const primary = project.demo ?? project.github

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.75, delay: (i % 3) * 0.08, ease: EASE }}
                  className="flex w-full shrink-0 flex-col md:w-[clamp(21rem,38vw,32rem)]"
                >
                  <a
                    href={primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label={t.projects.open}
                    className="group relative block overflow-hidden rounded-2xl bg-deep-2"
                  >
                    <img
                      src={project.image}
                      alt={project.title[lang]}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </a>

                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="nums font-mono text-micro text-deep-ink-2/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-micro uppercase text-accent-soft">
                      {categoryLabel[project.category]}
                    </span>
                  </div>

                  <h3 className="mt-3 text-heading font-semibold text-deep-ink">
                    {project.title[lang]}
                  </h3>

                  <p className="mt-3 max-w-[52ch] text-small text-deep-ink-2">
                    {project.description[lang]}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-deep-line px-3 py-1 font-mono text-[0.68rem] text-deep-ink-2"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-small font-medium text-deep-ink transition-colors hover:text-accent-soft"
                      >
                        {t.projects.viewDemo}
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small text-deep-ink-2 transition-colors hover:text-deep-ink"
                      >
                        {t.projects.viewCode}
                      </a>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </motion.div>

          {/* Where you are in the pass */}
          {isDesktop && distance > 0 && (
            <div className="mt-14 h-px w-full bg-deep-line md:mx-10 md:w-[calc(100%-5rem)]">
              <motion.div
                style={{ scaleX: progress }}
                className="h-full origin-left bg-accent-soft"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
