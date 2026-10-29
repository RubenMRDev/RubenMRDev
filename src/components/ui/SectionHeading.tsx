import { motion } from 'motion/react'
import SplitText from './SplitText'

interface SectionHeadingProps {
  title: string
  /** Short mono kicker, e.g. "Selected work". */
  eyebrow: string
  onDeep?: boolean
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, margin: '0px 0px -12% 0px' }

/** Mono kicker behind a rule that draws itself, then the title rises word by word. */
export default function SectionHeading({
  title,
  eyebrow,
  onDeep = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className={`flex items-center gap-3 font-mono text-micro uppercase ${onDeep ? 'text-accent-soft' : 'text-accent'}`}>
        <motion.span
          aria-hidden
          className="h-px w-8 origin-left bg-current"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
      </div>

      <h2 className={`mt-4 text-title font-semibold ${onDeep ? 'text-deep-ink' : 'text-ink'}`}>
        <SplitText text={title} delay={0.15} />
      </h2>
    </div>
  )
}
