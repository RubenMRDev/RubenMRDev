import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection } from '../../hooks/useReveal'
import LanguageToggle from '../ui/LanguageToggle'

const navItems = ['about', 'skills', 'projects', 'experience', 'contact'] as const

export default function Navbar() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 50)
      setHidden(currentY > lastY && currentY > 200)
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
      <nav
        className={`fixed top-0 z-50 w-full transition-[transform,background-color,border-color] duration-300 ease-out ${
          isScrolled
            ? 'border-b border-line bg-bg/85 backdrop-blur-sm'
            : 'border-b border-transparent bg-transparent'
        } ${hidden && !isMobileOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
            className="text-lg font-bold tracking-tight text-ink transition-colors hover:text-yellow"
          >
            RMR<span className="text-yellow">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {t.nav[item]}
              </button>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span
              className={`block h-px w-6 origin-center bg-ink transition-transform duration-300 ease-out ${
                isMobileOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-opacity duration-300 ease-out ${
                isMobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-px w-6 origin-center bg-ink transition-transform duration-300 ease-out ${
                isMobileOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu: stays mounted so it can fade out; inert keeps it out of
          the tab order and the a11y tree while closed. */}
      <div
        inert={!isMobileOpen}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-bg/97 transition-opacity duration-300 ease-out md:hidden ${
          isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="text-3xl font-semibold text-ink transition-colors hover:text-yellow"
          >
            {t.nav[item]}
          </button>
        ))}
        <LanguageToggle />
      </div>
    </>
  )
}
