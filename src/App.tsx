import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import Spotlight from './components/fx/Spotlight'
import ScrollProgress from './components/fx/ScrollProgress'
import { startSmoothScroll } from './lib/scroll'

export default function App() {
  useEffect(startSmoothScroll, [])

  return (
    // reducedMotion="user" keeps the fades but drops the travel for visitors
    // whose system asks for less motion.
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <ScrollProgress />
        <Spotlight />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
