import { Request, Response } from 'express';
import { AbstractController } from '../core/AbstractController';
import { AdminService } from '../services/admin.service';

export class AdminController extends AbstractController {
  public service = new AdminService();

  assignAgent = this.handleError(async (req: Request, res: Response) => {
    const result = await this.service.assignAgent(req.params.id, req.body.agentId);
    res.json(result);
  });

  getDashboardStats = this.handleError(async (req: Request, res: Response) => {
    const stats = await this.service.getDashboardStats();
    res.json(stats);
  });

  listUsers = this.handleError(async (req: Request, res: Response) => {
    const users = await this.service.listUsers();
    res.json(users);
  });

  createUser = this.handleError(async (req: Request, res: Response) => {
    const user = await this.service.createUser(req.body);
    res.status(201).json(user);
  });

  exportParcelsCSV = this.handleError(async (req: Request, res: Response) => {
    const csv = await this.service.exportParcelsCSV();
    res.header('Content-Type', 'text/csv').send(csv);
  });
}