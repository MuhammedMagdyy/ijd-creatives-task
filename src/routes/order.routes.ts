import { Router } from 'express';
import {
  processOrderRequest,
  getPaginatedOrders,
  processPartialOrderUpdate,
  processFullOrderUpdate,
  processOrderDeletion,
} from '../controllers';
import { isAdmin } from '../middlewares';

const router = Router();

router.route('/').post(processOrderRequest).get(getPaginatedOrders);
router
  .route('/:id')
  .patch(processPartialOrderUpdate)
  .put(processFullOrderUpdate)
  .delete(isAdmin, processOrderDeletion);

export { router as orderRoutes };
