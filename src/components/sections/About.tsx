import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Counter from '../ui/Counter'

const stats = [
  { to: 1, suffix: '+', key: 'yearsExp' as const },
  { to: 6, suffix: '', key: 'projectsCompleted' as const },
  { to: 16, suffix: '', key: 'techStack' as const },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} className="mb-16" />

        <div className="grid gap-12 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-20">
          <Reveal from="left">
            <div className="relative overflow-hidden rounded-3xl bg-canvas-2">
              <img
                src="/myprofile.webp"
                alt="Rubén Martín Ruiz"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:pt-2">
            <Reveal delay={0.08}>
              <p className="max-w-[66ch] text-heading font-medium text-ink">{t.about.bio}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[68ch] text-body text-ink-2">{t.about.detail}</p>
            </Reveal>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-hairline pt-8 sm:gap-10">
              {stats.map((stat, i) => (
                <Reveal key={stat.key} delay={0.24 + i * 0.08}>
                  <div className="nums text-title font-semibold text-ink">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-micro uppercase leading-relaxed text-ink-3">
                    {t.about[stat.key]}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
