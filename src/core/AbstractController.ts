import { Request, Response, NextFunction } from 'express';

export abstract class AbstractController {
  abstract service: any;

  protected handleError(fn: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
}