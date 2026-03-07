import { motion } from 'framer-motion';
import { Card, EventCard, SectionHeader, ProseBlock, CheckList, CTAGroup, BrandLockup } from '../molecules';
import img1 from '@assets/images/IMG_0268.webp';
import img2 from '@assets/images/IMG_0310.webp';
import img3 from '@assets/images/IMG_0319.webp';
import img4 from '@assets/images/IMG_0094.webp';

const offerings = [
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

const galleryImages = [
  { src: img1, alt: 'Charli Smith — Creative spirit', span: 'col-span-2 row-span-2' },
  { src: img2, alt: 'Charli Smith — Many hats', span: '' },
  { src: img3, alt: 'Charli Smith — Gold hat detail', span: '' },
  { src: img4, alt: 'Charli Smith — Styled portrait', span: 'col-span-2' },
];

export default function PlantKlubSection() {
  return (
    <section id="plant-klub" className="py-20 md:py-28 bg-surface-light dark:bg-dark-bg">
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
            eyebrow="Learn to Grow Your Own Food"
            lead="Plant Klub is a community-centered gardening and education initiative designed to reconnect people with the land, their food, and the practical skill of cultivation."
            eyebrowColor="text-brand-green"
            align="center"
            animate
            className="mb-0"
          />
        </div>

        <ProseBlock
          paragraphs={['Members learn how to grow herbs, vegetables, and medicinal plants while building confidence, community, and self-sufficiency.']}
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
          {['Gardening education', 'Plant trading', 'Information sharing', 'Fellowship', 'Hands-on workshops', 'Green thumb development'].map((item) => (
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
            heading="What You Can Learn in Plant Klub"
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
              heading="Need Help Starting at Home?"
              headingVariant="h3"
              eyebrowColor="text-brand-green"
              headingClassName="mb-4"
              className="mb-0"
            />
            <ProseBlock
              spacing="mb-4"
              lastSpacing="mb-6"
              paragraphs={[
                'Plant Klub also offers personalized home garden installations for people who want the benefits of growing herbs and food but need help getting started.',
                'Each installation begins with an assessment that considers:',
              ]}
            />
            <CheckList
              columns={2}
              iconColor="text-brand-green"
              className="mb-6"
              items={['Your available space', 'Your experience level', 'Your lifestyle', 'Your wellness goals']}
            />
            <CTAGroup
              primary={{ label: 'Get Started', href: '#contact', variant: 'secondary', className: 'bg-brand-green hover:bg-brand-green-light' }}
            />
          </div>
          <div className="flex-shrink-0 w-full lg:w-80">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={img1}
                alt="Charli Smith — Grounded and creative"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <div id="events">
          <SectionHeader
            eyebrow="Don't Miss Out"
            heading="Upcoming Plant Klub Events"
            headingVariant="h3"
            align="center"
            animate
            headingClassName="mb-4"
            className="mb-0"
          />
          <ProseBlock
            paragraphs={['Join the next Plant Klub experience and learn in community.']}
            color="text-ink-muted"
            className="max-w-2xl mx-auto text-center mb-10"
            animate
            baseDelay={0.2}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <EventCard
              title="Plant Klub Spring Workshop"
              date="April 2025"
              time="10:00 AM — 2:00 PM"
              location="Jacksonville, FL"
              description="Hands-on gardening workshop covering soil prep, herb planting, and sustainable growing."
              price="$25"
              animate
              delay={0}
            />
            <EventCard
              title="Community Garden Day"
              date="May 2025"
              time="9:00 AM — 1:00 PM"
              location="Jacksonville, FL"
              description="A community gathering focused on plant exchange, garden tours, and fellowship."
              price="Free"
              animate
              delay={0.15}
            />
            <EventCard
              title="Herbal Wellness Workshop"
              date="June 2025"
              time="11:00 AM — 3:00 PM"
              location="Jacksonville, FL"
              description="Learn to grow and use medicinal herbs for everyday wellness."
              price="$30"
              animate
              delay={0.3}
            />
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="cta" href="#contact">
              Buy Tickets to Plant Klub
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
