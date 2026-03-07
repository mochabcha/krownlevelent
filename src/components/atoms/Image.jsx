import { motion } from 'framer-motion';

export default function Image({
  src,
  alt,
  className = '',
  wrapperClass = '',
  animate = false,
  delay = 0,
  loading = 'lazy',
  objectFit = 'cover',
  rounded = 'xl',
  overlay = false,
  ...props
}) {
  const roundedMap = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  const roundClass = roundedMap[rounded] || roundedMap.xl;

  const fitMap = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };
  const fitClass = fitMap[objectFit] || fitMap.cover;

  const imgElement = (
    <div className={`relative overflow-hidden ${roundClass} ${wrapperClass}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full ${fitClass} ${className}`}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      >
        {imgElement}
      </motion.div>
    );
  }

  return imgElement;
}
