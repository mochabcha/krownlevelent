import { motion } from 'framer-motion';
import { AccordionItem, Card, SectionHeader, CTAGroup, ProseBlock, CheckList, BadgeGroup } from '../molecules';
import { resolveImage } from '../../content/imageRegistry';
import AdminEditButton from '../admin/AdminEditButton';
import AdminImageButton from '../admin/AdminImageButton';

const specialties = ['Chronic Pain', 'Terminal Illness', 'Anxiety', 'Insomnia'];

const accordionItems = [
  {
    title: 'Assessment',
    content: 'We begin by understanding where you are in your health journey, what challenges you\'re facing, and what level of support you need.',
  },
  {
    title: 'Alignment',
    content: 'We identify habits, lifestyle patterns, stressors, and physical needs that may be affecting your wellness.',
  },
  {
    title: 'Natural Support',
    content: 'Herbs, movement, nutritional shifts, and behavioral strategies are considered based on your goals and condition.',
  },
  {
    title: 'Ongoing Practice',
    content: 'Healing is a process. The goal is to build sustainable wellness habits that support long-term change.',
  },
];

export default function WellnessSection({ content = {}, mediaById = {} }) {
  const image = resolveImage(content.image, mediaById);
  const logoRef = content.logo || { assetKey: 'gheLogo', alt: "Genie's Healing Elements logo" };
  const logo = resolveImage(logoRef, mediaById);
  const specialties = content.specialties || ['Chronic Pain', 'Terminal Illness', 'Anxiety', 'Insomnia'];
  const accordionItems = content.processItems || [];

  return (
    <section id="wellness" className="relative py-20 md:py-28 bg-surface-warm dark:bg-dark-surface">
      <AdminEditButton target={{ group: 'wellness' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-20">
          <div className="flex-1">
            {logo.src && (
              <div className="relative mb-6 inline-block">
                <AdminImageButton target={{ blockKey: 'wellness', path: ['logo'], currentImageRef: logoRef }} />
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-28 w-auto object-contain md:h-36"
                  loading="lazy"
                />
              </div>
            )}
            <SectionHeader
              eyebrow={content.eyebrow || 'Holistic Wellness Consulting'}
              heading={content.heading || "Genie's Healing Elements"}
              animate
              headingClassName="mb-6"
              className="mb-0"
            />
            <ProseBlock
              animate
              baseDelay={0.2}
              spacing="mb-4"
              lastSpacing="mb-6"
              paragraphs={content.paragraphs || []}
            />

            <motion.div
              className="flex flex-wrap gap-2 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <BadgeGroup
                badges={specialties.map((s) => ({ label: s, color: 'gold' }))}
              />
            </motion.div>
          </div>

          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <AdminImageButton target={{ blockKey: 'wellness', path: ['image'] }} />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <Card variant="accent" padding="p-5">
                <SectionHeader eyebrow={content.audienceEyebrow || 'Who This Is For'} eyebrowColor="text-brand-purple" className="mb-2" />
                <CheckList
                  items={content.audienceItems || []}
                  textColor="text-ink-light dark:text-white/75"
                />
              </Card>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <SectionHeader
            eyebrow={content.processEyebrow || 'The Process'}
            heading={content.processHeading || 'How the Wellness Process Works'}
            headingVariant="h3"
            align="center"
            animate
            headingClassName="mb-8"
            className="mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {accordionItems.map((item, i) => (
              <AccordionItem key={item.title} title={item.title} index={i + 1}>
                {item.content}
              </AccordionItem>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-gradient-to-r from-brand-purple to-brand-indigo p-10 md:p-14 text-center">
            <SectionHeader
              heading={content.ctaHeading || 'Book a Wellness Consultation'}
              headingVariant="h3"
              lead={content.ctaLead || 'Ready to take a more intentional approach to your health? Start with a one-on-one consultation tailored to your goals and current wellness needs.'}
              align="center"
              onDark
              leadColor="text-white/80 max-w-2xl mx-auto"
              headingClassName="mb-4"
              className="mb-8"
            />
            <CTAGroup
              primary={{ label: content.ctaLabel || 'Book Your Consultation', href: content.ctaHref || '#contact', variant: content.ctaVariant || 'cta' }}
              align="center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
