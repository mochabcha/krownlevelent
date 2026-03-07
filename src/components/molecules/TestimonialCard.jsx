import { motion } from 'framer-motion';
import { Icon, Typography } from '../atoms';

export default function TestimonialCard({
  quote,
  author,
  role,
  className = '',
  animate = false,
  delay = 0,
}) {
  const content = (
    <div className={`bg-surface-light dark:bg-dark-elevated rounded-2xl p-8 border border-surface-muted dark:border-dark-border relative ${className}`}>
      <div className="absolute top-4 left-6 text-brand-gold/30 text-6xl font-heading leading-none select-none">
        &ldquo;
      </div>
      <div className="relative z-10 pt-6">
        <Typography variant="body" className="text-ink-light dark:text-ink-muted italic leading-relaxed mb-6">
          {quote}
        </Typography>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple">
            <Icon name="users" size={18} />
          </div>
          <div>
            <Typography variant="small" className="font-semibold text-ink dark:text-white">
              {author}
            </Typography>
            {role && (
              <Typography variant="small" className="text-ink-muted text-xs">
                {role}
              </Typography>
            )}
          </div>
        </div>
      </div>
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
