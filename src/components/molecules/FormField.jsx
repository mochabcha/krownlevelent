import { Typography } from '../atoms';

export default function FormField({
  label,
  children,
  required = false,
  className = '',
  error,
  onDark = false,
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className={`font-eyebrow tracking-wider uppercase text-sm ${onDark ? 'text-white/80' : 'text-ink-light dark:text-white/75'}`}>
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
