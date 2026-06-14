import mongoose, { type Model } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface MediaVariant {
  kind: string;
  key: string;
  url: string;
  width?: number;
  height?: number;
  size?: number;
  mimeType?: string;
}

export interface MediaAssetDocument {
  filename: string;
  alt: string;
  originalKey: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  variants: MediaVariant[];
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mediaVariantSchema = new Schema<MediaVariant>(
  {
    kind: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    width: Number,
    height: Number,
    size: Number,
    mimeType: String,
  },
  { _id: false }
);

const mediaAssetSchema = new Schema<MediaAssetDocument>(
  {
    filename: { type: String, required: true },
    alt: { type: String, default: '' },
    originalKey: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    width: Number,
    height: Number,
    variants: { type: [mediaVariantSchema], default: [] },
    archived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const MediaAsset =
  (models.MediaAsset || model<MediaAssetDocument>('MediaAsset', mediaAssetSchema)) as Model<any>;
