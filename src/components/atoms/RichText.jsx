import { hasRichText, sanitizeRichText } from '../../utils/richText';

export default function RichText({ value, as: Component = 'span', className = '' }) {
  if (!hasRichText(value)) {
    return <Component className={className}>{value}</Component>;
  }
  const RichComponent = Component === 'span' ? 'div' : Component;

  return (
    <RichComponent
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(value) }}
    />
  );
}
