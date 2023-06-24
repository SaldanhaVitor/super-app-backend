import { Test, TestingModule } from '@nestjs/testing';
import { HttpRequestsGatewayController } from './http-requests-gateway.controller';
import { HttpRequestsGatewayService } from './http-requests-gateway.service';

describe('HttpRequestsGatewayController', () => {
  let controller: HttpRequestsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpRequestsGatewayController],
      providers: [HttpRequestsGatewayService],
    }).compile();

    controller = module.get<HttpRequestsGatewayController>(
      HttpRequestsGatewayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
