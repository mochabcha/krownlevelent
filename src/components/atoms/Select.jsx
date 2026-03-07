import Icon from './Icon';

export default function Select({
  name,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 rounded-xl border border-surface-muted dark:border-dark-border bg-surface-light dark:bg-dark-elevated text-ink font-body text-base appearance-none focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all duration-300 ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
        <Icon name="chevron-down" size={18} />
      </div>
    </div>
  );
}
