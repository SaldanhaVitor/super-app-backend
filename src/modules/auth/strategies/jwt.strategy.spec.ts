import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { ClientsModule } from '../../../modules/clients/clients.module';
import { ClientsService } from '../../../modules/clients/clients.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';

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
});
