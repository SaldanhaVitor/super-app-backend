import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsRepository } from './clients.repository';

describe('ClientsRepository', () => {
  let repository: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, ClientsRepository],
    }).compile();

    repository = module.get<ClientsRepository>(ClientsRepository);
  });

  describe('save', () => {
    it('Should create a client', async () => {
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };

      const client = await repository.save(createClientRequestDto);
      expect(client.id).toBeDefined();
      expect(client.name).toBe('any_name');
      expect(client.email).toBe('any_email');
    });
  });

  describe('findAll', () => {
    it('Should find all clients', async () => {
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };
      await repository.save(createClientRequestDto);
      const clients = await repository.findAll();
      expect(clients).toHaveLength(1);
    });
  });

  describe('findOneById', () => {
    it('Should find client by id', async () => {
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };
      const client = await repository.save(createClientRequestDto);
      const clientFound = await repository.findOneById(client.id);
      expect(clientFound.id).toBe(client.id);
    });
  });

  describe('findOneByEmail', () => {
    it('Should find client by email', async () => {
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };
      const client = await repository.save(createClientRequestDto);
      const clientFound = await repository.findOneByEmail(client.email);
      expect(clientFound.id).toBe(client.id);
    });
  });

  describe('update', () => {
    it("Should update client's name", async () => {
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };
      const createdClient = await repository.save(createClientRequestDto);
      createdClient.name = 'new_name';
      const updatedClient = await repository.update(createdClient);
      expect(updatedClient.name).toBe('new_name');
      expect(updatedClient.id).toBe(createdClient.id);
    });
  });

  describe('remove', () => {
    it('Should remove a client', async () => {
      const createClientRequestDto: CreateClientDto = {
        name: 'any_name',
        email: 'any_email',
      };
      const createdClient = await repository.save(createClientRequestDto);
      await repository.remove(createdClient.id);
      expect(await repository.findOneById(createdClient.id)).toBeUndefined();
    });
  });
});
