import { cn } from '../../utils/cn'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  className?: string
}

export default function NeonButton({ children, variant = 'primary', href, className, ...props }: NeonButtonProps) {
  const baseStyles = 'relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer'

  const variants = {
    primary: 'bg-neon text-dark font-semibold hover:glow-md hover:bg-neon/90',
    outline: 'border border-neon text-neon hover:bg-neon/10 hover:glow-sm',
  }

  const classes = cn(baseStyles, variants[variant], className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
