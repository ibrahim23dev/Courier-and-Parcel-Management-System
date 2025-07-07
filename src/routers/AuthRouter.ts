import { AbstractRouter } from '../core/AbstractRouter';
import { AuthController } from '../controllers/auth.controller';

export class AuthRouter extends AbstractRouter {
  protected controller = new AuthController();

  protected initRoutes() {
    this.router.post('/auth/register', this.controller.register);
    this.router.post('/auth/login', this.controller.login);
  }
}