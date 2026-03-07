import { motion } from 'framer-motion';
import { QuickJumpItem } from '../molecules';

const items = [
  { icon: 'users', label: 'Meet Charli', href: '#about' },
  { icon: 'sprout', label: 'Plant Klub', href: '#plant-klub' },
  { icon: 'flower', label: "Genie's Healing Elements", href: '#wellness' },
  { icon: 'shield', label: 'SAGE Defense Systems', href: '#sage-defense' },
];

export default function QuickJumpNav() {
  return (
    <section className="py-12 bg-surface-warm dark:bg-dark-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {items.map((item, i) => (
            <QuickJumpItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              animate
              delay={i * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
