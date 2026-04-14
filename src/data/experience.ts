import type { ExperienceEntry } from '../types'

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-1',
    dateRange: {
      en: 'July 2025 - Present',
      es: 'Julio 2025 - Actualidad',
    },
    company: 'Renterus',
    role: {
      en: 'Fullstack Developer',
      es: 'Desarrollador Fullstack',
    },
    description: {
      en: [
        'Developing web applications using React and React Native',
        'Building backend APIs with PHP and CodeIgniter',
        'Collaborating with cross-functional teams to deliver features on time',
        'Implementing responsive designs and optimizing application performance',
      ],
      es: [
        'Desarrollando aplicaciones web utilizando React y React Native',
        'Construcción de APIs backend con PHP y CodeIgniter',
        'Participación en equipos multidisciplinares para entregar funcionalidades a tiempo',
        'Implementación de diseños responsive y optimización del rendimiento',
      ],
    },
    type: 'job',
  },
  {
    id: 'exp-2',
    dateRange: {
      en: 'March 2024 - June 2024',
      es: 'Marzo 2024 - Junio 2024',
    },
    company: 'Doblerc Studios',
    role: {
      en: 'Frontend Developer Intern',
      es: 'Becario Desarrollador Frontend',
    },
    description: {
      en: [
        'Built interactive UI components with WordPress and custom themes',
        'Designed frontend layouts and user interfaces for WordPress sites',
      ],
      es: [
        'Creación de componentes UI interactivos con WordPress y temas personalizados',
        'Diseño de layouts frontend e interfaces de usuario para sitios WordPress',
      ],
    },
    type: 'internship',
  },
  {
    id: 'exp-3',
    dateRange: {
      en: 'March 2022 - June 2023',
      es: 'Marzo 2022 - Junio 2023',
    },
    company: 'SeviManager',
    role: {
      en: 'Technician in Microcomputer Systems and Networks',
      es: 'Técnico en Sistemas Microinformáticos y Redes',
    },
    description: {
      en: [
        'Maintained and configured computer systems and hardware assembly',
        'Assisted with IT infrastructure, and customer databases',
        'Developed teamwork and collaboration skills in technical environments',
      ],
      es: [
        'Mantenimiento y configuración de sistemas informáticos y ensamblaje de hardware',
        'Asistencia en infraestructura TI, y bases de datos de clientes',
        'Desarrollo de habilidades de trabajo en equipo y colaboración en entornos técnicos',
      ],
    },
    type: 'internship',
  },
]
