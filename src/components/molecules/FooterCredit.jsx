import { Typography } from '../atoms';

export default function FooterCredit({ year, tagline, className = '' }) {
  return (
    <div className={`border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      <Typography variant="small" className="text-white/30 text-xs">
        &copy; {year} Krown Level Enterprises. All rights reserved.
      </Typography>
      {tagline && (
        <Typography variant="small" className="text-white/30 text-xs">
          {tagline}
        </Typography>
      )}
    </div>
  );
}
