import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsRepository } from './clients.repository';
import { v4 as uuidv4 } from 'uuid';
import ClientAlreadyExistsException from './exceptions/client-already-exists.exception';

const mockCreateClient = jest.fn();
const mockFindClientByEmail = jest.fn();

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: ClientsRepository,
          useValue: {
            save: mockCreateClient,
            findOneByEmail: mockFindClientByEmail,
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a client', async () => {
      mockFindClientByEmail.mockReturnValueOnce(undefined);
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };
      mockCreateClient.mockReturnValueOnce({
        id: uuidv4(),
        ...createClientRequestDto,
      });
      const client = await service.create(createClientRequestDto);
      expect(client.id).toBeDefined();
      expect(client.name).toBe('any_name');
      expect(client.email).toBe('any_email');
      expect(mockFindClientByEmail).toHaveBeenCalledTimes(1);
      expect(mockCreateClient).toHaveBeenCalledTimes(1);
    });
    it('Should throws when client already exists', async () => {
      mockFindClientByEmail.mockReturnValueOnce({
        id: uuidv4(),
        name: 'existent_name',
        email: 'existent_mail',
      });
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'existent_email',
      };
      await expect(service.create(createClientRequestDto)).rejects.toThrow(
        ClientAlreadyExistsException,
      );
      expect(mockFindClientByEmail).toHaveBeenCalledTimes(1);
      expect(mockCreateClient).toHaveBeenCalledTimes(0);
    });
  });
});
