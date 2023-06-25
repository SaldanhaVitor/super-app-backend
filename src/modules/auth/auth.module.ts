import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '../clients/clients.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from '../../configs';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: Constants.authentication.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
    ClientsModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
