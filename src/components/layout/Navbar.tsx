import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { scrollToSection, scrollToTop } from '../../lib/scroll'
import LanguageToggle from '../ui/LanguageToggle'

const links = ['about', 'skills', 'projects', 'experience', 'contact'] as const

/** Floating pill that tucks away while scrolling down and returns on the way up. */
export default function Navbar() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(y > previous && y > 200)
  })

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : 0.2 }}
    >
      <nav className="flex items-center gap-1 rounded-full border border-line bg-canvas/70 p-1.5 pl-4 backdrop-blur-xl">
        <button
          type="button"
          onClick={scrollToTop}
          className="mr-2 font-display text-[0.95rem] font-bold tracking-tight text-ink"
        >
          rmr<span className="text-accent">.</span>
        </button>
        <ul className="hidden items-center md:flex">
          {links.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                className="group relative overflow-hidden rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                  {t.nav[id]}
                </span>
                <span className="absolute inset-x-3.5 top-full block text-accent transition-transform duration-500 ease-out-expo group-hover:-translate-y-[calc(100%+0.5rem)]">
                  {t.nav[id]}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="ml-1 rounded-full border border-line">
          <LanguageToggle />
        </div>
      </nav>
    </motion.header>
  )
}
