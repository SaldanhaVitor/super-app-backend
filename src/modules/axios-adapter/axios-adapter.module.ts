import { Module } from '@nestjs/common';
import { AxiosAdapterService } from './axios-adapter.service';
import { AxiosAdapterController } from './axios-adapter.controller';

@Module({
  controllers: [AxiosAdapterController],
  providers: [AxiosAdapterService]
})
export class AxiosAdapterModule {}
