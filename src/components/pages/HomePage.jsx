import PageTemplate from '../templates/PageTemplate';

const pageSections = [
  'hero',
  'quick-jump',
  'founder-bio',
  'vision',
  'credentials',
  'quote-banner',
  'brand-ecosystem',
  'wellness',
  'plant-klub',
  'sage-defense',
  'testimonials',
  'sign-up',
  'secondary-cta',
  'contact',
];

export default function HomePage({ content, mediaById }) {
  return (
    <PageTemplate
      title={content?.meta?.title || 'Krown Level Enterprises — Community Sustainability. Personal Sovereignty. Holistic Living.'}
      description={content?.meta?.description || 'Charli Smith is the founder of Krown Level Enterprises, a Jacksonville-based community sustainability platform offering agriculture education, wellness education, financial literacy, and self-defense training.'}
      sections={pageSections}
      content={content}
      mediaById={mediaById}
    />
  );
}
