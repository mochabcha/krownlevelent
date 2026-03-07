import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTAGroup, FABToggle } from '../molecules';
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
                  <CTAGroup
                    primary={{
                      label: <><Icon name="download" size={18} /> Save Contact</>,
                      variant: 'secondary',
                      onClick: () => { downloadVCF(); setExpanded(false); },
                      className: 'gap-2 shadow-xl shadow-brand-green/30 !bg-brand-green px-4 py-3 text-sm',
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CTAGroup
                    primary={{
                      label: <><Icon name="mail" size={18} /> Book Now</>,
                      variant: 'secondary',
                      href: '#contact',
                      onClick: () => setExpanded(false),
                      className: 'gap-2 shadow-xl shadow-brand-purple/30 px-4 py-3 text-sm',
                    }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <FABToggle expanded={expanded} onClick={() => setExpanded(!expanded)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
