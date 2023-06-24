import { Module } from '@nestjs/common';
import { AxiosAdapter } from './axios.adapter';

@Module({
  providers: [AxiosAdapter],
})
export class AxiosAdapterModule {}
