import { motion } from 'framer-motion';
import { Typography, Image, Badge } from '../atoms';
import portraitImg from '@assets/charli-photo-download-1of1/Highlights/IMG_0213.jpg';
import candid1 from '@assets/charli-photo-download-1of1/Highlights/IMG_0002.jpg';
import lifestyle from '@assets/charli-photo-download-1of1/Highlights/IMG_0291.jpg';

export default function FounderBio() {
  return (
    <section id="about" className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Image
                  src={portraitImg}
                  alt="Charli Smith — Portrait"
                  wrapperClass="aspect-[4/3]"
                  rounded="2xl"
                  overlay
                />
              </div>
              <Image
                src={candid1}
                alt="Charli Smith with Krown Level banner"
                wrapperClass="aspect-square"
                rounded="2xl"
                overlay
                animate
                delay={0.2}
              />
              <Image
                src={lifestyle}
                alt="Charli Smith — Creative portrait"
                wrapperClass="aspect-square"
                rounded="2xl"
                overlay
                animate
                delay={0.3}
              />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="eyebrow" className="text-brand-gold mb-3">
                The Founder
              </Typography>
            </motion.div>

            <Typography variant="h2" animate className="text-ink dark:text-white mb-3">
              Meet Charli Smith
            </Typography>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge color="purple">Instructor</Badge>
                <Badge color="green">Wellness Consultant</Badge>
                <Badge color="gold">Agricultural Educator</Badge>
                <Badge color="purple">Self-Defense Trainer</Badge>
              </div>
            </motion.div>

            <Typography variant="body" animate delay={0.3} className="text-ink-light dark:text-ink-muted mb-4 leading-relaxed">
              Charli Smith is the founder of <strong className="text-ink dark:text-white">Krown Level Enterprises</strong>, a Jacksonville-based initiative focused on community sustainability through wellness education, agriculture, and self-defense.
            </Typography>

            <Typography variant="body" animate delay={0.4} className="text-ink-light dark:text-ink-muted mb-4 leading-relaxed">
              Her work blends generations of agricultural wisdom, military training, and holistic wellness practices to help people take control of their lives from the ground up.
            </Typography>

            <Typography variant="body" animate delay={0.5} className="text-ink-light dark:text-ink-muted mb-6 leading-relaxed">
              Charli believes true sustainability requires three essential forms of sovereignty:
            </Typography>

            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {['Health sovereignty', 'Food sovereignty', 'Personal defense'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-ink dark:text-white">
                  <div className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />
                  <span className="font-body font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            <Typography variant="body" animate delay={0.7} className="text-ink-light dark:text-ink-muted leading-relaxed">
              She teaches through a blend of science, lived experience, and ancestral knowledge, helping people make meaningful changes that are practical, disciplined, and sustainable.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
