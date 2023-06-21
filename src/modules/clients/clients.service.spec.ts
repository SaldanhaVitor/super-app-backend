import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsRepository } from './clients.repository';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, ClientsRepository],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a client', async () => {
    const createClientRequestDto: CreateClientDto = {
      name: 'any_name',
      email: 'any_email',
    };
    const client = await service.create(createClientRequestDto);
    expect(client.id).toBeDefined();
    expect(client.name).toBe('any_name');
    expect(client.email).toBe('any_email');
  });
});
