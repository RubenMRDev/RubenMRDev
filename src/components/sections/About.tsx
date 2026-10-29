import { motion } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Counter from '../ui/Counter'
import ScrollHighlight from '../ui/ScrollHighlight'

const EASE = [0.16, 1, 0.3, 1] as const

export default function About() {
  const { t } = useLanguage()

  const stats = [
    { to: 1, suffix: '+', label: t.about.yearsExp },
    { to: projects.length, suffix: '', label: t.about.projectsCompleted },
    { to: skills.length, suffix: '', label: t.about.techStack },
  ]

  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} className="mb-14 md:mb-20" />

        <div className="grid gap-14 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-20">
          <div>
            {/* The story, lighting up word by word as it is read. A rule on the
                left that draws itself marks it as the voice of the section. */}
            <div className="relative pl-6 md:pl-8">
              <motion.span
                aria-hidden
                className="absolute top-1 bottom-1 left-0 w-px origin-top bg-gradient-to-b from-accent to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 1.4, ease: EASE }}
              />
              <ScrollHighlight
                text={t.about.bio}
                className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.35] font-medium tracking-[-0.02em] text-ink"
              />
            </div>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[60ch] text-body text-ink-2 md:pl-8">{t.about.detail}</p>
            </Reveal>
          </div>

          <dl className="self-start border-t border-hairline">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.15 + i * 0.1} from="right">
                <div className="group flex items-end justify-between gap-6 border-b border-hairline py-6">
                  <dt className="font-mono text-micro uppercase leading-relaxed text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                    {stat.label}
                  </dt>
                  <dd className="nums text-title leading-none font-semibold text-ink transition-colors duration-300 group-hover:text-accent">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
