import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon } from '../atoms';
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
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Button
                    variant="secondary"
                    onClick={() => { downloadVCF(); setExpanded(false); }}
                    className="gap-2 shadow-xl shadow-brand-green/30 !bg-brand-green px-4 py-3 text-sm"
                  >
                    <Icon name="download" size={18} />
                    Save Contact
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="secondary"
                    href="#contact"
                    onClick={() => setExpanded(false)}
                    className="gap-2 shadow-xl shadow-brand-purple/30 px-4 py-3 text-sm"
                  >
                    <Icon name="mail" size={18} />
                    Book Now
                  </Button>
                </motion.div>
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
