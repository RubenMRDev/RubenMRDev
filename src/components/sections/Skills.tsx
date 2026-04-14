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
import GlassCard from '../ui/GlassCard'
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
    <section id="skills" className="py-24 bg-dark-card/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t.skills.title} />

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
            >
              <GlassCard className="h-full">
                <h3 className="mb-6 text-lg font-semibold text-neon">
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
                          className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-neon/10 hover:text-white"
                        >
                          {Icon && <Icon className="h-4 w-4 text-neon/70" />}
                          {skill.name}
                        </span>
                      )
                    })}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
