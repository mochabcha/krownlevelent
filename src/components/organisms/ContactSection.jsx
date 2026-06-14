import { motion } from 'framer-motion';
import { SocialLink, ContactLink, SectionHeader, ProseBlock } from '../molecules';
import AdminEditButton from '../admin/AdminEditButton';

const defaultSocialLinks = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
];

export default function ContactSection({ content = {}, siteContent = {} }) {
  const contact = siteContent.settings?.contact || {};
  const socialLinks = siteContent.settings?.socialLinks || defaultSocialLinks;

  return (
    <section className="relative py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <AdminEditButton target={{ group: 'contact' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          eyebrow={content.eyebrow || "Let's Connect"}
          heading={content.heading || 'Connect with Charli'}
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
            paragraphs={[contact.name || 'Charli Smith', contact.organization || 'Krown Level Enterprises']}
            color="text-ink dark:text-white"
            spacing="mb-1"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <ContactLink href={`mailto:${contact.email || 'krownlevelent31@gmail.com'}`} icon="mail">
              {contact.email || 'krownlevelent31@gmail.com'}
            </ContactLink>
            <ContactLink href={`tel:${contact.phoneHref || '+19044423737'}`} icon="phone">
              {contact.phone || '904-442-3737'}
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
              icon={link.icon || link.platform}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ProseBlock
            paragraphs={[content.description || 'Serving Jacksonville and surrounding communities through education, wellness, and practical training.']}
            color="text-ink-subtle"
          />
        </motion.div>
      </div>
    </section>
  );
}
