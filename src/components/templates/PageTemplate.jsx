import { Helmet } from 'react-helmet-async';
import {
  Header,
  Hero,
  QuickJumpNav,
  FounderBio,
  CredentialsGrid,
  QuoteBanner,
  BrandEcosystem,
  WellnessSection,
  PlantKlubSection,
  SageDefenseSection,
  VisionBanner,
  TestimonialSlider,
  SignUpForm,
  SecondaryCTA,
  ContactSection,
  Footer,
  MobileFAB,
  AdminOverlay,
} from '../organisms';

export default function PageTemplate({
  title,
  description,
  children,
  sections = [],
  content,
  mediaById = {},
}) {
  const sectionMap = {
    hero: Hero,
    'quick-jump': QuickJumpNav,
    'founder-bio': FounderBio,
    credentials: CredentialsGrid,
    'quote-banner': QuoteBanner,
    'brand-ecosystem': BrandEcosystem,
    wellness: WellnessSection,
    'plant-klub': PlantKlubSection,
    'sage-defense': SageDefenseSection,
    vision: VisionBanner,
    testimonials: TestimonialSlider,
    'sign-up': SignUpForm,
    'secondary-cta': SecondaryCTA,
    contact: ContactSection,
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Krown Level Enterprises',
    url: 'https://krownlevelenterprises.com',
    logo: '/images/krown-emblem.png',
    description: 'Community sustainability through agriculture education, wellness education, financial literacy, and self-defense.',
    founder: {
      '@type': 'Person',
      name: 'Charli Smith',
      jobTitle: 'Founder & Instructor',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jacksonville',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-904-442-3737',
      email: 'krownlevelent31@gmail.com',
      contactType: 'general',
    },
    sameAs: [],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />

      <main>
        {sections.length > 0
          ? sections.map((sectionKey, i) => {
              const SectionComponent = sectionMap[sectionKey];
              if (!SectionComponent) return null;
              return (
                <SectionComponent
                  key={`${sectionKey}-${i}`}
                  content={content?.blocks?.[sectionKey]}
                  siteContent={content}
                  mediaById={mediaById}
                />
              );
            })
          : children}
      </main>

      <Footer content={content?.blocks?.footer} settings={content?.settings} />
      <MobileFAB />
      <AdminOverlay />
    </>
  );
}
