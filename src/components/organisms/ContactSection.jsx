import { motion } from 'framer-motion';
import { SocialLink, ContactLink, SectionHeader, ProseBlock } from '../molecules';

const socialLinks = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
];

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          eyebrow="Let's Connect"
          heading="Connect with Charli"
          align="center"
          animate
          headingClassName="mb-10"
          className="mb-0"
        />

        <motion.div
          className="space-y-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProseBlock
            paragraphs={['Charli Smith', 'Krown Level Enterprises']}
            color="text-ink dark:text-white"
            spacing="mb-1"
          />

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
          <ProseBlock
            paragraphs={['Serving Jacksonville and surrounding communities through education, wellness, and practical training.']}
            color="text-ink-subtle"
          />
        </motion.div>
      </div>
    </section>
  );
}
