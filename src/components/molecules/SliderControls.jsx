import { IconButton } from '../atoms';

export default function SliderControls({
  onPrev,
  onNext,
  count,
  current,
  onSelect,
  className = '',
}) {
  return (
    <div className={`flex items-center justify-center gap-4 mt-6 ${className}`}>
      <IconButton
        name="chevron-right"
        size={18}
        onClick={onPrev}
        label="Previous"
        className="border border-surface-muted dark:border-dark-border text-ink-muted hover:text-brand-purple hover:border-brand-purple rotate-180"
      />
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'bg-brand-purple w-6' : 'bg-surface-muted dark:bg-dark-border w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <IconButton
        name="chevron-right"
        size={18}
        onClick={onNext}
        label="Next"
        className="border border-surface-muted dark:border-dark-border text-ink-muted hover:text-brand-purple hover:border-brand-purple"
      />
    </div>
  );
}
