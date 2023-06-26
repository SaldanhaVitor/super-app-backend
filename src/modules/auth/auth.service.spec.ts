import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ClientsModule } from '../clients/clients.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EXISTENT_CLIENT_WITH_PASSWORD } from '../clients/__mocks__/client-with-password';

const mockSignJwt = jest.fn();

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        {
          global: true,
          module: JwtModule,
          providers: [
            {
              provide: JwtService,
              useValue: {
                sign: mockSignJwt,
              },
            },
          ],
        },
        ClientsModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should make login with jwt', async () => {
      const jwtResponse = await service.login(EXISTENT_CLIENT_WITH_PASSWORD);
      expect(jwtResponse).toBeDefined();
      expect(mockSignJwt).toHaveBeenCalledTimes(1);
    });
  });
});
