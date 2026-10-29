import { useLanguage } from '../../context/LanguageContext'
import { scrollToTop } from '../../lib/scroll'
import VelocityMarquee from '../fx/VelocityMarquee'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer className="relative overflow-hidden pt-10 pb-8">
      <VelocityMarquee speed={1.5}>
        {['RubenMRDev', 'Fullstack', 'React', 'TypeScript', 'PHP'].map((word) => (
          <span
            key={word}
            className="outline-text px-6 font-display text-[clamp(4rem,14vw,12rem)] leading-none font-extrabold tracking-tighter transition-colors duration-500 hover:text-accent"
          >
            {word} <span className="text-accent">✦</span>
          </span>
        ))}
      </VelocityMarquee>

      <div className="mx-auto mt-10 flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-5 font-mono text-micro uppercase text-ink-3 md:px-10">
        <span>
          © {new Date().getFullYear()} Rubén Martín Ruiz. {t.footer.rights}
        </span>
        <button type="button" onClick={scrollToTop} className="transition-colors hover:text-accent">
          ↑ {lang === 'es' ? 'Arriba' : 'Top'}
        </button>
      </div>
    </footer>
  )
}
