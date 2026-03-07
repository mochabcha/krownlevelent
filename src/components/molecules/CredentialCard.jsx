import { motion } from 'framer-motion';
import { Icon, Typography } from '../atoms';

export default function CredentialCard({
  icon,
  title,
  items = [],
  iconColor = 'text-brand-purple',
  className = '',
  animate = false,
  delay = 0,
}) {
  const content = (
    <div className={`bg-surface-light dark:bg-dark-elevated rounded-2xl p-6 border border-surface-muted dark:border-dark-border hover:shadow-xl hover:-translate-y-1 transition-all duration-400 h-full ${className}`}>
      <div className={`w-14 h-14 rounded-xl bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center ${iconColor} mb-5`}>
        <Icon name={icon} size={28} />
      </div>
      <Typography variant="h5" className="text-ink dark:text-white mb-4">
        {title}
      </Typography>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-ink-light dark:text-white/75">
            <Icon name="check" size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
            <span className="font-body text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
