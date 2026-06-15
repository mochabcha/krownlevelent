import { Icon } from '../atoms';
import { useAdmin } from './AdminContext';

export default function AdminEditButton({ target, label = 'Edit content', className = '' }) {
  const admin = useAdmin();
  if (!admin.enabled || !admin.authenticated) return null;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-admin-group={target?.group}
      onClick={() => admin.openEditor(target)}
      className={`absolute right-4 top-4 z-30 h-10 w-10 rounded-full bg-brand-aqua text-white shadow-lg shadow-brand-aqua/20 flex items-center justify-center hover:bg-brand-aqua-light transition-colors ${className}`}
    >
      <Icon name="pencil" size={18} />
    </button>
  );
}
