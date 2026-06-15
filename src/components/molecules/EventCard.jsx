import { motion } from 'framer-motion';
import { Icon, RichText, Typography, Button } from '../atoms';
import { hasRichText } from '../../utils/richText';

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  price,
  ctaText = 'Reserve Your Spot',
  ctaHref = '#contact',
  className = '',
  animate = false,
  delay = 0,
}) {
  const content = (
    <div className={`bg-surface-light dark:bg-dark-elevated rounded-2xl border border-surface-muted dark:border-dark-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400 ${className}`}>
      <div className="h-2 bg-gradient-to-r from-brand-purple via-brand-gold to-brand-green" />
      <div className="p-6">
        <Typography variant="eyebrow" className="text-brand-gold mb-2">
          Upcoming Event
        </Typography>
        <Typography variant="h4" className="text-ink dark:text-white mb-4">
          {title}
        </Typography>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-ink-muted">
            <Icon name="calendar" size={16} />
            <span className="font-body text-sm">{date}</span>
          </div>
          {time && (
            <div className="flex items-center gap-2 text-ink-muted">
              <Icon name="clock" size={16} />
              <span className="font-body text-sm">{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 text-ink-muted">
              <Icon name="map-pin" size={16} />
              <span className="font-body text-sm">{location}</span>
            </div>
          )}
        </div>

        {description && (
          <Typography variant="body" as={hasRichText(description) ? 'div' : undefined} className="text-ink-light dark:text-white/75 mb-4">
            <RichText value={description} />
          </Typography>
        )}

        <div className="flex items-center justify-between mt-4">
          {price && (
            <Typography variant="h5" className="text-brand-gold">
              {price}
            </Typography>
          )}
          <Button variant="primary" href={ctaHref} className="text-sm px-6 py-2">
            {ctaText}
          </Button>
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
