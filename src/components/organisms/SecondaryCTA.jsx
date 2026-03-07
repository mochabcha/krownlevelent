import { motion } from 'framer-motion';
import { Typography, Button } from '../atoms';

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
          <Typography variant="h3" className="text-white mb-6">
            Ready to grow, heal, and move with intention?
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" href="#plant-klub">
              Join Plant Klub
            </Button>
            <Button
              variant="outline"
              href="#contact"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Book Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
