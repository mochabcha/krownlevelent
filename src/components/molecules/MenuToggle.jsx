import { IconButton } from '../atoms';

export default function MenuToggle({ open, onClick, className = '' }) {
  return (
    <IconButton
      name={open ? 'x' : 'menu'}
      size={24}
      onClick={onClick}
      label={open ? 'Close menu' : 'Open menu'}
      className={className}
    />
  );
}
