import { motion } from 'framer-motion';
import { TrustRibbon, SectionHeader, CTAGroup, BrandLockup } from '../molecules';
import { resolveImage } from '../../content/imageRegistry';
import AdminEditButton from '../admin/AdminEditButton';
import AdminImageButton from '../admin/AdminImageButton';

export default function Hero({ content = {}, siteContent = {}, mediaById = {} }) {
  const image = resolveImage(content.image, mediaById);
  const logo = siteContent?.settings?.logos?.primary;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <AdminEditButton target={{ group: 'hero' }} />
      <div className="absolute inset-0 bg-galaxy-1 galaxy-stars" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(45,27,105,0.9)_0%,_rgba(123,94,167,0.5)_40%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-green dark:to-brand-green" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-gold/60 dark:to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BrandLockup variant="wordmark" image={logo} mediaById={mediaById} size="hero" logoClassName="mx-auto lg:mx-0 mb-8" />
            </motion.div>

            <SectionHeader
              eyebrow={content.eyebrow}
              heading={
                <>
                  {content.headingPrefix}{' '}
                  <span className="text-gradient-gold">{content.headingAccent}</span>{' '}
                  {content.headingSuffix}
                </>
              }
              lead={content.lead}
              align="left"
              onDark
              eyebrowColor="text-brand-gold-light text-lg tracking-[0.25em]"
              headingClassName="mb-4"
              leadColor="text-white/80 mb-8 max-w-xl"
              className="mb-8"
            />
            <CTAGroup
              primary={{ label: content.primaryCta || 'Join Plant Klub', href: content.primaryCtaHref || '#plant-klub', variant: content.primaryCtaVariant || 'cta' }}
              secondary={{ label: content.secondaryCta || 'Book a Consultation', href: content.secondaryCtaHref || '#wellness', variant: content.secondaryCtaVariant || 'outline', className: 'border-white/30 text-white hover:bg-white/10 hover:text-white' }}
              align="center"
              className="lg:justify-start"
            />
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
                <AdminImageButton target={{ blockKey: 'hero', path: ['image'] }} />
                <img
                  src={image.src}
                  alt={image.alt}
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
        <TrustRibbon items={content.trustRibbon} className="border-white/10" />
      </motion.div>
    </section>
  );
}
