import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'

const stats = [
  { value: '1+', key: 'yearsExp' as const },
  { value: '3', key: 'projectsCompleted' as const },
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
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t.about.title} />

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Photo */}
          <motion.div
            className="flex justify-center"
            {...fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-72 w-72 overflow-hidden rounded-2xl md:h-80 md:w-80">
              <img
                src="/myprofile.webp"
                alt="Rubén Martín Ruiz"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              {t.about.bio}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.key}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-neon">{stat.value}</div>
                  <div className="mt-1 text-xs text-text-muted">{t.about[stat.key]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
