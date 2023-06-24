import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { AxiosAdapterModule } from '../../../modules/axios-adapter/axios-adapter.module';

@Module({
  imports: [AxiosAdapterModule],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
