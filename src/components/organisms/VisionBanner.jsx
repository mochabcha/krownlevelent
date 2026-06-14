import { motion } from 'framer-motion';
import { QuoteBlock, SectionHeader, ProseBlock } from '../molecules';
import AdminEditButton from '../admin/AdminEditButton';

export default function VisionBanner({ content = {} }) {
  return (
    <section className="relative py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <AdminEditButton target={{ group: 'vision' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={content.eyebrow || 'A More Sustainable Way Forward'}
          heading={content.heading || 'The Vision'}
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
              ...(content.paragraphs || [
                'Krown Level Enterprises exists to help communities reclaim the skills that create resilience.',
                'By teaching agriculture education, wellness education, financial literacy, and self-defense together, Charli Smith is building more than programs. She is building pathways for people to become healthier, more capable, and more connected to the resources around them.',
                'This work is about more than information. It is about restoration, discipline, and long-term empowerment.',
              ]),
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
            quote={content.quote || 'Sustainability starts when people can feed themselves, care for themselves, manage their resources, and protect their peace.'}
            attribution={content.attribution || '— Charli Smith'}
            quoteColor="text-ink dark:text-white"
            attributionColor="text-brand-gold"
          />
        </motion.div>
      </div>
    </section>
  );
}
