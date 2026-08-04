import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import { startSmoothScroll } from './lib/scroll'

const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Contact = lazy(() => import('./components/sections/Contact'))

export default function App() {
  useEffect(startSmoothScroll, [])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    // reducedMotion="user" keeps every fade but drops the travel for visitors
    // whose system asks for less motion.
    <MotionConfig reducedMotion="user">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-yellow"
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
    </MotionConfig>
  )
}
