import { cn } from '../../utils/cn'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  className?: string
}

export default function NeonButton({ children, variant = 'primary', href, className, ...props }: NeonButtonProps) {
  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-[colors,transform] duration-300 ease-out cursor-pointer hover:-translate-y-0.5'

  const variants = {
    primary: 'bg-yellow text-bg font-medium hover:bg-yellow-deep',
    outline: 'border border-line text-ink hover:border-yellow hover:text-yellow',
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
