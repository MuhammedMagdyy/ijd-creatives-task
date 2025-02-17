import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import asyncHandler from 'express-async-handler';
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from '../utils/validators';

export const handleRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, phone } = registerSchema.parse(req.body);

    const user = await authService.register(name, email, password, phone);

    res.status(201).json({
      message: 'User created successfully',
      data: {
        user: user.registeredUser,
      },
      token: user.token,
    });
  }
);

export const handleLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = loginSchema.parse(req.body);

    const token = await authService.login(email, password);

    res.status(200).json({
      message: 'Logged in successfully',
      data: {},
      token,
    });
  }
);

export const handleVerifyOtp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = verifyOtpSchema.parse(req.body);

    await authService.verifyOtp(email, otp);

    res.status(200).json({ message: 'User verified successfully', data: {} });
  }
);
