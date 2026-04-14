import type { Project } from '../types'

// Proyecto fullstack:
//  id: 'project-1',
//     title: {
//       en: 'E-Commerce Platform',
//       es: 'Plataforma E-Commerce',
//     },
//     description: {
//       en: 'Full-stack e-commerce application with cart, payments, and admin dashboard.',
//       es: 'Aplicación e-commerce fullstack con carrito, pagos y panel de administración.',
//     },
//     image: '/projects/project-1.webp',
//     tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
//     category: 'fullstack',
//     github: 'https://github.com',
//     demo: 'https://example.com',
//   },

// Proyecto frontend:
//  {
//     id: 'project-5',
//     title: {
//       en: 'Portfolio Generator',
//       es: 'Generador de Portfolios',
//     },
//     description: {
//       en: 'A tool that generates customizable portfolio websites from a simple config file.',
//       es: 'Herramienta que genera portfolios personalizables desde un archivo de configuración.',
//     },
//     image: '/projects/project-5.webp',
//     tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
//     category: 'frontend',
//     github: 'https://github.com',
//     demo: 'https://example.com',
//   },

export const projects: Project[] = [
  {
    id: 'project-1',
    title: {
      en: 'Chordia',
      es: 'Chordia',
    },
    description: {
      en: 'Web application for beginner musicians that enables learning chords and progressions through interactive pianos.',
      es: 'Aplicacion web para musicos principantes que permite el aprendizaje de acordes y progresiones a traves de pianos interactivos.',
    },
    image: '/chordia.webp',
    tags: ['React', 'TypeScript', 'Firebase'],
    category: 'fullstack',
    difficulty: 3.5,
    github: 'https://github.com/RubenMRDev/Chordia',
    demo: 'https://chordia.vercel.app/',
  },
  {
    id: 'project-2',
    title: {
      en: 'Only One Escapes',
      es: 'Only One Escapes',
    },
    description: {
      en: 'Simple wheel of doom web game with animations, story, and sound effects.',
      es: 'Juego de rueda del destino interactivo con animaciones, historia y efectos de sonido.',
    },
    image: '/only-one-escapes.webp',
    tags: ['HTML', 'Bootstrap', 'CSS', 'JavaScript', 'SweetAlert'],
    category: 'frontend',
    difficulty: 2,
    github: 'https://github.com/RubenMRDev/OnlyOneEscapes',
    demo: 'https://only-one-escapes-project.vercel.app/',
  },
  {
    id: 'project-3',
    title: {
      en: 'My Hero Academia Wiki',
      es: 'Wiki de My Hero Academia',
    },
    description: {
      en: 'Interactive wiki for My Hero Academia characters and gallery',
      es: 'Wiki interactiva para personajes y galeria de My Hero Academia.',
    },
    image: '/mha-wiki.webp',
    tags: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'JSON'],
    category: 'frontend',
    difficulty: 1,
    github: 'https://github.com/RubenMRDev/MHAWiki',
    demo: 'https://mha-wiki.vercel.app/',
  }
]
