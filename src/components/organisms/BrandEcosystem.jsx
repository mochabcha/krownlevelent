import { motion } from 'framer-motion';
import { PillarCard, SectionHeader, ProseBlock } from '../molecules';

const pillars = [
  {
    icon: 'flower',
    title: "Genie's Healing Elements",
    description: 'Holistic wellness consulting through herbs, nutrition, movement, and habit alignment.',
    color: 'text-brand-gold',
    href: '#wellness',
  },
  {
    icon: 'sprout',
    title: 'Plant Klub',
    description: 'Community gardening education, plant trading, workshops, and home garden installations.',
    color: 'text-brand-green',
    href: '#plant-klub',
  },
  {
    icon: 'shield',
    title: 'SAGE Defense Systems',
    description: 'Mindset-first self-defense training from foundational awareness to advanced readiness.',
    color: 'text-brand-purple',
    href: '#sage-defense',
  },
];

export default function BrandEcosystem() {
  return (
    <section className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Ecosystem"
          heading="What Is Krown Level Enterprises?"
          lead="Krown Level Enterprises is a community sustainability platform designed to help people build the skills and habits needed to live healthier, safer, and more self-sufficient lives."
          align="center"
          animate
          className="mb-14 max-w-3xl mx-auto"
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <PillarCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                iconColor={pillar.color}
                href={pillar.href}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ProseBlock
            paragraphs={['Different paths. One mission: helping people reclaim alignment, resilience, and independence.']}
            color="text-ink-light dark:text-white/75"
            className="italic"
          />
        </motion.div>
      </div>
    </section>
  );
}
