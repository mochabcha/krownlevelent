import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-brand-gold text-ink dark:text-dark-bg font-eyebrow tracking-wider uppercase px-8 py-3 rounded-full hover:bg-brand-gold-light shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40',
  secondary:
    'bg-brand-purple text-white font-eyebrow tracking-wider uppercase px-8 py-3 rounded-full hover:bg-brand-purple-light shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40',
  outline:
    'border-2 border-brand-purple text-brand-purple dark:text-brand-purple-light dark:border-brand-purple-light font-eyebrow tracking-wider uppercase px-8 py-3 rounded-full hover:bg-brand-purple hover:text-white',
  ghost:
    'text-brand-purple dark:text-brand-purple-light font-eyebrow tracking-wider uppercase px-6 py-3 rounded-full hover:bg-brand-purple/10',
  cta:
    'bg-gradient-to-r from-brand-gold to-brand-gold-light text-ink font-eyebrow tracking-wider uppercase px-10 py-4 rounded-full text-lg shadow-xl shadow-brand-gold/30 hover:shadow-brand-gold/50 hover:scale-105',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  onClick,
  animate = false,
  delay = 0,
  ...props
}) {
  const baseClass = `inline-flex items-center justify-center transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${variants[variant] || variants.primary} ${className}`;

  const content = href ? (
    <a href={href} className={baseClass} {...props}>
      {children}
    </a>
  ) : (
    <button className={baseClass} onClick={onClick} {...props}>
      {children}
    </button>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
