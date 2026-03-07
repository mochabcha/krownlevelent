import { motion } from 'framer-motion';
import { Icon, Typography } from '../atoms';

export default function QuickJumpItem({
  icon,
  label,
  href,
  className = '',
  animate = false,
  delay = 0,
}) {
  const content = (
    <a
      href={href}
      className={`flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-warm dark:bg-dark-surface border border-surface-muted dark:border-dark-border hover:border-brand-purple/40 dark:hover:border-brand-purple/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 group cursor-pointer ${className}`}
    >
      <div className="w-14 h-14 rounded-xl bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
        <Icon name={icon} size={28} />
      </div>
      <Typography variant="eyebrow" className="text-ink-light dark:text-white/75 group-hover:text-brand-purple dark:group-hover:text-brand-purple-light transition-colors text-center">
        {label}
      </Typography>
    </a>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
