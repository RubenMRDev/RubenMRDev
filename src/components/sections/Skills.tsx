import { motion } from 'motion/react'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import type { IconType } from 'react-icons'
import { useLanguage } from '../../context/LanguageContext'
import { skills } from '../../data/skills'
import type { Skill } from '../../types'
import VelocityMarquee from '../fx/VelocityMarquee'
import SectionTitle from '../ui/SectionTitle'

const iconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
  VscCode,
}

const categories = ['frontend', 'backend', 'tools'] as const

function Chip({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon]
  return (
    <span className="group mx-2 flex items-center gap-4 rounded-full border border-line bg-canvas-2 px-7 py-4 transition-colors duration-300 hover:border-accent md:mx-3 md:px-9 md:py-5">
      <Icon className="h-7 w-7 text-ink-3 transition-colors duration-300 group-hover:text-accent md:h-9 md:w-9" />
      <span className="font-display text-2xl font-semibold whitespace-nowrap text-ink md:text-4xl">{skill.name}</span>
    </span>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const half = Math.ceil(skills.length / 2)

  return (
    <section id="skills" className="relative overflow-hidden border-y border-line bg-canvas-2/40 py-28 md:py-40">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionTitle index="02" eyebrow={t.skills.eyebrow} title={t.skills.title} />
      </div>

      <div className="flex -rotate-2 flex-col gap-4 md:gap-6">
        <VelocityMarquee speed={2}>
          {skills.slice(0, half).map((s) => <Chip key={s.name} skill={s} />)}
        </VelocityMarquee>
        <VelocityMarquee speed={-2}>
          {skills.slice(half).map((s) => <Chip key={s.name} skill={s} />)}
        </VelocityMarquee>
      </div>

      <div className="mx-auto mt-24 grid max-w-[90rem] gap-12 px-5 md:grid-cols-3 md:px-10">
        {categories.map((category, c) => {
          const items = skills.filter((s) => s.category === category)
          return (
            <div key={category}>
              <div className="mb-5 flex items-baseline justify-between border-b border-line pb-4">
                <h3 className="font-display text-2xl font-bold text-ink">{t.skills[category]}</h3>
                <span className="font-mono text-micro text-ink-3">{String(items.length).padStart(2, '0')}</span>
              </div>
              <ul>
                {items.map((skill, i) => {
                  const Icon = iconMap[skill.icon]
                  return (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: c * 0.1 + i * 0.05 }}
                      className="group flex items-center gap-3 py-2 text-ink-2 transition-[color,translate] duration-300 hover:translate-x-2 hover:text-ink"
                    >
                      <Icon className="h-4 w-4 text-ink-3 transition-colors group-hover:text-accent" />
                      {skill.name}
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
