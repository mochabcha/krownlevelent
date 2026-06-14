import { Image } from '../atoms';
import AdminImageButton from '../admin/AdminImageButton';

export default function PhotoGrid({ images = [], className = '' }) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {images.map((img, i) => (
        <div key={i} className={`relative ${img.span ?? ''}`}>
          <AdminImageButton target={img.editTarget} />
          <Image
            src={img.src}
            alt={img.alt}
            wrapperClass={img.wrapperClass ?? 'aspect-square'}
            rounded="2xl"
            overlay={img.overlay ?? true}
            animate={img.animate}
            delay={img.delay}
          />
        </div>
      ))}
    </div>
  );
}
