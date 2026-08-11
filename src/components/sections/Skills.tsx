import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import type { IconType } from 'react-icons'
import { useLanguage } from '../../context/LanguageContext'
import { skills } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

const iconMap: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiOpenapiinitiative,
  SiGit, SiFigma, SiGithubactions, SiTrello,
  VscCode,
}

const categories = ['frontend', 'backend', 'tools'] as const

/** All three columns land in one viewport, no scrolling between them. */
export default function Skills() {
  const { t } = useLanguage()

  const labels: Record<string, string> = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    tools: t.skills.tools,
  }

  const grouped = categories.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  }))

  return (
    <section id="skills" className="border-y border-hairline bg-canvas-2 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
          <Reveal delay={0.1} className="font-mono text-micro uppercase text-ink-3">
            {skills.length} {t.skills.coverage}
          </Reveal>
        </div>

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {grouped.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.1}>
              <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
                <h3 className="text-lead font-semibold text-ink">{labels[group.category]}</h3>
                <span className="nums font-mono text-micro text-ink-3">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-5 space-y-px">
                {group.items.map((skill) => {
                  const Icon = iconMap[skill.icon]
                  return (
                    <li
                      key={skill.name}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-canvas"
                    >
                      {Icon && (
                        <Icon
                          className="h-[1.05rem] w-[1.05rem] shrink-0 text-ink-3 transition-colors duration-300 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-small text-ink-2 transition-colors duration-300 group-hover:text-ink">
                        {skill.name}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
