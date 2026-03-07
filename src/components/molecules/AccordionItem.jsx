import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Typography } from '../atoms';

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className = '',
  index,
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
            <span className="font-eyebrow text-brand-gold text-lg tracking-wider">
              {String(index).padStart(2, '0')}
            </span>
          )}
          <Typography variant="h5" className="text-ink dark:text-white group-hover:text-brand-purple dark:group-hover:text-brand-purple-light transition-colors">
            {title}
          </Typography>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-purple flex-shrink-0 ml-4"
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
