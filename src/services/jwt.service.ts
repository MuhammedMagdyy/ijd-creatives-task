import { sign, verify, Secret } from 'jsonwebtoken';
import { JwtType } from '../types';
import { IJwtPayload } from '../interfaces';

export class JwtService {
  private static accessTokensecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
  private static refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;
  private static accessTokenExpiry: string = process.env.ACCESS_TOKEN_EXPIRY!;
  private static refreshTokenExpiry: string = process.env.REFRESH_TOKEN_EXPIRY!;

  static generateTokens(payload: IJwtPayload) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  static generateAccessToken({
    exp: _exp,
    iat: _iat,
    ...payload
  }: IJwtPayload) {
    return sign(payload, this.accessTokensecret, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  static generateRefreshToken({
    exp: _exp,
    iat: _iat,
    ...payload
  }: IJwtPayload) {
    return sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
    });
  }

  static verifyToken(token: string, type: JwtType) {
    const secret =
      type === 'access' ? this.accessTokensecret : this.refreshTokenSecret;

    return verify(token, secret) as IJwtPayload;
  }
}
