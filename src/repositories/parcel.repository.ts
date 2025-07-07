import { ParcelModel, IParcel } from '../models/parcel.model';
import { Types } from 'mongoose';

export class ParcelRepository {
  async create(parcel: Partial<IParcel>): Promise<IParcel> {
    return ParcelModel.create(parcel);
  }

  async findByCustomer(customerId: string): Promise<IParcel[]> {
    return ParcelModel.find({ customerId: new Types.ObjectId(customerId) }).exec();
  }

  async findById(id: string): Promise<IParcel | null> {
    return ParcelModel.findById(id).exec();
  }

  async update(id: string, update: Partial<IParcel>): Promise<IParcel | null> {
    return ParcelModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async findAssigned(agentId: string): Promise<IParcel[]> {
    return ParcelModel.find({ assignedAgentId: new Types.ObjectId(agentId), status: { $ne: 'DELIVERED' } }).exec();
  }

  async findAll(): Promise<IParcel[]> {
    return ParcelModel.find().exec();
  }
}