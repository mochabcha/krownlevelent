import { Typography } from '../atoms';

export default function FormField({
  label,
  children,
  required = false,
  className = '',
  error,
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-eyebrow tracking-wider uppercase text-sm text-ink-light dark:text-ink-muted">
          {label}
          {required && <span className="text-brand-gold ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <Typography variant="small" className="text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}
