import { AbstractRouter } from '../core/AbstractRouter';
import { CustomerController } from '../controllers/customer.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

export class CustomerRouter extends AbstractRouter {
  protected controller = new CustomerController();

  protected initRoutes() {
    this.router.use('/customer', authenticateToken, authorizeRoles(['CUSTOMER']));
    this.router.post('/customer/parcels', this.controller.bookParcel);
    this.router.get('/customer/parcels', this.controller.getMyParcels);
    this.router.get('/customer/parcels/:id', this.controller.getParcelDetails);
  }
}