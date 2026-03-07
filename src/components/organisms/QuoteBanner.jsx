import { motion } from 'framer-motion';
import { Typography } from '../atoms';

export default function QuoteBanner({
  quote = '"Grow your food. Heal your body. Defend your peace."',
  attribution = '— Charli Smith',
  className = '',
  variant = 'galaxy',
}) {
  const bgMap = {
    galaxy: 'bg-galaxy-2 galaxy-stars',
    purple: 'bg-brand-indigo',
    gold: 'bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark',
  };

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${bgMap[variant] || bgMap.galaxy} ${className}`}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-brand-gold/30 text-8xl font-heading leading-none mb-4 select-none">
            &ldquo;
          </div>
          <Typography
            variant="blockquote"
            className="text-white mb-6 max-w-3xl mx-auto"
          >
            {quote.replace(/"/g, '')}
          </Typography>
          {attribution && (
            <Typography variant="eyebrow" className="text-brand-gold-light tracking-[0.3em]">
              {attribution}
            </Typography>
          )}
        </motion.div>
      </div>
    </section>
  );
}
