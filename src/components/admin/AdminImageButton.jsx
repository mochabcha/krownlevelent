import { Icon } from '../atoms';
import { useAdmin } from './AdminContext';

export default function AdminImageButton({ target, className = '' }) {
  const admin = useAdmin();
  if (!admin.enabled || !admin.authenticated) return null;

  return (
    <button
      type="button"
      aria-label="Change image"
      title="Change image"
      onClick={() => admin.openMedia(target)}
      className={`absolute left-3 top-3 z-30 h-9 w-9 rounded-full bg-brand-sage text-white shadow-lg flex items-center justify-center hover:bg-brand-sage-light transition-colors ${className}`}
    >
      <Icon name="image" size={17} />
    </button>
  );
}
