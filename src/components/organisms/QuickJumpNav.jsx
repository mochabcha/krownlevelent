import { motion } from 'framer-motion';
import { QuickJumpItem } from '../molecules';

const items = [
  { icon: 'users', label: 'Meet Charli', href: '#about' },
  { icon: 'sprout', label: 'Plant Klub', href: '#plant-klub' },
  { icon: 'flower', label: "Genie's Healing Elements", href: '#wellness' },
  {
    icon: 'shield',
    label: 'SAGE Defense Systems',
    href: '#sage-defense',
    borderHoverClassName: 'hover:border-brand-aqua/50 dark:hover:border-brand-aqua/50',
    iconClassName: 'bg-brand-sage/10 dark:bg-brand-sage/20 text-brand-sage group-hover:bg-brand-sage group-hover:text-white',
    labelClassName: 'group-hover:text-brand-aqua dark:group-hover:text-brand-aqua-light',
  },
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
              borderHoverClassName={item.borderHoverClassName}
              iconClassName={item.iconClassName}
              labelClassName={item.labelClassName}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
