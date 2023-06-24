import { Controller } from '@nestjs/common';
import { AxiosAdapterService } from './axios-adapter.service';

@Controller('axios-adapter')
export class AxiosAdapterController {
  constructor(private readonly axiosAdapterService: AxiosAdapterService) {}
}
