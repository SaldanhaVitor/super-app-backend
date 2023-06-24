import { Module } from '@nestjs/common';
import { HttpRequestsGatewayService } from './http-requests-gateway.service';
import { HttpRequestsGatewayController } from './http-requests-gateway.controller';

@Module({
  controllers: [HttpRequestsGatewayController],
  providers: [HttpRequestsGatewayService]
})
export class HttpRequestsGatewayModule {}
