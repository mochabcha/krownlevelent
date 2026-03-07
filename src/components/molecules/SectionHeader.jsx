import { Typography } from '../atoms';

export default function SectionHeader({
  eyebrow,
  heading,
  lead,
  headingVariant = 'h2',
  align = 'left',
  eyebrowColor = 'text-brand-gold',
  headingColor = 'text-ink dark:text-white',
  leadColor = 'text-ink-muted',
  headingClassName = '',
  className = '',
  animate = false,
  onDark = false,
  subtitle,
  subtitleColor = 'text-brand-green',
}) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const resolvedHeadingColor = onDark ? 'text-white' : headingColor;
  const resolvedLeadColor = onDark ? 'text-white/70' : leadColor;

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <Typography variant="eyebrow" animate={animate} className={`${eyebrowColor} mb-3`}>
          {eyebrow}
        </Typography>
      )}
      {heading && (
        <Typography
          variant={headingVariant}
          animate={animate}
          delay={animate ? 0.1 : 0}
          className={`${resolvedHeadingColor} mb-4 ${headingClassName}`}
        >
          {heading}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="eyebrow"
          animate={animate}
          delay={animate ? 0.15 : 0}
          className={`${subtitleColor} mb-4 tracking-[0.2em]`}
        >
          {subtitle}
        </Typography>
      )}
      {lead && (
        <Typography
          variant="lead"
          animate={animate}
          delay={animate ? 0.2 : 0}
          className={resolvedLeadColor}
        >
          {lead}
        </Typography>
      )}
    </div>
  );
}
