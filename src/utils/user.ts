import { User } from '@prisma/client';
import { IUserResponse } from '../interfaces';

export function userResponse(user: User): IUserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
  };
}
