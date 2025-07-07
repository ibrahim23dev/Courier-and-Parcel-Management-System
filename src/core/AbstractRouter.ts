import { Router } from 'express';
import { AbstractController } from './AbstractController';

export abstract class AbstractRouter {
  public router = Router();
  protected controller!: AbstractController;
  protected abstract initRoutes(): void;

  constructor() {
    this.initRoutes();
  }
}