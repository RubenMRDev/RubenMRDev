import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

const stats = [
  { value: '1+', key: 'yearsExp' as const },
  { value: '6', key: 'projectsCompleted' as const },
  { value: '16', key: 'techStack' as const },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t.about.title} />

        <div className="grid gap-14 md:grid-cols-[5fr_7fr] md:items-start">
          {/* Photo with offset editorial frame */}
          <Reveal from="left" className="relative max-w-[70%]">
            <div className="absolute -bottom-3 -right-3 h-full w-full border border-yellow/40" />
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
              <img
                src="/myprofile.webp"
                alt="Rubén Martín Ruiz"
                className="h-full w-full object-cover grayscale-[0.2]"
              />
            </div>
            <p className="mt-4 text-sm text-muted">
              Rubén Martín Ruiz
            </p>
          </Reveal>

          {/* Bio + spec sheet */}
          <Reveal delay={0.12}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">
              {t.about.bio}
            </p>

            <div className="mt-12 grid grid-cols-3 border-t border-line">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.key}
                  delay={0.25 + i * 0.1}
                  className={`py-6 ${i > 0 ? 'border-l border-line pl-5' : ''}`}
                >
                  <div className="text-4xl font-bold leading-none text-yellow md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-xs leading-snug text-muted">
                    {t.about[stat.key]}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
