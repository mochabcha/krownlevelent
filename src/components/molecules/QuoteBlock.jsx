import { Typography } from '../atoms';

export default function QuoteBlock({
  quote,
  attribution,
  quoteColor = 'text-white',
  attributionColor = 'text-brand-gold-light',
  className = '',
}) {
  return (
    <div className={className}>
      <div className="text-brand-gold/30 text-8xl font-heading leading-none mb-4 select-none">
        &ldquo;
      </div>
      <Typography variant="blockquote" className={`${quoteColor} mb-6 max-w-3xl mx-auto`}>
        {quote.replace(/"/g, '')}
      </Typography>
      {attribution && (
        <Typography variant="eyebrow" className={`${attributionColor} tracking-[0.3em]`}>
          {attribution}
        </Typography>
      )}
    </div>
  );
}
