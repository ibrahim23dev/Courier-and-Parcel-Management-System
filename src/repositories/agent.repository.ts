import { UserModel, IUser } from '../models/user.model';
import { Types } from 'mongoose';

/**
 * Repository for Delivery Agents, extending User repository logic.
 * Provides methods to fetch and manage users with role 'AGENT'.
 */
export class AgentRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findOne({ _id: new Types.ObjectId(id), role: 'AGENT' }).exec();
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find({ role: 'AGENT' }).exec();
  }

  async assignParcelToAgent(agentId: string, parcelId: string): Promise<void> {
    // Logic to assign parcel can be implemented in service layer; placeholder
  }
}