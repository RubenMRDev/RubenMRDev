import { motion } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'

/** Segmented control; the live language sits on a pill that slides between them. */
export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="flex rounded-full p-0.5"
      aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
    >
      {(['en', 'es'] as const).map((code) => (
        <span
          key={code}
          className={`relative rounded-full px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] transition-colors duration-300 ${
            lang === code ? 'text-canvas' : 'text-ink-3'
          }`}
        >
          {lang === code && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{code}</span>
        </span>
      ))}
    </button>
  )
}
