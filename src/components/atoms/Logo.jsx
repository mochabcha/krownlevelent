import { motion } from 'framer-motion';
import krownEmblem from '@assets/logos/Krown_Emblem.png';
import krownWordMark from '@assets/logos/Krown_WordMark.png';
import pkEmblem from '@assets/logos/PK_Emblem.png';
import plantKlubWordMark from '@assets/logos/PlantKlub_WordMark.png';

const logos = {
  emblem: krownEmblem,
  wordmark: krownWordMark,
  'pk-emblem': pkEmblem,
  'pk-wordmark': plantKlubWordMark,
};

export default function Logo({
  variant = 'wordmark',
  size = 'md',
  src,
  alt = 'Krown Level Enterprises',
  className = '',
  animate = false,
  ...props
}) {
  const sizeMap = {
    xs: 'h-8',
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-32',
    xl: 'h-48',
    '2xl': 'h-64',
    hero: 'h-48 md:h-72 lg:h-96',
  };

  const sizeClass = sizeMap[size] || sizeMap.md;
  const resolvedSrc = src || logos[variant] || logos.wordmark;

  const img = (
    <img
      src={resolvedSrc}
      alt={alt}
      className={`${sizeClass} w-auto object-contain ${className}`}
      loading={size === 'hero' ? 'eager' : 'lazy'}
      {...props}
    />
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {img}
      </motion.div>
    );
  }

  return img;
}
