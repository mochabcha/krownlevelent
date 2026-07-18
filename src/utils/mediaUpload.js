const HEIC_MIME_TYPES = new Set([
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]);

const HEIC_FILE_EXTENSIONS = new Set(['.heic', '.heif']);

export const acceptedImageFileTypes = 'image/*,.heic,.heif';

export function isSupportedImageUpload(file) {
  const mimeType = file?.type?.toLowerCase() || '';
  const extension = file?.name?.toLowerCase().match(/\.[^.]+$/)?.[0];

  return mimeType.startsWith('image/') || HEIC_MIME_TYPES.has(mimeType) || HEIC_FILE_EXTENSIONS.has(extension);
}
