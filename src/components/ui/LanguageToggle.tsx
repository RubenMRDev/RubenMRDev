import { useLanguage } from '../../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:border-neon/40 hover:glow-sm"
      aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
    >
      <span className={lang === 'es' ? 'text-neon' : 'text-text-muted'}>ES</span>
      <span className="text-text-muted">/</span>
      <span className={lang === 'en' ? 'text-neon' : 'text-text-muted'}>EN</span>
    </button>
  )
}
