import { Test, TestingModule } from '@nestjs/testing';
import { HttpRequestsGatewayService } from './http-requests-gateway.service';

describe('HttpRequestsGatewayService', () => {
  let service: HttpRequestsGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpRequestsGatewayService],
    }).compile();

    service = module.get<HttpRequestsGatewayService>(
      HttpRequestsGatewayService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
