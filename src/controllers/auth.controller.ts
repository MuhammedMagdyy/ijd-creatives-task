import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authService } from '../services';
import { loginSchema, registerSchema, verifyOtpSchema } from '../utils';

export const processUserRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, phone } = registerSchema.parse(req.body);

    await authService.register({ name, email, password, phone });

    res.status(201).json({
      message: 'User created successfully, please verify your email',
      data: null,
    });
  }
);

export const processUserLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);

    const loggedInUser = await authService.login({ email, password });

    res.status(200).json({
      message: 'Logged in successfully',
      data: loggedInUser.user,
      tokens: loggedInUser.tokens,
    });
  }
);

export const processOtpVerification = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, otp } = verifyOtpSchema.parse(req.body);

    await authService.verifyOtp(email, otp);

    res.status(200).json({ message: 'User verified successfully', data: null });
  }
);
