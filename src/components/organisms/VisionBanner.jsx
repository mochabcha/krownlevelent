import { motion } from 'framer-motion';
import { Typography } from '../atoms';

export default function VisionBanner() {
  return (
    <section className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Typography variant="eyebrow" animate className="text-brand-gold mb-3 text-center">
            A More Sustainable Way Forward
          </Typography>
          <Typography variant="h2" animate delay={0.1} className="text-ink dark:text-white mb-8">
            The Vision
          </Typography>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          <Typography variant="lead" className="text-ink-light dark:text-white/75 text-center leading-relaxed">
            Krown Level Enterprises exists to help communities reclaim the skills that create resilience.
          </Typography>
          <Typography variant="body" className="text-ink-light dark:text-white/75 text-center leading-relaxed">
            By teaching wellness, agriculture, and self-defense together, Charli Smith is building more than programs. She is building pathways for people to become healthier, more capable, and more connected to the resources around them.
          </Typography>
          <Typography variant="body" className="text-ink-light dark:text-white/75 text-center leading-relaxed">
            This work is about more than information. It is about restoration, discipline, and long-term empowerment.
          </Typography>
        </motion.div>

        <motion.div
          className="mt-12 p-8 rounded-2xl bg-surface-warm dark:bg-dark-surface border border-surface-muted dark:border-dark-border text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-brand-gold/40 text-5xl font-heading leading-none mb-3 select-none">
            &ldquo;
          </div>
          <Typography variant="blockquote" className="text-ink dark:text-white mb-4 text-xl md:text-2xl">
            Sustainability starts when people can care for themselves, feed themselves, and protect their peace.
          </Typography>
          <Typography variant="eyebrow" className="text-brand-gold tracking-[0.3em]">
            — Charli Smith
          </Typography>
        </motion.div>
      </div>
    </section>
  );
}
