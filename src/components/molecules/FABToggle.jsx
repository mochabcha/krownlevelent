import { motion } from 'framer-motion';
import { Icon } from '../atoms';

export default function FABToggle({ expanded, onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-14 h-14 rounded-full bg-brand-gold text-ink flex items-center justify-center shadow-xl shadow-brand-gold/30 ${className}`}
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
  );
}
