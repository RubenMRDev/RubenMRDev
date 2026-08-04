import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { useLanguage } from '../../context/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import { skills } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import Marquee from '../ui/Marquee'
import type { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
  VscCode,
}

const categories = ['frontend', 'backend', 'tools'] as const

const marqueeItems = skills.map((skill) => {
  const Icon = iconMap[skill.icon]
  return {
    key: skill.name,
    label: skill.name,
    icon: Icon ? <Icon className="h-6 w-6 md:h-8 md:w-8" /> : undefined,
  }
})

export default function Skills() {
  const { t } = useLanguage()
  const scope = useReveal<HTMLElement>()

  const categoryLabels: Record<string, string> = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    tools: t.skills.tools,
  }

  return (
    <section id="skills" ref={scope} className="border-y border-line bg-surface/30 py-28">
      <div className="mx-auto mb-16 max-w-6xl px-6">
        <SectionHeading title={t.skills.title} />
      </div>

      <Marquee items={marqueeItems} />

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {categories.map((category) => (
            <div key={category} data-reveal className="bg-bg p-7">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
