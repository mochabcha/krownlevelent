import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface AdminUserDocument {
  username: string;
  passwordHash?: string;
  passwordSetAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminUserSchema = new Schema<AdminUserDocument>(
  {
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String },
    passwordSetAt: { type: Date },
  },
  { timestamps: true }
);

export const AdminUser = models.AdminUser || model<AdminUserDocument>('AdminUser', adminUserSchema);
