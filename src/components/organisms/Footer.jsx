import { Logo, Typography } from '../atoms';
import { NavLink, SocialLink, ContactLink } from '../molecules';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Plant Klub', href: '#plant-klub' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Self Defense', href: '#sage-defense' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-indigo-dark text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Logo variant="wordmark" size="sm" className="mb-4 brightness-0 invert opacity-80" />
            <Typography variant="body" className="text-white/50 text-sm leading-relaxed">
              Krown Level Enterprises — Community sustainability through wellness, agriculture, and self-defense.
            </Typography>
          </div>

          <div>
            <Typography variant="eyebrow" className="text-brand-gold mb-4 tracking-[0.2em]">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    href={link.href}
                    className="text-white/50 hover:text-brand-gold"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography variant="eyebrow" className="text-brand-gold mb-4 tracking-[0.2em]">
              Connect
            </Typography>
            <div className="space-y-3 mb-6">
              <ContactLink href="mailto:krownlevelent31@gmail.com" icon="mail" iconSize={14} className="text-white/50 hover:text-brand-gold">
                krownlevelent31@gmail.com
              </ContactLink>
              <ContactLink href="tel:+19044423737" icon="phone" iconSize={14} className="text-white/50 hover:text-brand-gold">
                904-442-3737
              </ContactLink>
              <ContactLink icon="map-pin" iconSize={14} className="text-white/50 pointer-events-none">
                Jacksonville, FL
              </ContactLink>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  size="sm"
                  className="border-white/20 text-white/40 hover:text-brand-gold hover:border-brand-gold dark:hover:text-brand-gold dark:hover:border-brand-gold"
                />
              ))}
              <SocialLink
                href="#"
                label="TikTok"
                icon="tiktok"
                size="sm"
                className="border-white/20 text-white/40 hover:text-brand-gold hover:border-brand-gold dark:hover:text-brand-gold dark:hover:border-brand-gold"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Typography variant="small" className="text-white/30 text-xs">
            &copy; {year} Krown Level Enterprises. All rights reserved.
          </Typography>
          <Typography variant="small" className="text-white/30 text-xs">
            Community sustainability through wellness, agriculture, and self-defense.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
