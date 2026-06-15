import mongoose, { type Model } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface EventDocument {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: string;
  ctaText: string;
  ctaHref: string;
  ctaVariant?: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, default: '' },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: String, default: '' },
    ctaText: { type: String, default: 'Reserve Your Spot' },
    ctaHref: { type: String, default: '#contact' },
    ctaVariant: { type: String, default: 'primary' },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

eventSchema.index({ active: 1, sortOrder: 1 });

export const Event = (models.Event || model<EventDocument>('Event', eventSchema)) as Model<any>;
