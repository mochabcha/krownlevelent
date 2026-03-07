import { Icon, Typography } from '../atoms';

export default function PillarCard({ icon, title, description, iconColor = 'text-brand-gold', href, className = '' }) {
  const inner = (
    <div className={`h-full text-center p-6 rounded-2xl bg-surface-warm dark:bg-dark-surface border border-surface-muted dark:border-dark-border transition-shadow hover:shadow-lg ${className}`}>
      <div className={`w-16 h-16 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center ${iconColor} mx-auto mb-5`}>
        <Icon name={icon} size={32} />
      </div>
      <Typography variant="h4" className="text-ink dark:text-white mb-3">
        {title}
      </Typography>
      <Typography variant="body" className="text-ink-muted">
        {description}
      </Typography>
    </div>
  );

  if (href) {
    return <a href={href} className="block h-full">{inner}</a>;
  }
  return inner;
}
