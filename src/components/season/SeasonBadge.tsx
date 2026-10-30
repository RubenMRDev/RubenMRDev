import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { hideSeason, useSeason } from '../../lib/season'

/** The season's greeting next to the location, with a way to switch it all off. */
export default function SeasonBadge() {
  const { t } = useLanguage()
  const season = useSeason()

  return (
    <AnimatePresence>
      {season && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.6 }}
          className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 py-1 pr-1 pl-3 normal-case tracking-normal text-accent"
        >
          {t.season[season]}
          <button
            type="button"
            onClick={hideSeason}
            aria-label={t.season.hide}
            title={t.season.hide}
            className="flex h-5 w-5 items-center justify-center rounded-full text-accent/70 transition-colors hover:bg-accent/20 hover:text-accent"
          >
            ×
          </button>
        </motion.span>
      )}
    </AnimatePresence>
  )
}
