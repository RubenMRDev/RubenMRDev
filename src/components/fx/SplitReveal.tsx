import { motion } from 'motion/react'
import type { ElementType } from 'react'

interface SplitRevealProps {
  text: string
  as?: ElementType
  className?: string
  /** Split per letter (headline) or per word (sentences). */
  by?: 'char' | 'word'
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

/**
 * Each word sits in its own clipping mask and slides up from below it. Screen
 * readers get the full string from aria-label; the pieces are hidden from them.
 */
export default function SplitReveal({
  text,
  as: Tag = 'span',
  className,
  by = 'word',
  delay = 0,
  stagger,
  immediate = false,
}: SplitRevealProps) {
  const step = stagger ?? (by === 'char' ? 0.03 : 0.06)
  let index = 0

  const trigger = immediate
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <Tag className={className} aria-label={text}>
      {/* Needs a real box: an IntersectionObserver never fires on display: contents. */}
      <motion.span aria-hidden initial="hidden" {...trigger} className="block">
        {text.split(' ').map((word, w) => (
          <span key={w} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom whitespace-nowrap">
            {(by === 'char' ? [...word] : [word]).map((piece, c) => (
              <motion.span
                key={c}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: '115%', rotate: 6 },
                  shown: {
                    y: '0%',
                    rotate: 0,
                    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + index++ * step },
                  },
                }}
              >
                {piece}
              </motion.span>
            ))}
            {w < text.split(' ').length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
