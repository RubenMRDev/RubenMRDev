import { motion } from 'motion/react'

interface SectionHeadingProps {
  title: string
  /** Short mono kicker, e.g. "Selected work". */
  eyebrow: string
  onDeep?: boolean
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, margin: '0px 0px -12% 0px' }

/** Mono kicker over a tightly tracked title. Nothing else. */
export default function SectionHeading({
  title,
  eyebrow,
  onDeep = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <motion.p
        className={`font-mono text-micro uppercase ${onDeep ? 'text-accent-soft' : 'text-accent'}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {eyebrow}
      </motion.p>

      <h2 className="mt-4 overflow-hidden pb-[0.05em]">
        <motion.span
          className={`block text-title font-semibold ${onDeep ? 'text-deep-ink' : 'text-ink'}`}
          initial={{ opacity: 0, y: '55%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {title}
        </motion.span>
      </h2>
    </div>
  )
}
