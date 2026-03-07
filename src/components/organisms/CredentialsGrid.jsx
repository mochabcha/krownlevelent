import { motion } from 'framer-motion';
import { Typography } from '../atoms';
import { CredentialCard } from '../molecules';

const credentials = [
  {
    icon: 'shield',
    title: 'Military & Self-Defense',
    iconColor: 'text-brand-purple',
    items: [
      '15 years, United States Air Force — Security Forces',
      'USCCA Certified Concealed Carry Instructor',
      'NRA Range Safety Officer',
      'NRA Certified Pistol Instructor',
    ],
  },
  {
    icon: 'leaf',
    title: 'Agriculture & Food Systems',
    iconColor: 'text-brand-green',
    items: [
      'Family-rooted agricultural practice',
      'North-South Institute Incubator Business Program',
      'UF/IFAS coursework and ongoing study',
      'Certified Community Garden Leader (2025)',
      'Irrigation and sustainable growing training',
    ],
  },
  {
    icon: 'flower',
    title: 'Holistic Wellness',
    iconColor: 'text-brand-gold',
    items: [
      "Wellness consulting through Genie's Healing Elements",
      'Focus on herbs, exercise, behavioral habits, and natural alignment',
      'Specialty support for chronic pain, terminal illness, anxiety, and insomnia',
    ],
  },
];

export default function CredentialsGrid() {
  return (
    <section className="py-20 md:py-28 bg-surface-warm dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Typography variant="eyebrow" animate className="text-brand-gold mb-3 text-center">
            Rooted in Practice
          </Typography>
          <Typography variant="h2" animate delay={0.1} className="text-ink dark:text-white mb-4">
            Charli&apos;s Background
          </Typography>
          <Typography variant="body" animate delay={0.2} className="text-ink-muted max-w-2xl mx-auto">
            Charli&apos;s approach is rooted in real training, lived discipline, and years of hands-on study.
          </Typography>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {credentials.map((cred, i) => (
            <CredentialCard
              key={cred.title}
              icon={cred.icon}
              title={cred.title}
              items={cred.items}
              iconColor={cred.iconColor}
              animate
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
