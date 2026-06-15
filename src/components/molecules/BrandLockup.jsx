import { Logo, Typography } from '../atoms';
import { resolveImage } from '../../content/imageRegistry';

export default function BrandLockup({
  variant = 'wordmark',
  size = 'sm',
  image,
  mediaById = {},
  tagline,
  taglineColor = 'text-white/50',
  className = '',
  logoClassName = '',
}) {
  const resolvedImage = resolveImage(image, mediaById);

  return (
    <div className={className}>
      <Logo
        variant={variant}
        size={size}
        src={resolvedImage.src}
        alt={resolvedImage.alt || 'Krown Level Enterprises'}
        className={logoClassName}
      />
      {tagline && (
        <Typography variant="body" className={`text-sm leading-relaxed mt-2 ${taglineColor}`}>
          {tagline}
        </Typography>
      )}
    </div>
  );
}
