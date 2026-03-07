import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialCard, SectionHeader, OutcomeChip, SliderControls } from '../molecules';

const testimonials = [
  {
    quote: 'Plant Klub opened my eyes to what growing your own food really means. It is more than gardening — it is about taking control of your health and your table.',
    author: 'Plant Klub Participant',
    role: 'Community Member',
  },
  {
    quote: 'Charli approaches wellness with such intention and care. She helped me understand my body in ways no one else had.',
    author: 'Wellness Client',
    role: 'Consultation Participant',
  },
  {
    quote: 'The self-defense training changed my mindset completely. I feel more aware, more confident, and more prepared.',
    author: 'SAGE Student',
    role: 'Training Participant',
  },
];

const outcomes = [
  { icon: 'sprout', text: 'Confidence in growing your own food' },
  { icon: 'heart', text: 'A more intentional approach to wellness' },
  { icon: 'shield', text: 'Awareness and personal safety skills' },
  { icon: 'users', text: 'A supportive, like-minded community' },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-surface-warm dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Real Experiences"
          heading="What People Are Experiencing"
          align="center"
          animate
          className="mb-14"
        />

        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              author={t.author}
              role={t.role}
              animate
              delay={i * 0.15}
            />
          ))}
        </div>

        <div className="md:hidden relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard
                quote={testimonials[current].quote}
                author={testimonials[current].author}
                role={testimonials[current].role}
              />
            </motion.div>
          </AnimatePresence>
          <SliderControls
            onPrev={prev}
            onNext={next}
            count={testimonials.length}
            current={current}
            onSelect={setCurrent}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionHeader
            eyebrow="What You'll Gain"
            align="center"
            className="mb-6"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {outcomes.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <OutcomeChip icon={item.icon} text={item.text} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
