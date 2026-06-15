import img0002 from '@assets/images/IMG_0002.webp';
import img0050 from '@assets/images/IMG_0050.webp';
import img0094 from '@assets/images/IMG_0094.webp';
import img0155 from '@assets/images/IMG_0155.webp';
import img0213 from '@assets/images/IMG_0213.webp';
import img0227 from '@assets/images/IMG_0227.webp';
import img0268 from '@assets/images/IMG_0268.webp';
import img0291 from '@assets/images/IMG_0291.webp';
import img0310 from '@assets/images/IMG_0310.webp';
import img0319 from '@assets/images/IMG_0319.webp';
import krownEmblem from '@assets/logos/Krown_Emblem.png';
import krownWordMark from '@assets/logos/Krown_WordMark.png';
import pkEmblem from '@assets/logos/PK_Emblem.png';
import plantKlubWordMark from '@assets/logos/PlantKlub_WordMark.png';
import gheLogo from '@assets/logos/GHE_Logo.webp';

export const imageRegistry = {
  img0002,
  img0050,
  img0094,
  img0155,
  img0213,
  img0227,
  img0268,
  img0291,
  img0310,
  img0319,
  krownEmblem,
  krownWordMark,
  pkEmblem,
  plantKlubWordMark,
  gheLogo,
};

export function resolveImage(image, mediaById = {}) {
  if (!image) return { src: '', alt: '' };
  const media = image.mediaId ? mediaById[image.mediaId] : null;
  const variant = media?.variants?.find((item) => item.kind === 'webp') || media?.variants?.[0];

  return {
    ...image,
    src: image.url || variant?.url || media?.url || imageRegistry[image.assetKey] || '',
    alt: image.alt || media?.alt || '',
  };
}
