import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { orderRoutes } from './order.routes';
import { isAuth } from '../middlewares';
import { ApiError } from '../utils';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', isAuth, orderRoutes);

router.all('*', (req, _res, next) => {
  return next(
    new ApiError(`Are you lost? There's nothing here ${req.originalUrl}`, 404)
  );
});

export default router;
