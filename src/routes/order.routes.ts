import { Router } from 'express';
import { isAuth } from '../middlewares';
import { handleOrder, handleOrderWithPagination } from '../controllers';

const router = Router();

router.post('/', handleOrder);
router.get('/', handleOrderWithPagination);

export default router;
