export default function Input({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  required = false,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-3 rounded-xl border border-surface-muted dark:border-dark-border bg-surface-light dark:bg-dark-elevated text-ink font-body text-base placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all duration-300 ${className}`}
      {...props}
    />
  );
}
