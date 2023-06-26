import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { ClientsModule } from '../../../modules/clients/clients.module';
import { ClientsService } from '../../../modules/clients/clients.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';
import { EXISTENT_CLIENT_WITH_PASSWORD } from '../../../modules/clients/__mocks__/client-with-password';
import UnauthorizedException from '../exception/unauthorized.exception';

const mockSignJwt = jest.fn();
const mockFindOneToAuthorize = jest.fn();
const mockAuthServiceValidateClient = jest.fn();

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

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
        {
          global: true,
          module: ClientsModule,
          providers: [
            {
              provide: ClientsService,
              useValue: {
                findOneToAuthorize: mockFindOneToAuthorize,
              },
            },
          ],
        },
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateClient: mockAuthServiceValidateClient,
          },
        },
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should call validate method', async () => {
      mockAuthServiceValidateClient.mockReturnValue(
        EXISTENT_CLIENT_WITH_PASSWORD,
      );
      const email = 'any@mail.com';
      const password = 'any_password';
      const client = await strategy.validate(email, password);
      expect(client).toBeDefined();
      expect(mockAuthServiceValidateClient).toHaveBeenCalledTimes(1);
    });
    it('should throw unauthorized when client is invalid', async () => {
      mockAuthServiceValidateClient.mockReturnValue(null);
      const email = 'any@mail.com';
      const password = 'any_password';
      await expect(strategy.validate(email, password)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(mockAuthServiceValidateClient).toHaveBeenCalledTimes(1);
    });
  });
});
