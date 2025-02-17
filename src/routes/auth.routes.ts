import { Router } from 'express';
import { handleLogin, handleRegister, handleVerifyOtp } from '../controllers';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/verify-otp', handleVerifyOtp);

export default router;
