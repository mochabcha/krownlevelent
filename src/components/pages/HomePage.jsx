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

export default function HomePage() {
  return (
    <PageTemplate
      title="Krown Level Enterprises — Community Sustainability. Personal Sovereignty. Holistic Living."
      description="Charli Smith is the founder of Krown Level Enterprises, a Jacksonville-based community sustainability platform offering holistic wellness consulting, gardening education, and self-defense training through Genie's Healing Elements, Plant Klub, and SAGE Defense Systems."
      sections={pageSections}
    />
  );
}
