import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import LanguageToggle from '../ui/LanguageToggle'

const navItems = ['about', 'skills', 'projects', 'experience', 'contact'] as const

export default function Navbar() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 50)
      setHidden(currentY > lastScrollY && currentY > 200)
      setLastScrollY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'glass' : 'bg-transparent'
        }`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
            className="text-lg font-bold text-white transition-colors hover:text-neon"
          >
            RMR
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm text-text-muted transition-colors hover:text-neon"
              >
                {t.nav[item]}
              </button>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={isMobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={isMobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-2xl font-medium text-white transition-colors hover:text-neon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {t.nav[item]}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <LanguageToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
