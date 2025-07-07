import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'AGENT' | 'CUSTOMER';
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'AGENT', 'CUSTOMER'], default: 'CUSTOMER' }
});

export const UserModel = model<IUser>('User', UserSchema);