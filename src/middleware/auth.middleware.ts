import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

interface JwtPayload { sub: string; role: string; iat: number; exp: number; }

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
  const token = header.substring(7);
  try {
    const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
    (req as any).user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}