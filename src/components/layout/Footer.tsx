import { useLanguage } from '../../context/LanguageContext'

const socials = [
  { href: 'https://github.com/RubenMRDev', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rubenmrdev/', label: 'LinkedIn' },
  { href: 'mailto:rubenmrdev@gmail.com', label: 'Email' },
]

/**
 * Contact above is the raised band, so the footer drops back to the page colour
 * instead of extending it into one undifferentiated block.
 */
export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-canvas px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.7rem] text-ink-3">
          &copy; {year} Rubén Martín Ruiz. {t.footer.rights}
        </p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Social">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-small text-ink-2 transition-colors duration-300 hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
