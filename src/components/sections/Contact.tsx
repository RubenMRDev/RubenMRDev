import { motion } from 'motion/react'
import { FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import SplitReveal from '../fx/SplitReveal'
import Magnetic from '../fx/Magnetic'

const EMAIL = 'rubenmrdev@gmail.com'

const socials = [
  { label: 'GitHub', href: 'https://github.com/RubenMRDev', Icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rubenmrdev/', Icon: FiLinkedin },
]

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative overflow-hidden px-5 pt-28 pb-16 md:px-10 md:pt-44">
      {/* A slow glow behind the call to action. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-[90rem]">
        <p className="mb-8 flex items-center gap-4 font-mono text-micro uppercase text-ink-3">
          <span className="text-accent">05</span> {t.contact.eyebrow}
        </p>

        <SplitReveal
          as="h2"
          by="char"
          stagger={0.025}
          text={t.contact.title}
          className="block font-display text-[clamp(2.5rem,11vw,11rem)] leading-[0.9] font-extrabold tracking-[-0.05em] text-ink"
        />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="max-w-xl text-lead text-ink-2"
          >
            {t.contact.subtitle}
          </motion.p>

          <Magnetic strength={0.25}>
            <a
              href={`mailto:${EMAIL}`}
              className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-accent text-center font-medium text-canvas md:h-52 md:w-52"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-2 px-6 leading-tight">
                <FiArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45" />
                {t.contact.send}
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
          <a
            href={`mailto:${EMAIL}`}
            className="group relative font-display text-2xl font-semibold text-ink md:text-4xl"
          >
            {EMAIL}
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
          </a>
          <div className="flex gap-3 md:ml-auto">
            {socials.map(({ label, href, Icon }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-canvas"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
