export default function NavLink({ href, children, className = '', onClick, scrolled = false, scrollAware = false }) {
  const colorClass = scrollAware
    ? scrolled
      ? 'text-ink dark:text-white/90'
      : 'text-white/90 dark:text-white/90'
    : 'text-ink-light dark:text-white/75';

  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-eyebrow tracking-wider uppercase text-base hover:text-brand-purple dark:hover:text-brand-purple-light transition-colors duration-300 ${colorClass} ${className}`}
    >
      {children}
    </a>
  );
}
