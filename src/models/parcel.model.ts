import { Schema, model, Document, Types } from 'mongoose';

export interface IParcel extends Document {
  customerId: Types.ObjectId;
  assignedAgentId?: Types.ObjectId;
  pickup: { address: string; coords: [number, number] };
  delivery: { address: string; coords: [number, number] };
  type: string;
  size: string;
  isCOD: boolean;
  codAmount?: number;
  status: 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
  currentLocation: [number, number];
  createdAt: Date;
  updatedAt: Date;
}

const ParcelSchema = new Schema<IParcel>({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAgentId: { type: Schema.Types.ObjectId, ref: 'User' },
  pickup: {
    address: { type: String, required: true },
    coords: { type: [Number], required: true }
  },
  delivery: {
    address: { type: String, required: true },
    coords: { type: [Number], required: true }
  },
  type: { type: String, required: true },
  size: { type: String, required: true },
  isCOD: { type: Boolean, default: false },
  codAmount: { type: Number },
  status: { type: String, enum: ['PENDING','ASSIGNED','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED'], default: 'PENDING' },
  currentLocation: { type: [Number], default: [0, 0] }
}, { timestamps: true });

export const ParcelModel = model<IParcel>('Parcel', ParcelSchema);