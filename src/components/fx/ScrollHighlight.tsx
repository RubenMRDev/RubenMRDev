import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

/** A paragraph that starts dim and lights up word by word as it scrolls past. */
export default function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span aria-hidden style={{ opacity }} className="inline-block whitespace-pre motion-reduce:!opacity-100">
      {children}{' '}
    </motion.span>
  )
}
