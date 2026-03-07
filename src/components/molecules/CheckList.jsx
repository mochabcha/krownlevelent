import { Icon } from '../atoms';

export default function CheckList({
  items = [],
  iconName = 'check',
  iconColor = 'text-brand-green',
  textColor = 'text-ink dark:text-white',
  iconSize = 14,
  columns = 1,
  className = '',
}) {
  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
  }[columns] ?? 'grid-cols-1';

  return (
    <div className={`grid ${colClass} gap-3 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className={`flex items-center gap-2 text-sm ${textColor}`}>
          <Icon name={iconName} size={iconSize} className={`${iconColor} flex-shrink-0`} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
