import { Router } from 'express';
import orderRoutes from './order.routes.ts';
import authRoutes from './auth.routes.ts';
import { isAuth } from '../middlewares/isAuth.middleware.ts';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', isAuth, orderRoutes);

export default router;
