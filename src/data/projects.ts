import type { MiniProject, Project } from '../types'

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
    id: 'taskvia',
    title: {
      en: 'Taskvia',
      es: 'Taskvia',
    },
    description: {
      en: 'Desktop app for kanban boards and block-based markdown docs, 100% local, with an MCP server so your AI assistant creates, moves and documents tasks while it works.',
      es: 'App de escritorio con tableros kanban y documentación por bloques en markdown, 100% en local, con servidor MCP para que tu asistente de IA cree, mueva y documente tareas mientras trabaja.',
    },
    image: '/taskvia.webp',
    tags: ['Electron', 'JavaScript', 'MCP', 'Markdown'],
    category: 'desktop',
    difficulty: 4,
    github: 'https://github.com/RubenMRDev/taskvia',
  },
  {
    id: 'project-1',
    title: {
      en: 'Chordia',
      es: 'Chordia',
    },
    description: {
      en: 'Build chord progressions on the circle of fifths and play them on a multi-sampled piano. Includes 759 public-domain pieces with falling-notes practice mode and MIDI keyboard support.',
      es: 'Monta progresiones de acordes sobre el círculo de quintas y tócalas en un piano multi-muestreado. Incluye 759 piezas de dominio público con modo práctica de notas que caen y soporte para teclados MIDI.',
    },
    image: '/chordia.webp',
    tags: ['React', 'TypeScript', 'Firebase', 'Web Audio API'],
    category: 'fullstack',
    difficulty: 3.5,
    github: 'https://github.com/RubenMRDev/Chordia',
    demo: 'https://chordia.vercel.app/',
  },
  {
    id: 'project-2',
    title: {
      en: 'Quedi',
      es: 'Quedi',
    },
    description: {
      en: "Local-first personal budgeting SPA: plan monthly income across categories, track expenses, manage a prioritized wishlist and run 'can I afford this?' simulations, all client-side.",
      es: "SPA de presupuesto personal local-first: reparte tu ingreso mensual por categorías, registra gastos, gestiona una lista de deseos por prioridad y simula '¿puedo permitírmelo?', todo en el cliente.",
    },
    image: '/quedi.webp',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    category: 'fullstack',
    difficulty: 3.5,
    demo: 'https://budgetlyweb.vercel.app',
  }
]

export const miniProjects: MiniProject[] = [
  {
    id: 'valorant-vault',
    title: 'VALORANT Vault',
    description: {
      en: 'Explorer for the VALORANT API: agents, weapons, 1,300+ skins with video, maps and ranks, in 18 languages.',
      es: 'Explorador de la API de VALORANT: agentes, armas, más de 1.300 skins con vídeo, mapas y rangos, en 18 idiomas.',
    },
    tags: ['React', 'Vite', 'React Router'],
    github: 'https://github.com/RubenMRDev/ValorantVault',
    demo: 'https://valorant-vault-iota.vercel.app',
  },
  {
    id: 'pokedex',
    title: 'Pokédex Field Guide',
    description: {
      en: 'Illustrated Pokédex shaped like the device itself, over PokéAPI: type charts, shiny, cries and evolutions.',
      es: 'Pokédex ilustrada con forma del propio dispositivo, sobre PokéAPI: tabla de tipos, shiny, gritos y evoluciones.',
    },
    tags: ['React', 'Vite', 'PokéAPI'],
    github: 'https://github.com/RubenMRDev/pokedex-field-guide',
    demo: 'https://pokedex-field-guide.vercel.app',
  },
  {
    id: 'terraclicker',
    title: 'TerraClicker',
    description: {
      en: 'Idle clicker with the progression, materials, bosses and events of Terraria.',
      es: 'Clicker incremental con la progresión, los materiales, los jefes y los eventos de Terraria.',
    },
    tags: ['React', 'TypeScript'],
    github: 'https://github.com/RubenMRDev/terraclicker',
    demo: 'https://terraclicker-eta.vercel.app',
  },
  {
    id: 'mha-wiki',
    title: 'My Hero Academia Wiki',
    description: {
      en: 'Character cards and gallery loaded from JSON.',
      es: 'Fichas de personajes y galería cargadas desde JSON.',
    },
    tags: ['HTML', 'Bootstrap', 'JavaScript'],
    github: 'https://github.com/RubenMRDev/MHAWiki',
    demo: 'https://mha-wiki.vercel.app/',
  },
  {
    id: 'only-one-escapes',
    title: 'Only One Escapes',
    description: {
      en: 'Wheel-of-doom browser game with story, animations and sound.',
      es: 'Juego de ruleta del destino con historia, animaciones y sonido.',
    },
    tags: ['JavaScript', 'Bootstrap', 'SweetAlert'],
    github: 'https://github.com/RubenMRDev/OnlyOneEscapes',
    demo: 'https://only-one-escapes-project.vercel.app/',
  },
]
