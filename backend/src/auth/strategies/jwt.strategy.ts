import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // to Extract token from Authorization header
      ignoreExpiration: false, //  reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'secret-key', //  secret key from env
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role }; //  Attach user info to request
  }
}
