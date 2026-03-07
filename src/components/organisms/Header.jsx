import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo, Button, Icon, ThemeToggle } from '../atoms';
import { NavLink } from '../molecules';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Plant Klub', href: '#plant-klub' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Self Defense', href: '#sage-defense' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-surface-light/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 py-2'
            : 'bg-transparent py-4'
        } ${!scrolled ? 'text-ink dark:text-white' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <motion.div
              animate={{
                height: scrolled ? 40 : 56,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex items-center"
            >
              <Logo
                variant="wordmark"
                className={`transition-all duration-400 ${scrolled ? 'h-10' : 'h-14'} w-auto`}
              />
            </motion.div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="primary" href="#contact" className="text-sm px-6 py-2.5">
              Join / Book Now
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-purple/10 transition-colors text-ink dark:text-white"
              aria-label="Toggle menu"
            >
              <Icon name={mobileOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobile} />
            <motion.nav
              className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-surface-light dark:bg-dark-bg shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-surface-muted dark:border-dark-border">
                <Logo variant="emblem" size="xs" />
                <button
                  onClick={closeMobile}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-purple/10 text-ink dark:text-white"
                >
                  <Icon name="x" size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-1 p-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={closeMobile}
                      className="block py-3 px-4 font-eyebrow tracking-wider uppercase text-lg text-ink dark:text-white hover:text-brand-purple dark:hover:text-brand-purple-light hover:bg-brand-purple/5 rounded-xl transition-all"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-surface-muted dark:border-dark-border">
                <Button variant="cta" href="#contact" className="w-full text-center" onClick={closeMobile}>
                  Join / Book Now
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
