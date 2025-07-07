import { AbstractService } from '../core/AbstractService';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { HttpError } from '../core/HttpError';

export class AuthService extends AbstractService {
  private repo = new UserRepository();

  async register(name: string, email: string, password: string) {
    const existing = await this.repo.findByEmail(email);
    this.throwIf(!!existing, 400, 'Email in use');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.repo.create({ name, email, passwordHash: hash });
    return { id: user.id, name: user.name, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    this.throwIf(!user, 400, 'Invalid Credetials');
    if (!user) return; // This line ensures TypeScript knows user is not null below
    const valid = await bcrypt.compare(password, user.passwordHash);
    this.throwIf(!valid, 400, "Invalid credentials");
    const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1h' })
    return {token}
  }
}