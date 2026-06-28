import { useLanguage } from '../../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium transition-colors duration-300 hover:border-yellow/50"
      aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
    >
      <span className={lang === 'es' ? 'text-yellow' : 'text-muted'}>ES</span>
      <span className="text-muted">/</span>
      <span className={lang === 'en' ? 'text-yellow' : 'text-muted'}>EN</span>
    </button>
  )
}
