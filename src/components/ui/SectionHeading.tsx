interface SectionHeadingProps {
  title: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ title, align = 'left' }: SectionHeadingProps) {
  return (
    <h2
      data-reveal
      className={`mb-14 text-4xl font-bold tracking-tight text-ink md:text-5xl ${
        align === 'center' ? 'text-center' : ''
      }`}
    >
      {title}
      <span className="text-yellow">.</span>
    </h2>
  )
}
