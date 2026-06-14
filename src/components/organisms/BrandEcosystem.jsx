import { motion } from 'framer-motion';
import { PillarCard, SectionHeader, ProseBlock } from '../molecules';
import AdminEditButton from '../admin/AdminEditButton';

const defaultPillars = [
  {
    icon: 'sprout',
    title: 'Agriculture Education',
    description: 'Hands-on gardening, food systems, plant stewardship, and community growing skills.',
    color: 'text-brand-green',
    href: '#plant-klub',
  },
  {
    icon: 'heart',
    title: 'Wellness Education',
    description: 'Holistic habits for herbs, nutrition, movement, recovery, and whole-person alignment.',
    color: 'text-brand-gold',
    href: '#wellness',
  },
  {
    icon: 'circle-dollar',
    title: 'Financial Literacy',
    description: 'Practical education that supports independent decisions, preparedness, and long-term stability.',
    color: 'text-brand-aqua',
    href: '#contact',
  },
  {
    icon: 'shield',
    title: 'Self-Defense',
    description: 'Mindset-first personal safety, awareness, lawful response, and responsible protection skills.',
    color: 'text-brand-sage',
    href: '#sage-defense',
  },
];

export default function BrandEcosystem({ content = {} }) {
  const pillars = content.pillars || defaultPillars;

  return (
    <section className="relative py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <AdminEditButton target={{ group: 'brand-ecosystem' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={content.eyebrow || 'The Ecosystem'}
          heading={content.heading || 'What Is Krown Level Enterprises?'}
          lead={content.lead || 'Krown Level Enterprises is a community sustainability platform designed to help people build the skills and habits needed to live healthier, safer, and more self-sufficient lives.'}
          align="center"
          animate
          className="mb-14 max-w-3xl mx-auto"
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
            paragraphs={[content.closing || 'Different paths. One mission: helping people reclaim alignment, resilience, and independence.']}
            color="text-ink-light dark:text-white/75"
            className="italic"
          />
        </motion.div>
      </div>
    </section>
  );
}
