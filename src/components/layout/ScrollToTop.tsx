import { useEffect, useState } from 'react'
import { scrollToTop } from '../../lib/scroll'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-canvas/80 text-small text-ink-2 backdrop-blur-xl transition-[opacity,transform,color] duration-500 ease-[var(--ease-out-expo)] hover:text-ink ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}
