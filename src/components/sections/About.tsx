import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'

const stats = [
  { value: '1+', key: 'yearsExp' as const },
  { value: '6', key: 'projectsCompleted' as const },
  { value: '16', key: 'techStack' as const },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
}

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t.about.title} />

        <div className="grid gap-14 md:grid-cols-[5fr_7fr] md:items-start">
          {/* Photo with offset editorial frame */}
          <motion.div className="relative max-w-[70%]" {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="absolute -bottom-3 -right-3 h-full w-full border border-yellow/40" />
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
              <img
                src="/myprofile.webp"
                alt="Rubén Martín Ruiz"
                className="h-full w-full object-cover grayscale-[0.2]"
              />
            </div>
            <p className="mt-4 text-sm text-muted">
              Rubén Martín Ruiz
            </p>
          </motion.div>

          {/* Bio + spec sheet */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">
              {t.about.bio}
            </p>

            <div className="mt-12 grid grid-cols-3 border-t border-line">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.key}
                  className={`py-6 ${i > 0 ? 'border-l border-line pl-5' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-4xl font-bold leading-none text-yellow md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-xs leading-snug text-muted">
                    {t.about[stat.key]}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
