import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '../clients/clients.module';
import { EXISTENT_CLIENT_WITH_PASSWORD } from '../clients/__mocks__/client-with-password';

const mockLoginService = jest.fn();
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, JwtModule, ClientsModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: mockLoginService,
          },
        },
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call login', async () => {
      mockLoginService.mockReturnValue(undefined);
      await controller.login({ user: EXISTENT_CLIENT_WITH_PASSWORD });
      expect(mockLoginService).toHaveBeenCalledTimes(1);
    });
  });
});
