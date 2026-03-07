import { motion } from 'framer-motion';
import { Typography } from '../atoms';
import { SocialLink, ContactLink } from '../molecules';

const socialLinks = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
];

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Typography variant="eyebrow" animate className="text-brand-gold mb-3 text-center">
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
            <ContactLink href="mailto:krownlevelent31@gmail.com" icon="mail">
              krownlevelent31@gmail.com
            </ContactLink>
            <ContactLink href="tel:+19044423737" icon="phone">
              904-442-3737
            </ContactLink>
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
            <SocialLink
              key={link.label}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
          <SocialLink href="#" label="TikTok" icon="tiktok" />
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
