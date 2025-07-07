import { AbstractService } from '../core/AbstractService';
import { ParcelRepository } from '../repositories/parcel.repository';
import { UserRepository } from '../repositories/user.repository';
import { Parser } from 'json2csv';

export class AdminService extends AbstractService {
  private parcelRepo = new ParcelRepository();
  private userRepo = new UserRepository();

  async assignAgent(parcelId: string, agentId: string) {
    const { ObjectId } = require('mongodb');
    return this.parcelRepo.update(parcelId, { assignedAgentId: new ObjectId(agentId), status: 'ASSIGNED' });
  }

  async getDashboardStats() {
    // Implement aggregation logic here
    return { totalBookingsToday: 0, totalDeliveredToday: 0, totalCODAmount: 0 };
  }

  async exportParcelsCSV() {
    const parcels = await this.parcelRepo.findAll();
    const parser = new Parser();
    return parser.parse(parcels);
  }

  async listUsers() {
    return this.userRepo.findAll();
  }

  async createUser(data: Partial<any>) {
    return this.userRepo.create(data);
  }
}