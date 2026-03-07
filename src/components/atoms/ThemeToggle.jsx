import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import Icon from './Icon';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-brand-purple/10 text-ink-muted hover:text-brand-purple ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
      </motion.div>
    </button>
  );
}
