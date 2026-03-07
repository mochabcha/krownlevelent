import { motion } from 'framer-motion';
import { Typography, Icon } from '../atoms';

const socialLinks = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
];

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Typography variant="eyebrow" animate className="text-brand-gold mb-3">
          Let&apos;s Connect
        </Typography>
        <Typography variant="h2" animate delay={0.1} className="text-ink dark:text-white mb-10">
          Connect with Charli
        </Typography>

        <motion.div
          className="space-y-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography variant="h4" className="text-ink dark:text-white">
            Charli Smith
          </Typography>
          <Typography variant="body" className="text-ink-muted">
            Krown Level Enterprises
          </Typography>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <a
              href="mailto:krownlevelent31@gmail.com"
              className="flex items-center gap-2 text-brand-purple hover:text-brand-purple-light transition-colors"
            >
              <Icon name="mail" size={18} />
              <span className="font-body">krownlevelent31@gmail.com</span>
            </a>
            <a
              href="tel:+19044423737"
              className="flex items-center gap-2 text-brand-purple hover:text-brand-purple-light transition-colors"
            >
              <Icon name="phone" size={18} />
              <span className="font-body">904-442-3737</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="w-12 h-12 rounded-full border border-surface-muted dark:border-dark-border flex items-center justify-center text-ink-muted hover:text-brand-purple hover:border-brand-purple dark:hover:text-brand-purple-light dark:hover:border-brand-purple-light transition-all hover:shadow-lg"
            >
              <Icon name={link.icon} size={20} />
            </a>
          ))}
          <a
            href="#"
            aria-label="TikTok"
            className="w-12 h-12 rounded-full border border-surface-muted dark:border-dark-border flex items-center justify-center text-ink-muted hover:text-brand-purple hover:border-brand-purple dark:hover:text-brand-purple-light dark:hover:border-brand-purple-light transition-all hover:shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Typography variant="small" className="text-ink-subtle">
            Serving Jacksonville and surrounding communities through education, wellness, and practical training.
          </Typography>
        </motion.div>
      </div>
    </section>
  );
}
