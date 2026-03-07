import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../atoms';
import { downloadVCF } from '@/utils/vcf';

export default function MobileFAB() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 lg:hidden flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {expanded && (
              <>
                <motion.button
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  onClick={() => {
                    downloadVCF();
                    setExpanded(false);
                  }}
                  className="flex items-center gap-2 bg-brand-green text-white px-4 py-3 rounded-full shadow-xl shadow-brand-green/30 font-eyebrow tracking-wider text-sm"
                  aria-label="Download Contact Card"
                >
                  <Icon name="download" size={18} />
                  Save Contact
                </motion.button>
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setExpanded(false)}
                  className="flex items-center gap-2 bg-brand-purple text-white px-4 py-3 rounded-full shadow-xl shadow-brand-purple/30 font-eyebrow tracking-wider text-sm"
                >
                  <Icon name="mail" size={18} />
                  Book Now
                </motion.a>
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-14 h-14 rounded-full bg-brand-gold text-ink flex items-center justify-center shadow-xl shadow-brand-gold/30"
            whileTap={{ scale: 0.9 }}
            aria-label="Quick actions"
          >
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name={expanded ? 'x' : 'arrow-right'} size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
