import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Typography } from '../atoms';

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className = '',
  index,
  indexClassName = 'text-brand-gold',
  titleClassName = 'group-hover:text-brand-purple dark:group-hover:text-brand-purple-light',
  iconClassName = 'text-brand-purple',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-surface-muted dark:border-dark-border ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {index !== undefined && (
            <span className={`font-eyebrow text-lg tracking-wider ${indexClassName}`}>
              {String(index).padStart(2, '0')}
            </span>
          )}
          <Typography variant="h5" className={`text-ink dark:text-white transition-colors ${titleClassName}`}>
            {title}
          </Typography>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 ml-4 ${iconClassName}`}
        >
          <Icon name="chevron-down" size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-ink-light dark:text-white/75 font-body leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
