import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to hold before starting. Use to stagger siblings. */
  delay?: number
  /** Direction the element travels in from. */
  from?: 'bottom' | 'left' | 'right'
  as?: 'div' | 'section' | 'article' | 'p' | 'h2' | 'span'
}

const OFFSET = { bottom: { y: 26 }, left: { x: -32 }, right: { x: 32 } }

/**
 * Fades an element in as it scrolls into view.
 *
 * Under prefers-reduced-motion the travel is dropped and only the fade plays:
 * MotionConfig in App.tsx is set to reducedMotion="user", which strips transform
 * animations while leaving opacity alone.
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
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
