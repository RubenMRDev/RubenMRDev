import { useLanguage } from '../../context/LanguageContext'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

export default function Experience() {
  const { t, lang } = useLanguage()

  // The data is already authored newest first, so it reads down the page in
  // that order. Numbering counts up from the earliest role.
  const entries = experience

  return (
    <section id="experience" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          className="mb-16"
        />

        <ol className="border-t border-hairline">
          {entries.map((entry, i) => (
              <Reveal
                as="li"
                key={entry.id}
                delay={i * 0.08}
                className="group relative isolate border-b border-hairline"
              >
                {/* A band sweeps in from the left behind the hovered role. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-xl bg-canvas-2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <div className="grid gap-x-10 gap-y-5 py-10 transition-[padding] duration-500 ease-[var(--ease-out-expo)] md:group-hover:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-12">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="nums font-mono text-micro text-ink-3">
                        {String(entries.length - i).padStart(2, '0')}
                      </span>
                      {entry.current && (
                        <span className="flex items-center gap-1.5 font-mono text-micro uppercase text-accent">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                          </span>
                          {t.experience.present}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-heading font-semibold text-ink">
                      {entry.role[lang]}
                    </h3>

                    <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-small text-ink-2">
                      <span className="font-medium text-ink">{entry.company}</span>
                      <span aria-hidden="true" className="text-ink-3">
                        ·
                      </span>
                      <span className="nums font-mono text-micro uppercase text-ink-3">
                        {entry.dateRange[lang]}
                      </span>
                      {entry.type === 'internship' && (
                        <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[0.68rem] uppercase text-ink-3">
                          {t.experience.internship}
                        </span>
                      )}
                    </p>
                  </div>

                  <ul className="space-y-3 md:pt-1">
                    {entry.description[lang].map((line, j) => (
                      <li key={j} className="flex gap-3 text-small text-ink-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.62em] h-px w-3.5 shrink-0 bg-ink-3 transition-colors duration-500 group-hover:bg-accent"
                        />
                        <span className="max-w-[62ch]">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
