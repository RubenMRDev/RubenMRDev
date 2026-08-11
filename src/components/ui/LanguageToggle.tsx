import { useLanguage } from '../../context/LanguageContext'

/**
 * Segmented control. The live language sits on a raised pill.
 *
 * Borderless on purpose: it is always mounted inside a pill that already draws
 * one, and two concentric rounded borders read as a mistake.
 */
export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="flex rounded-full"
      aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
    >
      {(['en', 'es'] as const).map((code) => (
        <span
          key={code}
          className={`rounded-full px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] transition-colors duration-300 ${
            lang === code ? 'bg-ink text-canvas' : 'text-ink-3'
          }`}
        >
          {code}
        </span>
      ))}
    </button>
  )
}
