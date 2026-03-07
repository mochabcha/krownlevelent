import { motion } from 'framer-motion';
import { Typography, Button, Icon, Badge } from '../atoms';
import { AccordionItem, Card } from '../molecules';
import charliImg from '@assets/charli-photo-download-1of1/Highlights/IMG_0155.jpg';

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
            <Typography variant="eyebrow" animate className="text-brand-gold mb-3">
              Holistic Wellness Consulting
            </Typography>
            <Typography variant="h2" animate delay={0.1} className="text-ink dark:text-white mb-6">
              Genie&apos;s Healing Elements
            </Typography>
            <Typography variant="body" animate delay={0.2} className="text-ink-light dark:text-ink-muted mb-4 leading-relaxed">
              Genie&apos;s Healing Elements helps clients restore optimal wellness through personalized strategies built around herbs, nutrition, movement, and habit alignment.
            </Typography>
            <Typography variant="body" animate delay={0.3} className="text-ink-light dark:text-ink-muted mb-4 leading-relaxed">
              This work is designed for people who want a more natural, intentional approach to healing and wellness support.
            </Typography>
            <Typography variant="body" animate delay={0.4} className="text-ink-light dark:text-ink-muted mb-6 leading-relaxed">
              Charli helps clients assess where they are now, identify what may be throwing them out of alignment, and create a realistic wellness path forward.
            </Typography>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Typography variant="eyebrow" className="text-ink-muted mr-2 self-center">
                Specialty Areas:
              </Typography>
              {specialties.map((s) => (
                <Badge key={s} color="gold" icon="heart">{s}</Badge>
              ))}
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
                <Typography variant="eyebrow" className="text-brand-purple mb-2">
                  Who This Is For
                </Typography>
                <ul className="space-y-2">
                  {[
                    'People seeking natural wellness approaches',
                    'Those dealing with chronic conditions',
                    'Anyone wanting more intentional health habits',
                    'Those looking for personalized guidance',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink-light dark:text-ink-muted text-sm">
                      <Icon name="check" size={14} className="text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <Typography variant="eyebrow" animate className="text-brand-gold mb-3 text-center">
            The Process
          </Typography>
          <Typography variant="h3" animate delay={0.1} className="text-ink dark:text-white mb-8 text-center">
            How the Wellness Process Works
          </Typography>
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
            <Typography variant="h3" className="text-white mb-4">
              Book a Wellness Consultation
            </Typography>
            <Typography variant="body" className="text-white/80 max-w-2xl mx-auto mb-8">
              Ready to take a more intentional approach to your health? Start with a one-on-one consultation tailored to your goals and current wellness needs.
            </Typography>
            <Button variant="cta" href="#contact">
              Book Your Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
