import { motion } from 'framer-motion';
import { Icon, Logo } from '../atoms';
import { Card, SectionHeader } from '../molecules';

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
            <motion.a
              key={pillar.title}
              href={pillar.href}
              className="block"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="gradient" hover className="h-full text-center">
                <div className={`w-16 h-16 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center ${pillar.color} mx-auto mb-5`}>
                  <Icon name={pillar.icon} size={32} />
                </div>
                <Typography variant="h4" className="text-ink dark:text-white mb-3">
                  {pillar.title}
                </Typography>
                <Typography variant="body" className="text-ink-muted">
                  {pillar.description}
                </Typography>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Typography variant="lead" className="text-ink-light dark:text-white/75 italic">
            Different paths. One mission: helping people reclaim alignment, resilience, and independence.
          </Typography>
        </motion.div>
      </div>
    </section>
  );
}
