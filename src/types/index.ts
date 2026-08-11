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
    name: string
    subtitle: string
    tagline: string
    cta1: string
    cta2: string
    location: string
    scroll: string
  }
  about: {
    eyebrow: string
    title: string
    bio: string
    detail: string
    yearsExp: string
    projectsCompleted: string
    techStack: string
  }
  skills: {
    eyebrow: string
    title: string
    frontend: string
    backend: string
    tools: string
    coverage: string
  }
  projects: {
    eyebrow: string
    title: string
    count: string
    frontend: string
    fullstack: string
    viewCode: string
    viewDemo: string
    open: string
  }
  experience: {
    eyebrow: string
    title: string
    present: string
    internship: string
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    send: string
  }
  footer: {
    rights: string
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
  /** The role still running. Set explicitly rather than inferred from order. */
  current?: boolean
}
