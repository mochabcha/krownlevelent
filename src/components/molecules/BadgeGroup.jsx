import { Badge } from '../atoms';

export default function BadgeGroup({ badges = [], className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map(({ label, color }) => (
        <Badge key={label} color={color}>
          {label}
        </Badge>
      ))}
    </div>
  );
}
