import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ClientsModule } from '../clients/clients.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EXISTENT_CLIENT_WITH_PASSWORD } from '../clients/__mocks__/client-with-password';
import { ClientsService } from '../clients/clients.service';
import ClientNotFoundException from '../clients/exceptions/client-not-found.exception';

const mockSignJwt = jest.fn();
const mockFindOneToAuthorize = jest.fn();

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

  describe('validateClient', () => {
    it('should validate client', async () => {
      mockFindOneToAuthorize.mockReturnValue(EXISTENT_CLIENT_WITH_PASSWORD);
      const client = await service.validateClient(
        EXISTENT_CLIENT_WITH_PASSWORD.email,
        EXISTENT_CLIENT_WITH_PASSWORD.password,
      );
      expect(client).toBeDefined();
      expect(mockFindOneToAuthorize).toHaveBeenCalledTimes(1);
    });
    it('should return null when client is not found', async () => {
      mockFindOneToAuthorize.mockRejectedValue(new ClientNotFoundException());
      const client = await service.validateClient(
        EXISTENT_CLIENT_WITH_PASSWORD.email,
        EXISTENT_CLIENT_WITH_PASSWORD.password,
      );
      expect(client).toBeNull();
      expect(mockFindOneToAuthorize).toHaveBeenCalledTimes(1);
    });
    it('should return null when client password is not equal to login password', async () => {
      mockFindOneToAuthorize.mockReturnValue(EXISTENT_CLIENT_WITH_PASSWORD);
      const anotherPassword = 'any_other_non_existent_password';
      const client = await service.validateClient(
        EXISTENT_CLIENT_WITH_PASSWORD.email,
        anotherPassword,
      );
      expect(client).toBeNull();
      expect(mockFindOneToAuthorize).toHaveBeenCalledTimes(1);
    });
  });
});
