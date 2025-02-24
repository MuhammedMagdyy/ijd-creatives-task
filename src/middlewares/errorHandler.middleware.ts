import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { ApiError } from '../utils';

type ErrorType =
  | ApiError
  | ZodError
  | Error
  | Prisma.PrismaClientKnownRequestError
  | JsonWebTokenError;

export const errorHandler: ErrorRequestHandler = (
  error: ErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation failed',
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { status, message } = handlePrismaError(error);
    res.status(status).json({ message });
    return;
  }

  if (error instanceof JsonWebTokenError) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorToDev(error, res);
  } else {
    sendErrorToProd(res);
  }
};

const sendErrorToDev = (error: ErrorType, res: Response): void => {
  res.status(500).json({
    cause: 'Internal server error',
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorToProd = (res: Response): void => {
  res.status(500).json({
    message: 'Internal server error: Please try again later...',
  });
};

const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError
): { status: number; message: string } => {
  switch (error.code) {
    case 'P2002':
      return {
        status: 400,
        message: `Duplicate field value: ${error.meta?.target as string}`,
      };
    case 'P2003':
      return { status: 400, message: 'Foreign key constraint failed' };
    default:
      return {
        status: 500,
        message: 'Database error: Ensure the server is running correctly',
      };
  }
};
