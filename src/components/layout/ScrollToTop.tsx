import { useState, useEffect } from 'react'
import { scrollToTop } from '../../lib/scroll'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center border border-line bg-surface text-ink transition-all duration-300 ease-out hover:border-yellow hover:text-yellow ${
        visible ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
      }`}
      aria-label="Scroll to top"
      aria-hidden={!visible}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
