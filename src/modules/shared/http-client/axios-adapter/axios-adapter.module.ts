import { Module } from '@nestjs/common';
import { AxiosAdapter } from './axios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class AxiosAdapterModule {}
