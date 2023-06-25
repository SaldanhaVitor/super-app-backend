import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsRepository } from './clients.repository';
import { v4 as uuidv4 } from 'uuid';
import ClientAlreadyExistsException from './exceptions/client-already-exists.exception';
import { FIND_ALL_CLIENTS } from './__mocks__/find-all-clients.mock';
import { EXISTENT_CLIENT } from './__mocks__/find-client-by-email.mock';
import ClientNotFoundException from './exceptions/client-not-found.exception';
import { UpdateClientDto } from './dto/update-client.dto';
import { WishlistModule } from '../wishlist/wishlist.module';
import { WishlistService } from '../wishlist/wishlist.service';

const mockCreateClient = jest.fn();
const mockFindClientByEmail = jest.fn();
const mockFindAllClients = jest.fn();
const mockFindOneById = jest.fn();
const mockUpdateClient = jest.fn();
const mockRemoveClient = jest.fn();
const mockCreateWishlist = jest.fn();

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          global: true,
          module: WishlistModule,
          providers: [
            {
              provide: WishlistService,
              useValue: {
                create: mockCreateWishlist,
              },
            },
          ],
        },
      ],
      providers: [
        ClientsService,
        {
          provide: ClientsRepository,
          useValue: {
            save: mockCreateClient,
            findOneByEmail: mockFindClientByEmail,
            findAll: mockFindAllClients,
            findOneById: mockFindOneById,
            update: mockUpdateClient,
            remove: mockRemoveClient,
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
      mockFindClientByEmail.mockReturnValueOnce(EXISTENT_CLIENT);
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

  describe('create whishlist', () => {
    it('Should call create whishlist', async () => {
      mockCreateWishlist.mockReturnValueOnce(undefined);
      const clientId = uuidv4();
      await service.createWishlist(clientId);
      expect(mockCreateWishlist).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Should find many clients', async () => {
      mockFindAllClients.mockReturnValueOnce(FIND_ALL_CLIENTS);
      const clients = await service.findAll();
      expect(clients).toBeDefined();
      expect(clients).toHaveLength(3);
      expect(mockFindAllClients).toHaveBeenCalledTimes(1);
    });
    it('Should return empty when no client was found', async () => {
      mockFindAllClients.mockReturnValueOnce([]);
      const clients = await service.findAll();
      expect(clients).toBeDefined();
      expect(clients).toHaveLength(0);
      expect(mockFindAllClients).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('Should find one client by id', async () => {
      mockFindOneById.mockReturnValueOnce(EXISTENT_CLIENT);
      const client = await service.findOne(EXISTENT_CLIENT.id);
      expect(client).toBeDefined();
      expect(client.id).toEqual(EXISTENT_CLIENT.id);
      expect(mockFindOneById).toHaveBeenCalledTimes(1);
    });
    it('Should throws when client was not found', async () => {
      mockFindOneById.mockReturnValueOnce(undefined);
      await expect(service.findOne(EXISTENT_CLIENT.id)).rejects.toThrow(
        ClientNotFoundException,
      );
      expect(mockFindOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it("Should update client's name", async () => {
      mockFindOneById.mockReturnValueOnce(EXISTENT_CLIENT);
      const updateClientDto: UpdateClientDto = { name: 'updated_name' };
      const client = await service.update(EXISTENT_CLIENT.id, updateClientDto);
      expect(client).toBeDefined();
      expect(client.name).toEqual(updateClientDto.name);
      expect(mockFindOneById).toHaveBeenCalledTimes(1);
      expect(mockUpdateClient).toHaveBeenCalledTimes(1);
    });
    it('Should throws when client was not found', async () => {
      mockFindOneById.mockReturnValueOnce(undefined);
      const updateClientDto: UpdateClientDto = { name: 'updated_name' };
      await expect(service.update(uuidv4(), updateClientDto)).rejects.toThrow(
        ClientNotFoundException,
      );
      expect(mockFindOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Should remove a client by id', async () => {
      mockFindOneById.mockReturnValueOnce(EXISTENT_CLIENT);
      await service.remove(EXISTENT_CLIENT.id);
      expect(mockRemoveClient).toHaveBeenCalledTimes(1);
    });
    it('Should throws when client was not found', async () => {
      mockFindOneById.mockReturnValueOnce(undefined);
      await expect(service.remove(uuidv4())).rejects.toThrow(
        ClientNotFoundException,
      );
      expect(mockFindOneById).toHaveBeenCalledTimes(1);
    });
  });
});
