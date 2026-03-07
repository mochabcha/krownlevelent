import { Logo, Typography } from '../atoms';

export default function BrandLockup({
  variant = 'wordmark',
  size = 'sm',
  tagline,
  taglineColor = 'text-white/50',
  className = '',
  logoClassName = '',
}) {
  return (
    <div className={className}>
      <Logo variant={variant} size={size} className={logoClassName} />
      {tagline && (
        <Typography variant="body" className={`text-sm leading-relaxed mt-2 ${taglineColor}`}>
          {tagline}
        </Typography>
      )}
    </div>
  );
}
