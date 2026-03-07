import { motion } from 'framer-motion';
import Icon from './Icon';

const colorMap = {
  purple: 'bg-brand-purple-100 dark:bg-brand-purple-900 text-brand-purple-700 dark:text-brand-purple-300',
  gold: 'bg-brand-gold-100 dark:bg-brand-gold-900 text-brand-gold-700 dark:text-brand-gold-300',
  green: 'bg-brand-green-100 dark:bg-brand-green-900 text-brand-green-700 dark:text-brand-green-300',
  neutral: 'bg-surface-cream dark:bg-dark-elevated text-ink-light dark:text-white/75',
};

export default function Badge({
  children,
  color = 'purple',
  icon,
  className = '',
  animate = false,
  delay = 0,
}) {
  const base = `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-body font-medium ${colorMap[color] || colorMap.purple} ${className}`;

  if (animate) {
    return (
      <motion.span
        className={base}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
      >
        {icon && <Icon name={icon} size={14} />}
        {children}
      </motion.span>
    );
  }

  return (
    <span className={base}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}
