import { motion } from 'framer-motion';
import { AccordionItem, Card, SectionHeader, CTAGroup, ProseBlock, CheckList, BadgeGroup } from '../molecules';
import charliImg from '@assets/images/IMG_0155.webp';

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

export default function WellnessSection() {
  return (
    <section id="wellness" className="py-20 md:py-28 bg-surface-warm dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-20">
          <div className="flex-1">
            <SectionHeader
              eyebrow="Holistic Wellness Consulting"
              heading="Genie's Healing Elements"
              animate
              headingClassName="mb-6"
              className="mb-0"
            />
            <ProseBlock
              animate
              baseDelay={0.2}
              spacing="mb-4"
              lastSpacing="mb-6"
              paragraphs={[
                "Genie's Healing Elements helps clients restore optimal wellness through personalized strategies built around herbs, nutrition, movement, and habit alignment.",
                'This work is designed for people who want a more natural, intentional approach to healing and wellness support.',
                'Charli helps clients assess where they are now, identify what may be throwing them out of alignment, and create a realistic wellness path forward.',
              ]}
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
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={charliImg}
                  alt="Charli Smith — Wellness & Style"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <Card variant="accent" padding="p-5">
                <SectionHeader eyebrow="Who This Is For" eyebrowColor="text-brand-purple" className="mb-2" />
                <CheckList
                  items={[
                    'People seeking natural wellness approaches',
                    'Those dealing with chronic conditions',
                    'Anyone wanting more intentional health habits',
                    'Those looking for personalized guidance',
                  ]}
                  textColor="text-ink-light dark:text-white/75"
                />
              </Card>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <SectionHeader
            eyebrow="The Process"
            heading="How the Wellness Process Works"
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
              heading="Book a Wellness Consultation"
              headingVariant="h3"
              lead="Ready to take a more intentional approach to your health? Start with a one-on-one consultation tailored to your goals and current wellness needs."
              align="center"
              onDark
              leadColor="text-white/80 max-w-2xl mx-auto"
              headingClassName="mb-4"
              className="mb-8"
            />
            <CTAGroup
              primary={{ label: 'Book Your Consultation', href: '#contact' }}
              align="center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
