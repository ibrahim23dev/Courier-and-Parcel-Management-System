import { AbstractService } from '../core/AbstractService';
import { ParcelRepository } from '../repositories/parcel.repository';
import { IParcel } from '../models/parcel.model';

export class CustomerService extends AbstractService {
  private repo = new ParcelRepository();

  async bookParcel(data: Partial<IParcel>) {
    // Geocoding and validation logic can be added here
    return this.repo.create({ ...data, status: 'PENDING' });
  }

  async getMyParcels(customerId: string) {
    return this.repo.findByCustomer(customerId);
  }

  async getParcelDetails(id: string, customerId: string) {
    const parcel = await this.repo.findById(id);
    this.throwIf(!parcel || parcel.customerId.toString() !== customerId, 404, 'Parcel not found');
    return parcel;
  }
}