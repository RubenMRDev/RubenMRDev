import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import SectionTitle from '../ui/SectionTitle'

/**
 * The cards pin one over another as the reader scrolls; each one sinks and
 * shrinks a little as the next slides on top, like a deck being dealt.
 */
export default function Projects() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="projects" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle index="03" eyebrow={t.projects.eyebrow} title={t.projects.title} />
        </div>

        <div ref={ref} className="flex flex-col gap-8 md:gap-[12vh]">
          {projects.map((project, i) => (
            <Card
              key={project.id}
              project={project}
              index={i}
              progress={scrollYProgress}
              targetScale={1 - (projects.length - 1 - i) * 0.035}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CardProps {
  project: Project
  index: number
  progress: MotionValue<number>
  targetScale: number
}

function Card({ project, index, progress, targetScale }: CardProps) {
  const { t, lang } = useLanguage()
  const total = projects.length
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  // The last card is never covered, so it never dims.
  const dim = useTransform(progress, [(index + 1) / total, 1], [0, index < total - 1 ? 0.55 : 0])

  // Tilt the screenshot toward the pointer.
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })

  const label = project.category === 'fullstack' ? t.projects.fullstack : t.projects.frontend

  return (
    <div className="md:sticky" style={{ top: `calc(10vh + ${index * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative grid origin-top overflow-hidden rounded-[2rem] border border-line bg-canvas-2 md:min-h-[72vh] md:grid-cols-[1.35fr_1fr]"
      >
        <a
          href={project.demo ?? project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title[lang]} – ${t.projects.viewDemo}`}
          className="group relative block overflow-hidden bg-canvas [perspective:1200px]"
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse') return
            const r = e.currentTarget.getBoundingClientRect()
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
            rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
          }}
          onPointerLeave={() => {
            rx.set(0)
            ry.set(0)
          }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="h-full p-4 md:p-8">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="aspect-[16/10] h-full w-full rounded-2xl object-cover object-top shadow-2xl shadow-black/60 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
            />
          </motion.div>
          <span className="absolute right-8 bottom-8 flex h-16 w-16 scale-0 items-center justify-center rounded-full bg-accent text-canvas transition-transform duration-500 ease-out-expo group-hover:scale-100 md:right-12 md:bottom-12 md:h-20 md:w-20">
            <FiArrowUpRight className="h-7 w-7" />
          </span>
        </a>

        <div className="flex flex-col p-7 md:p-10">
          <div className="flex items-center justify-between font-mono text-micro uppercase text-ink-3">
            <span>
              <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-line px-3 py-1">{label}</span>
          </div>

          <h3 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink md:mt-auto md:text-5xl">
            {project.title[lang]}
          </h3>
          <p className="mt-4 text-ink-2">{project.description[lang]}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-canvas px-3 py-1 font-mono text-xs text-ink-2">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent"
              >
                {t.projects.viewDemo}
                <FiArrowUpRight className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                <FiGithub /> {t.projects.viewCode}
              </a>
            )}
          </div>
        </div>

        {/* Darkens a card as the next one covers it. */}
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 hidden bg-canvas md:block" />
      </motion.article>
    </div>
  )
}
