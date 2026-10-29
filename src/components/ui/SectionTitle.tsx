import { motion } from 'motion/react'
import SplitReveal from '../fx/SplitReveal'

/** Numbered eyebrow with a rule that draws itself, then the title rises in. */
export default function SectionTitle({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4 font-mono text-micro uppercase text-ink-3">
        <span className="text-accent">{index}</span>
        <motion.span
          className="h-px w-16 origin-left bg-ink-3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {eyebrow}
      </div>
      <SplitReveal as="h2" text={title} className="block max-w-5xl font-display text-title font-bold text-ink" />
    </div>
  )
}
