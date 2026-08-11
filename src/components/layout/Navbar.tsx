import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../lib/scroll'
import LanguageToggle from '../ui/LanguageToggle'

const navItems = ['about', 'skills', 'projects', 'experience', 'contact'] as const

const pill =
  'rounded-full border border-hairline bg-canvas/70 shadow-[0_8px_32px_-14px_rgba(0,0,0,0.75)] backdrop-blur-2xl backdrop-saturate-150'

export default function Navbar() {
  const { t } = useLanguage()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const currentY = window.scrollY
      setHidden(currentY > lastY && currentY > 220)
      lastY = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setIsMobileOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      {/* A floating pill rather than a full-width bar: it never touches the
          viewport edges, so the page reads as continuous behind it. The pill
          carries the sections and nothing else; language sits on its own. */}
      <nav
        className={`fixed inset-x-0 top-4 z-50 flex items-center justify-center px-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !isMobileOpen ? '-translate-y-[200%]' : 'translate-y-0'
        }`}
      >
        <div className={`hidden items-center gap-0.5 p-1.5 md:flex ${pill}`}>
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item)}
              className="rounded-full px-4 py-1.5 text-small text-ink-2 transition-colors duration-300 hover:bg-canvas-2 hover:text-ink"
            >
              {t.nav[item]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden ${pill}`}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <span
            className={`block h-px w-4 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${
              isMobileOpen ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-4 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${
              isMobileOpen ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>

        <div className={`absolute right-4 p-1 ${pill}`}>
          <LanguageToggle />
        </div>
      </nav>

      {/* Stays mounted so it can fade out; inert keeps it out of the tab order
          and the a11y tree while closed. */}
      <div
        inert={!isMobileOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-1 bg-canvas/95 px-6 backdrop-blur-2xl transition-opacity duration-500 ease-[var(--ease-out-expo)] md:hidden ${
          isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => scrollTo(item)}
            className="border-b border-hairline py-4 text-left text-heading font-medium text-ink"
          >
            {t.nav[item]}
          </button>
        ))}
      </div>
    </>
  )
}
