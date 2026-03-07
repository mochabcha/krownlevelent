import { motion } from 'framer-motion';

const baseVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  eyebrow: 'span',
  body: 'p',
  lead: 'p',
  small: 'p',
  blockquote: 'blockquote',
};

const styleMap = {
  h1: 'font-heading text-4xl md:text-5xl tracking-tight',
  h2: 'font-heading text-3xl md:text-4xl tracking-tight',
  h3: 'font-heading text-2xl md:text-3xl',
  h4: 'font-heading text-xl md:text-2xl',
  h5: 'font-heading text-lg md:text-xl',
  h6: 'font-eyebrow text-lg md:text-xl tracking-wider uppercase',
  eyebrow: 'font-eyebrow text-sm md:text-base tracking-[0.2em] uppercase',
  body: 'font-body text-base',
  lead: 'font-body text-lg md:text-xl leading-relaxed',
  small: 'font-body text-sm',
  blockquote: 'font-eyebrow text-2xl md:text-3xl tracking-wide italic',
};

export default function Typography({
  variant = 'body',
  children,
  className = '',
  animate = false,
  delay = 0,
  gradient,
  as,
  ...props
}) {
  const Tag = as || tagMap[variant] || 'p';
  const baseStyle = styleMap[variant] || styleMap.body;

  const gradientClass =
    gradient === 'gold'
      ? 'text-gradient-gold'
      : gradient === 'purple'
      ? 'text-gradient-purple'
      : '';

  const combinedClass = `${baseStyle} ${gradientClass} ${className}`.trim();

  if (animate) {
    const MotionTag = motion[Tag] || motion.p;
    return (
      <MotionTag
        className={combinedClass}
        variants={baseVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <Tag className={combinedClass} {...props}>
      {children}
    </Tag>
  );
}
