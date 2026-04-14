import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'transition-all duration-300 hover:glow-sm hover:border-neon/20',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
