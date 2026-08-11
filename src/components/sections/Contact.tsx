import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

const links = [
  { label: 'GitHub', handle: 'github.com/RubenMRDev', href: 'https://github.com/RubenMRDev' },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/rubenmrdev',
    href: 'https://www.linkedin.com/in/rubenmrdev/',
  },
  { label: 'Email', handle: 'rubenmrdev@gmail.com', href: 'mailto:rubenmrdev@gmail.com' },
]

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="border-t border-hairline bg-canvas-2 px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-start md:gap-20">
          <div>
            <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[46ch] text-lead text-ink-2">{t.contact.subtitle}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <Button href="mailto:rubenmrdev@gmail.com" className="mt-8">
                {t.contact.send}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="border-t border-hairline md:mt-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between gap-6 border-b border-hairline py-4"
              >
                <span className="min-w-0">
                  <span className="block text-body font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[0.7rem] text-ink-3">
                    {link.handle}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-3 transition-[transform,color] duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
