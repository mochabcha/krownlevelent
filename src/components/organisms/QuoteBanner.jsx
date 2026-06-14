import { motion } from 'framer-motion';
import { QuoteBlock } from '../molecules';
import AdminEditButton from '../admin/AdminEditButton';

export default function QuoteBanner({
  content = {},
  quote = '"Grow your food. Heal your body. Defend your peace."',
  attribution = '— Charli Smith',
  className = '',
  variant = 'galaxy',
}) {
  const resolvedQuote = content.quote || quote;
  const resolvedAttribution = content.attribution || attribution;
  const resolvedVariant = content.variant || variant;
  const bgMap = {
    galaxy: 'bg-galaxy-2 galaxy-stars',
    purple: 'bg-brand-indigo',
    gold: 'bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark',
  };

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${bgMap[resolvedVariant] || bgMap.galaxy} ${className}`}>
      <AdminEditButton target={{ group: 'quote-banner' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <QuoteBlock
            quote={resolvedQuote}
            attribution={resolvedAttribution}
          />
        </motion.div>
      </div>
    </section>
  );
}
