import { Request, Response } from 'express';
import { AbstractController } from '../core/AbstractController';
import { CustomerService } from '../services/customer.service';

export class CustomerController extends AbstractController {
  public service = new CustomerService();

  bookParcel = this.handleError(async (req: Request, res: Response) => {
    const data = { ...req.body, customerId: (req as any).user.id };
    const parcel = await this.service.bookParcel(data);
    res.status(201).json(parcel);
  });

  getMyParcels = this.handleError(async (req: Request, res: Response) => {
    const parcels = await this.service.getMyParcels((req as any).user.id);
    res.json(parcels);
  });

  getParcelDetails = this.handleError(async (req: Request, res: Response) => {
    const parcel = await this.service.getParcelDetails(req.params.id, (req as any).user.id);
    res.json(parcel);
  });
}