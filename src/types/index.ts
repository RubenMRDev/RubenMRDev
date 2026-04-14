export type Language = 'en' | 'es'

export interface Translations {
  nav: {
    about: string
    skills: string
    projects: string
    experience: string
    contact: string
  }
  hero: {
    greeting: string
    name: string
    subtitle: string
    cta1: string
    cta2: string
  }
  about: {
    title: string
    bio: string
    yearsExp: string
    projectsCompleted: string
    techStack: string
  }
  skills: {
    title: string
    frontend: string
    backend: string
    tools: string
  }
  projects: {
    title: string
    filterAll: string
    filterFrontend: string
    filterFullstack: string
    viewCode: string
    viewDemo: string
  }
  experience: {
    title: string
    present: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    sending: string
    sent: string
    error: string
  }
  footer: {
    rights: string
    builtWith: string
  }
}

export interface Project {
  id: string
  title: { en: string; es: string }
  description: { en: string; es: string }
  image: string
  tags: string[]
  category: 'frontend' | 'fullstack' | 'other'
  difficulty: number
  github?: string
  demo?: string
}

export interface Skill {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools'
}

export interface ExperienceEntry {
  id: string
  dateRange: { en: string; es: string }
  company: string
  role: { en: string; es: string }
  description: { en: string[]; es: string[] }
  type: 'internship' | 'job'
}
