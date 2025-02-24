import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Secret, verify } from 'jsonwebtoken';
import { ApiError } from '../utils';
import { IJwtPayload } from '../interfaces';
import { userService } from '../services';
import { UserRole } from '@prisma/client';

export const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError('Invalid token', 401);
    }

    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as IJwtPayload;

    if (!decoded) {
      throw new ApiError('Invalid token', 403);
    }

    const user = await userService.findOne({ id: decoded.id });

    if (!user || !user.isVerified) {
      throw new ApiError('You have to verify your email', 403);
    }

    req.user = { id: decoded.id };

    next();
  }
);

export const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError('Unauthorized', 401);
    }

    const user = await userService.findOne({ id: req.user.id });

    if (!user || user.role !== UserRole.ADMIN) {
      throw new ApiError('You are not authorized', 403);
    }

    next();
  }
);
