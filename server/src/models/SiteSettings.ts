import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface SiteSettingsDocument {
  singletonKey: string;
  contact: Record<string, unknown>;
  socialLinks: Array<Record<string, unknown>>;
  calendlyUrl: string;
  logos: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    singletonKey: { type: String, required: true, unique: true, default: 'site' },
    contact: { type: Schema.Types.Mixed, default: {} },
    socialLinks: { type: [Schema.Types.Mixed], default: [] } as any,
    calendlyUrl: { type: String, default: '' },
    logos: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const SiteSettings =
  models.SiteSettings || model<SiteSettingsDocument>('SiteSettings', siteSettingsSchema);
