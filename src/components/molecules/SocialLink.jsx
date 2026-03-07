import { Icon } from '../atoms';

export default function SocialLink({
  href = '#',
  label,
  icon,
  size = 'md',
  className = '',
}) {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
  };
  const iconSizeMap = { sm: 16, md: 20 };

  return (
    <a
      href={href}
      aria-label={label}
      className={`${sizeMap[size]} rounded-full border border-surface-muted dark:border-dark-border flex items-center justify-center text-ink-muted hover:text-brand-purple hover:border-brand-purple dark:hover:text-brand-purple-light dark:hover:border-brand-purple-light transition-all hover:shadow-lg ${className}`}
    >
      {icon === 'tiktok' ? (
        <svg width={iconSizeMap[size]} height={iconSizeMap[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ) : (
        <Icon name={icon} size={iconSizeMap[size]} />
      )}
    </a>
  );
}
