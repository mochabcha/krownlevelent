import { motion } from 'framer-motion';
import { Icon, Typography } from '../atoms';

const variantStyles = {
  default: 'bg-surface-warm dark:bg-dark-surface border border-surface-muted dark:border-dark-border',
  elevated: 'bg-surface-light dark:bg-dark-elevated shadow-xl shadow-black/5 dark:shadow-black/20',
  glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10',
  gradient: 'bg-gradient-to-br from-brand-purple-50 to-brand-gold-50 dark:from-brand-purple-900/30 dark:to-brand-gold-900/30 border border-brand-purple-200/30 dark:border-brand-purple-800/30',
  accent: 'bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/20',
};

export default function Card({
  children,
  variant = 'default',
  icon,
  iconColor = 'text-brand-purple',
  title,
  subtitle,
  className = '',
  animate = false,
  delay = 0,
  hover = true,
  padding = 'p-6',
  rounded = 'rounded-2xl',
  onClick,
}) {
  const hoverClass = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-400'
    : 'transition-all duration-300';

  const content = (
    <div
      className={`${variantStyles[variant] || variantStyles.default} ${rounded} ${padding} ${hoverClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && (
        <div className={`mb-4 ${iconColor}`}>
          <Icon name={icon} size={32} />
        </div>
      )}
      {title && (
        <Typography variant="h5" className="mb-2 text-ink dark:text-white">
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="small" className="text-ink-muted mb-3">
          {subtitle}
        </Typography>
      )}
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
