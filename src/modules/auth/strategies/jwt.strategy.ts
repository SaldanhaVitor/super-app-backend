import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Constants } from '../../../configs';
import { JwtResponseDto } from '../dto/jwt-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Constants.authentication.jwtSecret,
    });
  }

  async validate(payload: any): Promise<JwtResponseDto> {
    return { id: payload.sub, email: payload.email };
  }
}
