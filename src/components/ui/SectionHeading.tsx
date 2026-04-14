import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-16 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-neon to-neon-dark" />
    </motion.div>
  )
}
