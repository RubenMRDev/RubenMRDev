import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Language, Translations } from '../types'
import { en } from '../i18n/en'
import { es } from '../i18n/es'

interface LanguageContextType {
  lang: Language
  t: Translations
  toggleLang: () => void
}

const translations: Record<Language, Translations> = { en, es }

const LanguageContext = createContext<LanguageContextType | null>(null)

function getInitialLang(): Language {
  const saved = localStorage.getItem('lang') as Language | null
  if (saved === 'en' || saved === 'es') return saved
  return navigator.language.startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'es' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
