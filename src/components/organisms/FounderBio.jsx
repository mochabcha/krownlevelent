import { motion } from 'framer-motion';
import { SectionHeader, BadgeGroup, ProseBlock, PhotoGrid, CheckList } from '../molecules';
import portraitImg from '@assets/images/IMG_0213.webp';
import candid1 from '@assets/images/IMG_0002.webp';
import lifestyle from '@assets/images/IMG_0291.webp';

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
            <PhotoGrid
              images={[
                { src: portraitImg, alt: 'Charli Smith — Portrait', span: 'col-span-2', wrapperClass: 'aspect-[4/3]' },
                { src: candid1, alt: 'Charli Smith with Krown Level banner', wrapperClass: 'aspect-square', animate: true, delay: 0.2 },
                { src: lifestyle, alt: 'Charli Smith — Creative portrait', wrapperClass: 'aspect-square', animate: true, delay: 0.3 },
              ]}
            />
          </motion.div>

          <div className="flex-1">
            <SectionHeader
              eyebrow="The Founder"
              heading="Meet Charli Smith"
              animate
              headingClassName="mb-3"
              className="mb-0"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BadgeGroup
                className="mb-6"
                badges={[
                  { label: 'Instructor', color: 'purple' },
                  { label: 'Wellness Consultant', color: 'green' },
                  { label: 'Agricultural Educator', color: 'gold' },
                  { label: 'Self-Defense Trainer', color: 'purple' },
                ]}
              />
            </motion.div>

            <ProseBlock
              animate
              baseDelay={0.3}
              spacing="mb-4"
              lastSpacing="mb-6"
              paragraphs={[
                <><strong className="text-ink dark:text-white">Charli Smith</strong> is the founder of <strong className="text-ink dark:text-white">Krown Level Enterprises</strong>, a Jacksonville-based initiative focused on community sustainability through wellness education, agriculture, and self-defense.</>,
                'Her work blends generations of agricultural wisdom, military training, and holistic wellness practices to help people take control of their lives from the ground up.',
                'Charli believes true sustainability requires three essential forms of sovereignty:',
              ]}
            />

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <CheckList
                items={['Health sovereignty', 'Food sovereignty', 'Personal defense']}
                iconName="circle"
                iconColor="text-brand-gold"
                iconSize={8}
                textColor="text-ink dark:text-white font-medium"
              />
            </motion.div>

            <ProseBlock
              animate
              baseDelay={0.7}
              paragraphs={[
                'She teaches through a blend of science, lived experience, and ancestral knowledge, helping people make meaningful changes that are practical, disciplined, and sustainable.',
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
