import { lazy, Suspense, useRef } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import { gsap, useGSAP, ScrollTrigger, ScrollSmoother, prefersReducedMotion } from './lib/gsap'

const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Contact = lazy(() => import('./components/sections/Contact'))

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true, // enables data-speed / data-lag on any element
    })

    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      }
    )

    // Every chunk that arrives late shifts the page height under ScrollSmoother.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  })

  return (
    <>
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left scale-x-0 bg-yellow"
      />
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
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
        </div>
      </div>

      <ScrollToTop />
    </>
  )
}
