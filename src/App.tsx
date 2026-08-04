import { lazy, Suspense, useEffect, useRef } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'

const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Contact = lazy(() => import('./components/sections/Contact'))

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null)

  // Reading progress. One rAF-throttled listener, no library.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left scale-x-0 bg-yellow"
      />
      <Navbar />
      <main>
        <Hero />
        <Suspense>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
