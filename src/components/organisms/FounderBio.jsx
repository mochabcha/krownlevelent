import { motion } from 'framer-motion';
import { SectionHeader, BadgeGroup, ProseBlock, PhotoGrid, CheckList } from '../molecules';
import { resolveImage } from '../../content/imageRegistry';
import AdminEditButton from '../admin/AdminEditButton';

export default function FounderBio({ content = {}, mediaById = {} }) {
  const images = (content.images || []).map((image) => resolveImage(image, mediaById));

  return (
    <section id="about" className="relative py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <AdminEditButton target={{ group: 'founder-bio' }} />
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
              images={images.map((image, i) => ({
                ...image,
                animate: i > 0,
                delay: i * 0.1,
                editTarget: { blockKey: 'founder-bio', path: ['images', String(i)] },
              }))}
            />
          </motion.div>

          <div className="flex-1">
            <SectionHeader
              eyebrow={content.eyebrow || 'The Founder'}
              heading={content.heading || 'Meet Charli Smith'}
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
                  ...(content.badges || ['Instructor', 'Wellness Consultant', 'Agricultural Educator', 'Self-Defense Trainer'])
                    .map((label, i) => ({ label, color: i % 2 ? 'green' : 'purple' })),
                ]}
              />
            </motion.div>

            <ProseBlock
              animate
              baseDelay={0.3}
              spacing="mb-4"
              lastSpacing="mb-6"
              paragraphs={[
                ...(content.paragraphs || [
                  'Charli Smith is the founder of Krown Level Enterprises, a Jacksonville-based initiative focused on community sustainability through agriculture education, wellness education, financial literacy, and self-defense.',
                  'Her work blends generations of agricultural wisdom, military training, practical education, and holistic wellness practices to help people take control of their lives from the ground up.',
                  'Charli believes true sustainability requires four essential forms of sovereignty:',
                ]),
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
                items={content.sovereignty || ['Food sovereignty', 'Health sovereignty', 'Financial sovereignty', 'Personal defense']}
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
                content.closing || 'She teaches through a blend of science, lived experience, and ancestral knowledge, helping people make meaningful changes that are practical, disciplined, and sustainable.',
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
