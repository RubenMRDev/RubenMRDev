import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import Cursor from './components/ui/Cursor'
import SeasonLayer from './components/season/SeasonLayer'
import { startSmoothScroll } from './lib/scroll'

const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Experience = lazy(() => import('./components/sections/Experience'))

export default function App() {
  useEffect(startSmoothScroll, [])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    // Animations play even when the OS asks for reduced motion: the motion is
    // the point of this site. Only the wheel smoothing honours that setting.
    <MotionConfig reducedMotion="never">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-accent"
      />

      <Navbar />
      <main>
        <Hero />
        <Suspense>
          <About />
          <Skills />
          <Projects />
          <Experience />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <SeasonLayer />
      <Cursor />
    </MotionConfig>
  )
}
