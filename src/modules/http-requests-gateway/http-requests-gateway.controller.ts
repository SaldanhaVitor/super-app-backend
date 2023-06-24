import { Controller } from '@nestjs/common';
import { HttpRequestsGatewayService } from './http-requests-gateway.service';

@Controller('http-requests-gateway')
export class HttpRequestsGatewayController {
  constructor(private readonly httpRequestsGatewayService: HttpRequestsGatewayService) {}
}
