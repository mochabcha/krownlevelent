import { motion } from 'framer-motion';
import { Icon, Typography } from '../atoms';

const items = [
  { icon: 'heart', label: 'Holistic Wellness' },
  { icon: 'sprout', label: 'Community Agriculture' },
  { icon: 'shield', label: 'Self-Defense Training' },
  { icon: 'map-pin', label: 'Jacksonville Based' },
];

export default function TrustRibbon({ className = '' }) {
  return (
    <div className={`w-full py-4 border-t border-b border-surface-muted/50 dark:border-dark-border/50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 text-ink-muted"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Icon name={item.icon} size={16} className="text-brand-gold" />
              <Typography variant="eyebrow" className="text-ink-muted text-xs">
                {item.label}
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
