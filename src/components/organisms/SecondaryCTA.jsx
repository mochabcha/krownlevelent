import { motion } from 'framer-motion';
import { SectionHeader, CTAGroup } from '../molecules';

export default function SecondaryCTA() {
  return (
    <section className="py-14 bg-gradient-to-r from-brand-purple to-brand-indigo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            heading="Ready to grow, heal, and move with intention?"
            headingVariant="h3"
            align="center"
            onDark
            headingClassName="mb-6"
            className="mb-0"
          />
          <CTAGroup
            primary={{ label: 'Join Plant Klub', href: '#plant-klub' }}
            secondary={{ label: 'Book Now', href: '#contact', className: 'border-white/30 text-white hover:bg-white/10 hover:text-white' }}
            align="center"
          />
        </motion.div>
      </div>
    </section>
  );
}
