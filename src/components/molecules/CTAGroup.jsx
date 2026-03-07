import { Button } from '../atoms';

export default function CTAGroup({
  primary,
  secondary,
  align = 'left',
  className = '',
}) {
  const alignClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[align] ?? 'justify-start';

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${alignClass} ${className}`}>
      {primary && (
        <Button
          variant={primary.variant ?? 'cta'}
          href={primary.href}
          onClick={primary.onClick}
          type={primary.type}
          className={primary.className}
        >
          {primary.label}
        </Button>
      )}
      {secondary && (
        <Button
          variant={secondary.variant ?? 'outline'}
          href={secondary.href}
          onClick={secondary.onClick}
          type={secondary.type}
          className={secondary.className}
        >
          {secondary.label}
        </Button>
      )}
    </div>
  );
}
