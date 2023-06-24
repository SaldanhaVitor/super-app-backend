import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { AxiosAdapterModule } from 'src/modules/axios-adapter/axios-adapter.module';

@Module({
  imports: [AxiosAdapterModule],
  providers: [HttpClientService],
})
export class HttpClientModule {}
