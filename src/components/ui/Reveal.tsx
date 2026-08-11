import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to hold before starting. Use to stagger siblings. */
  delay?: number
  from?: 'bottom' | 'left' | 'right'
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'h2' | 'h3' | 'span'
}

// Short travel on purpose. Anything further reads as an effect rather than as
// the content simply arriving.
const OFFSET = { bottom: { y: 18 }, left: { x: -20 }, right: { x: 20 } }

/**
 * Fades an element in as it scrolls into view.
 *
 * Under prefers-reduced-motion only the fade plays: MotionConfig in App.tsx is
 * set to reducedMotion="user", which strips transform animations and leaves
 * opacity alone.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
  as = 'div',
}: RevealProps) {
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...OFFSET[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
