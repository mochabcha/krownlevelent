import { RichText, Typography } from '../atoms';
import { hasRichText } from '../../utils/richText';

export default function ProseBlock({
  paragraphs = [],
  variant = 'body',
  color = 'text-ink-light dark:text-white/75',
  spacing = 'mb-4',
  lastSpacing = '',
  className = '',
  animate = false,
  baseDelay = 0,
}) {
  return (
    <>
      {paragraphs.map((text, i) => (
        <Typography
          key={i}
          variant={variant}
          as={hasRichText(text) ? 'div' : undefined}
          animate={animate}
          delay={animate ? baseDelay + i * 0.1 : 0}
          className={`${color} leading-relaxed ${i < paragraphs.length - 1 ? spacing : lastSpacing} ${className}`}
        >
          <RichText value={text} />
        </Typography>
      ))}
    </>
  );
}
