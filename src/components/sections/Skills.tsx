import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { useLanguage } from '../../context/LanguageContext'
import { skills } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import type { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
  VscCode,
}

const categories = ['frontend', 'backend', 'tools'] as const

export default function Skills() {
  const { t } = useLanguage()

  const categoryLabels: Record<string, string> = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    tools: t.skills.tools,
  }

  return (
    <section id="skills" className="border-y border-line bg-surface/30 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t.skills.title} />

        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              className="bg-bg p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.12 }}
            >
              <h3 className="mb-6 text-base font-semibold text-ink">
                {categoryLabels[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => {
                    const Icon = iconMap[skill.icon]
                    return (
                      <span
                        key={skill.name}
                        className="flex items-center gap-2 border border-line px-3 py-1.5 text-sm text-ink-2 transition-colors hover:border-yellow/50 hover:text-ink"
                      >
                        {Icon && <Icon className="h-4 w-4 text-yellow" />}
                        {skill.name}
                      </span>
                    )
                  })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
