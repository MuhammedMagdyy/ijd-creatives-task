import { Router } from 'express';
import orderRoutes from './order.routes';
import authRoutes from './auth.routes';
import { isAuth } from '../middlewares';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', isAuth, orderRoutes);

export default router;
