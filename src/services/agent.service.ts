import { AbstractService } from '../core/AbstractService';
import { ParcelRepository } from '../repositories/parcel.repository';
import axios from 'axios';
import { config } from '../config';
import { IParcel } from '../models/parcel.model';

export class AgentService extends AbstractService {
  private repo = new ParcelRepository();

  async getAssigned(agentId: string) {
    return this.repo.findAssigned(agentId);
  }

  async updateStatus(parcelId: string, agentId: string, status: IParcel['status']) {
    const parcel = await this.repo.findById(parcelId);
    this.throwIf(!parcel || parcel.assignedAgentId?.toString() !== agentId, 403, 'Not authorized');
    // Additional status transition validation can go here
    return this.repo.update(parcelId, { status });
  }

  async optimizeRoute(agentId: string, origin: [number, number], stops: [number, number][]) {
    const waypoints = stops.map(c => `${c[0]},${c[1]}`).join('|');
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin[0]},${origin[1]}&destination=${origin[0]},${origin[1]}&waypoints=optimize:true|${waypoints}&key=${config.googleApiKey}`;
    const resp = await axios.get(url);
    return resp.data;
  }
}