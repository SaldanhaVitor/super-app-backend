import { Controller, Post, Req, UseGuards, Version } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiTags('auth')
  @Version('1')
  @Post('login')
  async login(@Req() request: any) {
    return this.authService.login(request.user);
  }
}
