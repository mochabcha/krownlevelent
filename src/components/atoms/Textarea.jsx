export default function Textarea({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl border border-surface-muted dark:border-dark-border bg-surface-light dark:bg-dark-elevated text-ink font-body text-base placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all duration-300 resize-y ${className}`}
      {...props}
    />
  );
}
