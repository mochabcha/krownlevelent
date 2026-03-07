import { Icon } from '../atoms';
import ProseBlock from './ProseBlock';

export default function OutcomeChip({ icon, text, iconColor = 'text-brand-purple', className = '' }) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl bg-surface-light dark:bg-dark-elevated border border-surface-muted dark:border-dark-border ${className}`}>
      <Icon name={icon} size={20} className={`${iconColor} flex-shrink-0`} />
      <ProseBlock paragraphs={[text]} color="text-ink dark:text-white" />
    </div>
  );
}
