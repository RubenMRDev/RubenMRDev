import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import ScrollToTop from './components/layout/ScrollToTop'

const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Contact = lazy(() => import('./components/sections/Contact'))

export default function App() {
  return (
    <>
      <CustomCursor />
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
