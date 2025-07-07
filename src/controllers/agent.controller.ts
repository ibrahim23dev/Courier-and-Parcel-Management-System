import { Request, Response } from 'express';
import { AbstractController } from '../core/AbstractController';
import { AgentService } from '../services/agent.service';

export class AgentController extends AbstractController {
  public service = new AgentService();

  getAssigned = this.handleError(async (req: Request, res: Response) => {
    const parcels = await this.service.getAssigned((req as any).user.id);
    res.json(parcels);
  });

  updateStatus = this.handleError(async (req: Request, res: Response) => {
    const updated = await this.service.updateStatus(req.params.id, (req as any).user.id, req.body.status);
    res.json(updated);
  });

  optimizeRoute = this.handleError(async (req: Request, res: Response) => {
    const { origin, stops } = req.body;
    const route = await this.service.optimizeRoute((req as any).user.id, origin, stops);
    res.json(route);
  });
}