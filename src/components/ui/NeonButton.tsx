import { cn } from '../../utils/cn'
import { useMagnetic } from '../../hooks/useMagnetic'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  className?: string
  /** Pulls the button toward the cursor on hover. Desktop pointers only. */
  magnetic?: boolean
}

export default function NeonButton({
  children,
  variant = 'primary',
  href,
  className,
  magnetic = false,
  ...props
}: NeonButtonProps) {
  const magneticRef = useMagnetic<HTMLElement>(magnetic ? 0.35 : 0)

  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-3 text-sm font-medium transition-colors duration-300 cursor-pointer will-change-transform'

  const variants = {
    primary: 'bg-yellow text-bg font-medium hover:bg-yellow-deep',
    outline: 'border border-line text-ink hover:border-yellow hover:text-yellow',
  }

  const classes = cn(baseStyles, variants[variant], className)
  const ref = magnetic ? magneticRef : undefined

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...props}>
      {children}
    </button>
  )
}
