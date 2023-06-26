import { Controller, Post, Req, UseGuards, Version } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiTags('auth')
  @Version('1')
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Login successfully',
    schema: {
      type: 'object',
      properties: {
        Authorization: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiODdiZTZkYy0xM2NhLTRiMzktOTg1My03NmM0NWVkOGNiMzUiLCJlbWFpbCI6ImNsaWVudEBtYWlsLmNvbSIsImlhdCI6MTY4Nzc0NTQ2MiwiZXhwIjoxNjg3NzQ1NTgyfQ.IadILqYN6MviWuvuDMAK92r-aPuX2fnnxvFpA6LJSjs',
        },
      },
    },
  })
  async login(@Req() request: any) {
    const client = request.user;
    return this.authService.login(client);
  }
}
