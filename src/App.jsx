import './App.css'
import React , { useState } from 'react'
import Stacks from './components/Stacks'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import ContactMe from './components/ContactMe'
import Footer from './components/Footer'
import Experience from './components/Experience'

function App() {

  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <>
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <Stacks />
      <Experience language={language}/>
      <Projects language={language}/>
      <ContactMe language={language}/>
      <Footer />
    </>
  )
}

export default App
