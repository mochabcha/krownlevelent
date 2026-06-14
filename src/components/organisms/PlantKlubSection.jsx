import { motion } from 'framer-motion';
import { Card, EventCard, SectionHeader, ProseBlock, CheckList, CTAGroup, BrandLockup } from '../molecules';
import { resolveImage } from '../../content/imageRegistry';
import AdminEditButton from '../admin/AdminEditButton';
import AdminImageButton from '../admin/AdminImageButton';

const defaultOfferings = [
  {
    icon: 'flower',
    title: 'Herbal Gardening',
    description: 'Learn how to grow herbs that support wellness and everyday use.',
  },
  {
    icon: 'sprout',
    title: 'Food Growing Basics',
    description: 'Understand soil, watering, planting cycles, and what it takes to grow your own food.',
  },
  {
    icon: 'users',
    title: 'Community Exchange',
    description: 'Trade plants, share knowledge, and build your skills alongside others.',
  },
  {
    icon: 'tree',
    title: 'Home Installations',
    description: 'Get support designing and installing a personalized herb or food garden at home.',
  },
];

export default function PlantKlubSection({ content = {}, siteContent = {}, mediaById = {} }) {
  const offerings = content.offerings || defaultOfferings;
  const galleryImages = (content.gallery || []).map((image) => resolveImage(image, mediaById));
  const supportImage = resolveImage(content.supportImage, mediaById);
  const events = siteContent.events || [];

  return (
    <section id="plant-klub" className="relative py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
      <AdminEditButton target={{ group: 'plant-klub' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <BrandLockup variant="pk-wordmark" size="lg" logoClassName="mx-auto" />
          </motion.div>
          <SectionHeader
            eyebrow={content.eyebrow || 'Learn to Grow Your Own Food'}
            lead={content.lead || 'Plant Klub is a community-centered gardening and education initiative designed to reconnect people with the land, their food, and the practical skill of cultivation.'}
            eyebrowColor="text-brand-green"
            align="center"
            animate
            className="mb-0"
          />
        </div>

        <ProseBlock
          paragraphs={[content.intro || 'Members learn how to grow herbs, vegetables, and medicinal plants while building confidence, community, and self-sufficiency.']}
          color="text-ink-light dark:text-white/75"
          className="max-w-3xl mx-auto text-center mb-6"
          animate
          baseDelay={0.3}
        />

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {(content.chips || []).map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full text-sm font-body bg-brand-green-50 dark:bg-brand-green-900/30 text-brand-green-700 dark:text-brand-green-300 border border-brand-green-200/50 dark:border-brand-green-800/50"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.alt}
              className={`rounded-2xl overflow-hidden ${img.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative aspect-square overflow-hidden group">
                <AdminImageButton target={{ blockKey: 'plant-klub', path: ['gallery', String(i)] }} />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <SectionHeader
            eyebrow="Cultivate Your Skills"
            heading={content.offeringsHeading || 'What You Can Learn in Plant Klub'}
            headingVariant="h3"
            eyebrowColor="text-brand-green"
            align="center"
            animate
            headingClassName="mb-10"
            className="mb-0"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, i) => (
              <Card
                key={item.title}
                icon={item.icon}
                title={item.title}
                iconColor="text-brand-green"
                variant="elevated"
                animate
                delay={i * 0.1}
              >
                <ProseBlock paragraphs={[item.description]} color="text-ink-muted" />
              </Card>
            ))}
          </div>
        </div>

        <motion.div
          className="bg-surface-warm dark:bg-dark-surface rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex-1">
            <SectionHeader
              eyebrow="Personalized Support"
              heading={content.supportHeading || 'Need Help Starting at Home?'}
              headingVariant="h3"
              eyebrowColor="text-brand-green"
              headingClassName="mb-4"
              className="mb-0"
            />
            <ProseBlock
              spacing="mb-4"
              lastSpacing="mb-6"
              paragraphs={[
                ...(content.supportParagraphs || [
                  'Plant Klub also offers personalized home garden installations for people who want the benefits of growing herbs and food but need help getting started.',
                  'Each installation begins with an assessment that considers:',
                ]),
              ]}
            />
            <CheckList
              columns={2}
              iconColor="text-brand-green"
              className="mb-6"
              items={content.supportItems || ['Your available space', 'Your experience level', 'Your lifestyle', 'Your wellness goals']}
            />
            <CTAGroup
              primary={{ label: 'Get Started', href: '#contact', variant: 'secondary', className: 'bg-brand-green hover:bg-brand-green-light' }}
            />
          </div>
          <div className="flex-shrink-0 w-full lg:w-80">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <AdminImageButton target={{ blockKey: 'plant-klub', path: ['supportImage'] }} />
              <img
                src={supportImage.src}
                alt={supportImage.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <div id="events">
          <SectionHeader
            eyebrow="Don't Miss Out"
            heading={content.eventsHeading || 'Upcoming Plant Klub Events'}
            headingVariant="h3"
            align="center"
            animate
            headingClassName="mb-4"
            className="mb-0"
          />
          <ProseBlock
            paragraphs={[content.eventsLead || 'Join the next Plant Klub experience and learn in community.']}
            color="text-ink-muted"
            className="max-w-2xl mx-auto text-center mb-10"
            animate
            baseDelay={0.2}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {events.map((event, i) => (
              <EventCard key={event.id || event.title} {...event} animate delay={i * 0.15} />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CTAGroup
              primary={{ label: 'Buy Tickets to Plant Klub', href: '#contact', variant: 'cta' }}
              align="center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
