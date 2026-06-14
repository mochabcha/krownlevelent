import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface TestimonialDocument {
  quote: string;
  author: string;
  role: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, default: '' },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

testimonialSchema.index({ active: 1, sortOrder: 1 });

export const Testimonial =
  models.Testimonial || model<TestimonialDocument>('Testimonial', testimonialSchema);
