import { AbstractRouter } from '../core/AbstractRouter';
import { AgentController } from '../controllers/agent.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

export class AgentRouter extends AbstractRouter {
  protected controller = new AgentController();

  protected initRoutes() {
    this.router.use('/agent', authenticateToken, authorizeRoles(['AGENT']));
    this.router.get('/agent/parcels', this.controller.getAssigned);
    this.router.put('/agent/parcels/:id/status', this.controller.updateStatus);
    this.router.post('/agent/routes', this.controller.optimizeRoute);
  }
}