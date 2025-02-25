import { ILoginUser, IRegisterUser } from '../interfaces';
import { HashingService, JwtService, userService } from '../services';
import { ApiError, userResponse } from '../utils';

export class AuthService {
  async register(userInfo: IRegisterUser) {
    const existingUser = await userService.findOne({ email: userInfo.email });
    if (existingUser) {
      throw new ApiError('User already exists', 409);
    }

    const hashedPassowrd = await HashingService.hash(userInfo.password);
    await userService.createOne({
      name: userInfo.name,
      email: userInfo.email,
      password: hashedPassowrd,
      phone: userInfo.phone,
    });

    console.log(
      `Email sent successfully to ${userInfo.email}, and OTP is ${1234}`
    );
  }

  async login(userInfo: ILoginUser) {
    const existingUser = await userService.findOne({ email: userInfo.email });
    if (!existingUser) {
      throw new ApiError('Invalid credintials', 401);
    }

    if (!existingUser.isVerified) {
      throw new ApiError('Account not verified. Please check your email.', 403);
    }

    const isMatch = await HashingService.compare(
      userInfo.password,
      existingUser.password
    );

    if (!isMatch) {
      throw new ApiError('Invalid credintials', 401);
    }

    const tokens = JwtService.generateTokens({ id: existingUser.id });

    return { user: userResponse(existingUser), tokens };
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
}

export const authService = new AuthService();
