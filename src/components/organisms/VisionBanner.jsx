import { motion } from 'framer-motion';
import { QuoteBlock, SectionHeader, ProseBlock } from '../molecules';

export default function VisionBanner() {
  return (
    <section className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="A More Sustainable Way Forward"
          heading="The Vision"
          align="center"
          animate
          headingClassName="mb-8"
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6 text-center"
        >
          <ProseBlock
            paragraphs={[
              'Krown Level Enterprises exists to help communities reclaim the skills that create resilience.',
              'By teaching wellness, agriculture, and self-defense together, Charli Smith is building more than programs. She is building pathways for people to become healthier, more capable, and more connected to the resources around them.',
              'This work is about more than information. It is about restoration, discipline, and long-term empowerment.',
            ]}
            color="text-ink-light dark:text-white/75"
            spacing="mb-0"
          />
        </motion.div>

        <motion.div
          className="mt-12 p-8 rounded-2xl bg-surface-warm dark:bg-dark-surface border border-surface-muted dark:border-dark-border text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <QuoteBlock
            quote="Sustainability starts when people can care for themselves, feed themselves, and protect their peace."
            attribution="— Charli Smith"
            quoteColor="text-ink dark:text-white"
            attributionColor="text-brand-gold"
          />
        </motion.div>
      </div>
    </section>
  );
}
