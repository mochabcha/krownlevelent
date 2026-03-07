import { Logo, Typography, Icon } from '../atoms';

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
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/50 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography variant="eyebrow" className="text-brand-gold mb-4 tracking-[0.2em]">
              Connect
            </Typography>
            <div className="space-y-3 mb-6">
              <a href="mailto:krownlevelent31@gmail.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-brand-gold transition-colors">
                <Icon name="mail" size={14} />
                krownlevelent31@gmail.com
              </a>
              <a href="tel:+19044423737" className="flex items-center gap-2 text-sm text-white/50 hover:text-brand-gold transition-colors">
                <Icon name="phone" size={14} />
                904-442-3737
              </a>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Icon name="map-pin" size={14} />
                Jacksonville, FL
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all"
                >
                  <Icon name={link.icon} size={16} />
                </a>
              ))}
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
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
