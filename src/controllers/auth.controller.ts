import { Request, Response, NextFunction } from 'express';
import { AbstractController } from '../core/AbstractController';
import { AuthService } from '../services/auth.service';

export class AuthController extends AbstractController {
  public service = new AuthService();

  register = this.handleError(async (req: Request, res: Response) => {
    const result = await this.service.register(req.body.name, req.body.email, req.body.password);
    res.status(201).json(result);
  });

  login = this.handleError(async (req: Request, res: Response) => {
    const result = await this.service.login(req.body.email, req.body.password);
    res.json(result);
  });
}