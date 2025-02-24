import { userService } from './user.service';
import bcrypt from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { ApiError } from '../utils';
import { IJwtPayload } from '../interfaces/jwt.interface';

export class AuthService {
  async register(name: string, email: string, password: string, phone: string) {
    const user = await userService.findOne({ email });
    if (user) {
      throw new ApiError('User already exists', 409);
    }

    const hashedPassowrd = await bcrypt.hash(password, 12);
    const registeredUser = await userService.createOne({
      name,
      email,
      password: hashedPassowrd,
      phone,
    });
    const token = this.generateAccessToken({ id: registeredUser.id });

    console.log(`Email sent successfully to ${email}, and OTP is ${1234}`);

    return { registeredUser, token };
  }

  async login(email: string, password: string) {
    const user = await userService.findOne({ email });
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    if (!user.isVerified) {
      throw new ApiError('verify ur email', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError('Invalid credintials', 401);
    }

    const token = this.generateAccessToken({ id: user.id });

    return token;
  }

  async verifyOtp(email: string, otp: string) {
    const user = await userService.findOne({ email });

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    if (otp !== '1234') {
      throw new ApiError('Invalid or expired otp', 401);
    }

    await userService.updateOne({ email }, { isVerified: true });
  }

  private generateAccessToken({
    exp: _exp,
    iat: _iat,
    ...payload
  }: IJwtPayload) {
    return sign(payload, process.env.ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  }
}

export const authService = new AuthService();
