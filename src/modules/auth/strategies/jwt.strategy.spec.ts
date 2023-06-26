import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { ClientsModule } from '../../../modules/clients/clients.module';
import { ClientsService } from '../../../modules/clients/clients.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';
import { v4 as uuidv4 } from 'uuid';

const mockSignJwt = jest.fn();
const mockFindOneToAuthorize = jest.fn();

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

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

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should call validate method', async () => {
      const jwtPayload = { sub: uuidv4(), email: 'any@mail.com' };
      const jwtResponse = await strategy.validate(jwtPayload);
      expect(jwtResponse).toBeDefined();
      expect(jwtResponse.id).toBe(jwtPayload.sub);
      expect(jwtResponse.email).toBe(jwtPayload.email);
    });
  });
});
