import { motion } from 'motion/react'

interface SplitTextProps {
  text: string
  className?: string
  /** Per letter for headlines, per word for longer lines. */
  by?: 'char' | 'word'
  delay?: number
  /** Play as soon as this turns true instead of when scrolled into view. */
  play?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Each piece rises out of its own clipping mask, one after another. Screen
 * readers get the whole string from aria-label and skip the pieces.
 */
export default function SplitText({ text, className, by = 'word', delay = 0, play }: SplitTextProps) {
  const step = by === 'char' ? 0.028 : 0.07
  const words = text.split(' ')
  let index = 0

  const trigger =
    play !== undefined
      ? { animate: play ? 'show' : 'hidden' }
      : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <motion.span aria-label={text} initial="hidden" {...trigger} className={`block ${className ?? ''}`}>
      {words.map((word, w) => (
        // nowrap keeps a word whole; letters wrapping mid-word would read as a bug.
        <span key={w} aria-hidden className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom">
          {(by === 'char' ? [...word] : [word]).map((piece, c) => (
            <motion.span
              key={c}
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.9, ease: EASE, delay: delay + index++ * step } },
              }}
            >
              {piece}
            </motion.span>
          ))}
          {w < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
