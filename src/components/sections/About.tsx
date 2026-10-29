import { motion } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import ScrollHighlight from '../fx/ScrollHighlight'
import SectionTitle from '../ui/SectionTitle'
import Counter from '../ui/Counter'

export default function About() {
  const { t } = useLanguage()

  const stats = [
    { value: 1, suffix: '+', label: t.about.yearsExp },
    { value: projects.length, suffix: '', label: t.about.projectsCompleted },
    { value: skills.length, suffix: '', label: t.about.techStack },
  ]

  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[90rem]">
        <SectionTitle index="01" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div>
            <ScrollHighlight
              text={t.about.bio}
              className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink"
            />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-2xl text-lead text-ink-2"
            >
              {t.about.detail}
            </motion.p>
          </div>

          <dl className="grid content-start gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                className="group flex items-end justify-between gap-6 bg-canvas p-7 transition-colors duration-500 hover:bg-canvas-2"
              >
                <dt className="font-mono text-micro uppercase text-ink-3">{stat.label}</dt>
                <dd className="font-display text-7xl font-extrabold leading-none tracking-tighter text-ink transition-colors duration-500 group-hover:text-accent">
                  <Counter to={stat.value} suffix={stat.suffix} className="nums" />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
