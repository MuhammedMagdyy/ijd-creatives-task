import { Router } from 'express';
import {
  processUserLogin,
  processUserRegistration,
  processOtpVerification,
} from '../controllers';

const router = Router();

router.post('/register', processUserRegistration);
router.post('/login', processUserLogin);
router.post('/verify-otp', processOtpVerification);

export { router as authRoutes };
