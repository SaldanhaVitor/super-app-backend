import { Module } from '@nestjs/common';
import { HttpClientGatewayService } from './http-client-gateway.service';
import { AxiosAdapterModule } from 'src/modules/axios-adapter/axios-adapter.module';

@Module({
  imports: [AxiosAdapterModule],
  providers: [HttpClientGatewayService],
})
export class HttpClientGatewayModule {}
