import mongoose, { type Model } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface ContentBlockDocument {
  key: string;
  label: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const contentBlockSchema = new Schema<ContentBlockDocument>(
  {
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true }
);

export const ContentBlock =
  (models.ContentBlock || model<ContentBlockDocument>('ContentBlock', contentBlockSchema)) as Model<any>;
