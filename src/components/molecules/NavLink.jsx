export default function NavLink({ href, children, className = '', onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-eyebrow tracking-wider uppercase text-sm text-ink-light dark:text-white/75 hover:text-brand-purple dark:hover:text-brand-purple-light transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  );
}
