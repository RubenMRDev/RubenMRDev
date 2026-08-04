import { useState, useEffect, useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion, scrollToSection } from '../../lib/gsap'
import { useLanguage } from '../../context/LanguageContext'
import LanguageToggle from '../ui/LanguageToggle'

const navItems = ['about', 'skills', 'projects', 'experience', 'contact'] as const

export default function Navbar() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLButtonElement>(null)

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

  // The bar retracts on the way down and comes back the moment you scroll up.
  useGSAP(() => {
    gsap.to(navRef.current, {
      yPercent: hidden && !isMobileOpen ? -100 : 0,
      duration: prefersReducedMotion() ? 0 : 0.45,
      ease: 'power3.out',
    })
  }, { dependencies: [hidden, isMobileOpen] })

  // The menu stays mounted so it can animate out; `inert` keeps it off the
  // a11y tree and out of tab order while closed.
  useGSAP(() => {
    const calm = prefersReducedMotion()
    const [top, middle, bottom] = gsap.utils.toArray<HTMLElement>('span', barsRef.current)
    const tl = gsap.timeline({ defaults: { duration: calm ? 0 : 0.4, ease: 'power3.out' } })

    if (isMobileOpen) {
      tl.set(menuRef.current, { visibility: 'visible' })
        .to(menuRef.current, { opacity: 1 })
        .to(top, { rotate: 45, y: 7 }, 0)
        .to(middle, { opacity: 0, scaleX: 0 }, 0)
        .to(bottom, { rotate: -45, y: -7 }, 0)
        .from('[data-menu-item]', { opacity: 0, y: 24, stagger: calm ? 0 : 0.06 }, 0.1)
    } else {
      tl.to(menuRef.current, { opacity: 0, duration: calm ? 0 : 0.3 })
        .set(menuRef.current, { visibility: 'hidden' })
        .to(top, { rotate: 0, y: 0 }, 0)
        .to(middle, { opacity: 1, scaleX: 1 }, 0)
        .to(bottom, { rotate: 0, y: 0 }, 0)
    }
  }, { dependencies: [isMobileOpen] })

  const scrollTo = (id: string) => {
    scrollToSection(id)
    setIsMobileOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isScrolled
            ? 'border-b border-line bg-bg/85 backdrop-blur-sm'
            : 'border-b border-transparent bg-transparent'
        }`}
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
            ref={barsRef}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span className="block h-px w-6 origin-center bg-ink" />
            <span className="block h-px w-6 origin-center bg-ink" />
            <span className="block h-px w-6 origin-center bg-ink" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        inert={!isMobileOpen}
        className="invisible fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-bg/97 opacity-0 md:hidden"
      >
        {navItems.map((item) => (
          <button
            key={item}
            data-menu-item
            onClick={() => scrollTo(item)}
            className="text-3xl font-semibold text-ink transition-colors hover:text-yellow"
          >
            {t.nav[item]}
          </button>
        ))}
        <div data-menu-item>
          <LanguageToggle />
        </div>
      </div>
    </>
  )
}
