import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'quiet'
  /** Inverts the palette for use on the dark bands. */
  onDeep?: boolean
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-small font-medium transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]'

// The accent is light enough down here that it needs dark type on it, not white.
const styles = {
  light: {
    primary: 'bg-accent text-canvas hover:bg-accent-soft',
    secondary: 'border border-hairline text-ink hover:border-ink-3 hover:bg-canvas-2',
    quiet: 'text-accent hover:bg-accent/12',
  },
  deep: {
    primary: 'bg-deep-ink text-deep hover:bg-ink-2',
    secondary: 'border border-deep-line text-deep-ink hover:border-deep-ink-2 hover:bg-deep-2',
    quiet: 'text-accent-soft hover:bg-deep-ink/10',
  },
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  onDeep = false,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${styles[onDeep ? 'deep' : 'light'][variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
