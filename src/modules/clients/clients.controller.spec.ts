import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto } from './dto/client-response.dto';
import { FIND_ALL_CLIENTS } from './__mocks__/find-all-clients.mock';
import { EXISTENT_CLIENT } from './__mocks__/find-client-by-email.mock';
import { v4 as uuidv4 } from 'uuid';

const mockFindAllClientController = jest.fn();
const mockCreateClientController = jest.fn();
const mockFindOneController = jest.fn();
const mockUpdateController = jest.fn();
const mockRemoveController = jest.fn();

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            findAll: mockFindAllClientController,
            create: mockCreateClientController,
            findOne: mockFindOneController,
            update: mockUpdateController,
            remove: mockRemoveController,
          },
        },
        ClientsRepository,
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create', async () => {
      mockCreateClientController.mockReturnValue(EXISTENT_CLIENT);
      const client: ClientResponseDto = await controller.create(
        EXISTENT_CLIENT,
      );
      expect(client).toBeDefined();
      expect(mockCreateClientController).toHaveBeenCalledTimes(1);
    });
  });
  describe('findOne', () => {
    it('should call findOne', async () => {
      mockFindOneController.mockReturnValue(EXISTENT_CLIENT);
      const client: ClientResponseDto = await controller.findOne(
        EXISTENT_CLIENT.id,
      );
      expect(client).toBeDefined();
      expect(mockFindOneController).toHaveBeenCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should call findAll', async () => {
      mockFindAllClientController.mockReturnValue(FIND_ALL_CLIENTS);
      const clients: ClientResponseDto[] = await controller.findAll();
      expect(clients).toHaveLength(3);
      expect(mockFindAllClientController).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call update', async () => {
      mockUpdateController.mockReturnValue(FIND_ALL_CLIENTS);
      const client: ClientResponseDto = await controller.update(uuidv4(), {
        name: 'new_name',
      });
      expect(client).toBeDefined();
      expect(mockUpdateController).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should call remove', async () => {
      mockRemoveController.mockReturnValue(undefined);
      await controller.remove(uuidv4());
      expect(mockRemoveController).toHaveBeenCalledTimes(1);
    });
  });
});
