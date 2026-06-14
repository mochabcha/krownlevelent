import { motion } from 'framer-motion';
import { AccordionItem, TimelineItem, SectionHeader, ProseBlock, CTAGroup, CheckList } from '../molecules';
import { resolveImage } from '../../content/imageRegistry';
import AdminEditButton from '../admin/AdminEditButton';
import AdminImageButton from '../admin/AdminImageButton';

const defaultTrainingLevels = [
  {
    level: 1,
    title: 'Defend Yourself',
    description: 'Situational awareness, mindset, and personal protection basics.',
  },
  {
    level: 2,
    title: 'Defend Others',
    description: 'Skills for protecting family members and vulnerable people.',
  },
  {
    level: 3,
    title: 'Coordinated Defense',
    description: 'Learning how to move effectively when others are involved.',
  },
  {
    level: 4,
    title: 'Advanced Readiness',
    description: 'For those seeking a deeper level of preparedness and survival training.',
  },
];

const defaultFaqItems = [
  {
    question: 'Do I need prior experience?',
    answer: 'No. Training can begin at a foundational level and grow with your comfort and skill.',
  },
  {
    question: 'Is this only firearm training?',
    answer: 'No. S.A.G.E. Defense Systems includes mindset, verbal awareness, self-defense principles, and weapon education where appropriate.',
  },
  {
    question: 'Is mindset really that important?',
    answer: 'Yes. Awareness, decision making, lawful response, and emotional control are all essential parts of defense.',
  },
  {
    question: 'Can beginners join?',
    answer: 'Yes. The training path is designed to meet people where they are.',
  },
];

export default function SageDefenseSection({ content = {}, mediaById = {} }) {
  const trainingLevels = content.trainingLevels || defaultTrainingLevels;
  const faqItems = content.faqItems || defaultFaqItems;
  const image = resolveImage(content.image, mediaById);

  return (
    <section id="sage-defense" className="relative py-20 md:py-28 overflow-hidden">
      <AdminEditButton target={{ group: 'sage-defense' }} />
      <div className="absolute inset-0 bg-sage-defense galaxy-stars" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-20">
          <div className="flex-1">
            <SectionHeader
              eyebrow={content.eyebrow || 'Learn to Defend Your Peace'}
              heading={<span className="text-gradient-sage-aqua">{content.heading || 'S.A.G.E. Defense Systems'}</span>}
              subtitle={content.subtitle || 'Sacred Alignment Grounding Everything'}
              animate
              onDark
              eyebrowColor="text-brand-sage-light"
              subtitleColor="text-brand-aqua-light"
              headingClassName="mb-6"
              className="mb-0"
            />
            <ProseBlock
              animate
              baseDelay={0.2}
              spacing="mb-4"
              lastSpacing="mb-6"
              color="text-white/80"
              paragraphs={content.paragraphs || [
                'S.A.G.E. Defense Systems teaches people how to develop the mindset, awareness, and practical skill needed to protect themselves and others responsibly.',
                "Charli's training begins with mindset first, because effective self-defense starts before physical action. From there, students build the ability to assess threats, respond appropriately, and protect themselves with confidence and discipline.",
              ]}
            />

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SectionHeader
                eyebrow="Philosophy"
                eyebrowColor="text-brand-aqua-light"
                className="mb-2"
              />
              <ProseBlock
                paragraphs={[content.philosophy || 'Not every threat is what it seems. A big part of self-defense is learning the difference between bait and danger, and knowing how to respond lawfully, effectively, and under pressure.']}
                color="text-white/70"
              />
            </motion.div>
          </div>

          <motion.div
            className="flex-shrink-0 w-full max-w-md lg:w-96"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-brand-sage/25 to-brand-aqua/15 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-brand-aqua/20 shadow-2xl">
                <AdminImageButton target={{ blockKey: 'sage-defense', path: ['image'] }} />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <SectionHeader
            eyebrow="Progression System"
            heading="Training Pathways"
            headingVariant="h3"
            align="center"
            animate
            onDark
            headingClassName="mb-10"
            className="mb-0"
          />
          <div className="text-left">
            {trainingLevels.map((level, i) => (
              <TimelineItem
                key={level.level}
                level={level.level}
                title={level.title}
                description={level.description}
                isLast={i === trainingLevels.length - 1}
                animate
                delay={i * 0.1}
                markerClassName="bg-brand-sage text-white"
                lineClassName="from-brand-sage/70 to-brand-aqua/10"
                className="text-white [&_p]:text-white/70 [&_h5]:text-white"
              />
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Common Questions"
            heading="Self-Defense Questions"
            headingVariant="h3"
            align="center"
            animate
            onDark
            headingClassName="mb-8"
            className="mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="[&_button]:text-white [&_h5]:text-white [&_.text-ink-light]:text-white/70 border-brand-aqua/15"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                title={item.question}
                className="border-brand-aqua/15"
                titleClassName="group-hover:text-brand-aqua-light"
                iconClassName="text-brand-aqua-light"
              >
                {item.answer}
              </AccordionItem>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
