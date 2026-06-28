import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ title, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.h2
      className={`mb-14 text-4xl font-bold tracking-tight text-ink md:text-5xl ${
        align === 'center' ? 'text-center' : ''
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {title}
      <span className="text-yellow">.</span>
    </motion.h2>
  )
}
