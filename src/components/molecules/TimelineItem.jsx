import { motion } from 'framer-motion';
import { Typography } from '../atoms';

export default function TimelineItem({
  level,
  title,
  description,
  isLast = false,
  animate = false,
  delay = 0,
  className = '',
}) {
  const content = (
    <div className={`flex gap-4 md:gap-6 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center text-white font-eyebrow text-sm tracking-wider flex-shrink-0">
          {level}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-brand-purple/60 to-brand-purple/10 mt-2" />
        )}
      </div>
      <div className="pb-8">
        <Typography variant="h5" className="text-ink dark:text-white mb-1">
          {title}
        </Typography>
        <Typography variant="body" className="text-ink-light dark:text-ink-muted leading-relaxed">
          {description}
        </Typography>
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
