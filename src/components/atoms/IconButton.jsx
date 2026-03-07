import { motion } from 'framer-motion';
import { Icon } from './index';

export default function IconButton({
  name,
  size = 20,
  onClick,
  href,
  className = '',
  label,
  animate = false,
  ...props
}) {
  const baseClass = `w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-purple/10 transition-colors text-ink dark:text-white ${className}`;

  const content = href ? (
    <a href={href} aria-label={label} className={baseClass} {...props}>
      <Icon name={name} size={size} />
    </a>
  ) : (
    <button onClick={onClick} aria-label={label} className={baseClass} {...props}>
      <Icon name={name} size={size} />
    </button>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
