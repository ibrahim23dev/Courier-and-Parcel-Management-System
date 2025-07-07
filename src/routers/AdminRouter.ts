import { AbstractRouter } from '../core/AbstractRouter';
import { AdminController } from '../controllers/admin.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

export class AdminRouter extends AbstractRouter {
  protected controller = new AdminController();

  protected initRoutes() {
    this.router.use('/admin', authenticateToken, authorizeRoles(['ADMIN']));
    this.router.put('/admin/parcels/:id/assign', this.controller.assignAgent);
    this.router.get('/admin/dashboard-stats', this.controller.getDashboardStats);
    this.router.get('/admin/users', this.controller.listUsers);
    this.router.post('/admin/users', this.controller.createUser);
    this.router.get('/admin/reports/parcels.csv', this.controller.exportParcelsCSV);
  }
}