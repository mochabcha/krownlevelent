import { Icon } from '../atoms';

export default function ContactLink({
  href,
  icon,
  children,
  className = '',
  iconSize = 18,
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 text-brand-purple hover:text-brand-purple-light transition-colors ${className}`}
    >
      <Icon name={icon} size={iconSize} />
      <span className="font-body">{children}</span>
    </a>
  );
}
