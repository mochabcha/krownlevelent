export default function Divider({ className = '', variant = 'default' }) {
  const styles = {
    default: 'border-t border-surface-muted dark:border-dark-border',
    gold: 'h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent',
    purple: 'h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent',
    thick: 'h-0.5 bg-gradient-to-r from-brand-purple via-brand-gold to-brand-green',
  };

  return <div className={`w-full my-8 ${styles[variant] || styles.default} ${className}`} />;
}
