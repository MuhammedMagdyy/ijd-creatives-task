import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils';
import { Secret, verify } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/jwt.interface';
import { userService } from '../services';
import asyncHandler from 'express-async-handler';

export const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      throw new ApiError('You are not authorized', 403);
    }
  }
);
