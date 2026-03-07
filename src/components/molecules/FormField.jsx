import { Typography, Input, Select, Textarea } from '../atoms';

export default function FormField({
  label,
  children,
  required = false,
  className = '',
  error,
  onDark = false,
  type,
  name,
  placeholder,
  value,
  onChange,
  options,
  rows,
  inputClassName = '',
}) {
  const darkInputClass = onDark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-brand-gold/50 focus:border-brand-gold'
    : '';

  let input = children;
  if (!children) {
    if (type === 'textarea') {
      input = (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`${darkInputClass} ${inputClassName}`}
        />
      );
    } else if (type === 'select') {
      input = (
        <Select
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          required={required}
          className={`${darkInputClass} ${inputClassName}`}
        />
      );
    } else if (type) {
      input = (
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${darkInputClass} ${inputClassName}`}
        />
      );
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className={`font-eyebrow tracking-wider uppercase text-sm ${onDark ? 'text-white/80' : 'text-ink-light dark:text-white/75'}`}>
          {label}
          {required && <span className="text-brand-gold ml-1">*</span>}
        </label>
      )}
      {input}
      {error && (
        <Typography variant="small" className="text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}
