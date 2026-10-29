import type { Skill } from '../types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'SiReact', color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', icon: 'SiNextdotjs', color: '#F5F5F5', category: 'frontend' },
  { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6', category: 'frontend' },
  { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#38BDF8', category: 'frontend' },
  { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26', category: 'frontend' },
  { name: 'CSS3', icon: 'SiCss', color: '#2965F1', category: 'frontend' },
  // Backend
  { name: 'Node.js', icon: 'SiNodedotjs', color: '#5FA04E', category: 'backend' },
  { name: 'Express', icon: 'SiExpress', color: '#F5F5F5', category: 'backend' },
  { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248', category: 'backend' },
  { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28', category: 'backend' },
  { name: 'REST APIs', icon: 'SiOpenapiinitiative', color: '#6BA539', category: 'backend' },
  // Tools
  { name: 'Git', icon: 'SiGit', color: '#F05032', category: 'tools' },
  { name: 'VS Code', icon: 'VscCode', color: '#23A9F2', category: 'tools' },
  { name: 'Figma', icon: 'SiFigma', color: '#F24E1E', category: 'tools' },
  { name: 'Trello', icon: 'SiTrello', color: '#2684FF', category: 'tools' },
  { name: 'GitHub Actions', icon: 'SiGithubactions', color: '#2088FF', category: 'tools' },
]
