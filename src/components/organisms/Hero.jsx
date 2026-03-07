import { motion } from 'framer-motion';
import { Logo, Typography, Button, Badge } from '../atoms';
import { TrustRibbon } from '../molecules';
import heroImg from '@assets/images/IMG_0050.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-brand-green dark:from-brand-green dark:via-brand-green dark:to-brand-green galaxy-stars" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-gold light:to-brand-gold dark:to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Logo variant="wordmark" size="hero" className="mx-auto lg:mx-0 mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Typography variant="h1" className="text-white mb-4">
                Community Sustainability.{' '}
                <span className="text-gradient-gold">Personal Sovereignty.</span>{' '}
                Holistic Living.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Typography variant="eyebrow" className="text-brand-gold-light text-lg mb-6 tracking-[0.25em]">
                Grow your food. Heal your body. Defend your peace.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Typography variant="lead" className="text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Led by instructor <strong className="text-brand-gold">Charli Smith</strong>, Krown Level Enterprises helps people reclaim control over their health, food, safety, and sustainability through holistic education, community programs, and practical skill building.
              </Typography>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <Button variant="cta" href="#plant-klub">
                Join Plant Klub
              </Button>
              <Button variant="outline" href="#wellness" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Book a Consultation
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[28rem]"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-purple/30 via-brand-gold/20 to-brand-green/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Charli Smith — Founder of Krown Level Enterprises"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative z-10"
      >
        <TrustRibbon className="border-white/10" />
      </motion.div>
    </section>
  );
}
